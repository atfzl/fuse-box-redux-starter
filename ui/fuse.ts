import * as express from 'express';
import { FuseBox, WebIndexPlugin } from 'fuse-box';
import * as proxy from 'http-proxy-middleware';
import * as path from 'path';

const BUNDLE = 'ui';

const fuse = FuseBox.init({
  homeDir: 'src/',
  target: 'browser@es6',
  output: 'dist/$name.js',
  emitHMRDependencies: true,
  sourceMaps: true,
  plugins: [
    WebIndexPlugin({
      bundles: [BUNDLE],
      template: 'src/index.html',
    }),
  ],
});

fuse.dev({ root: false }, server => {
  const app = server.httpServer.app as express.Express;

  const dist = path.resolve(__dirname, './dist');

  app.use('/', express.static(dist));
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:3039',
      changeOrigin: true,
    }),
  );
  app.get('*', (req, res, next) => {
    if (req.path.match(/\.map$/i)) {
      return next();
    }
    return res.sendFile(path.join(dist, 'index.html'));
  });
});

fuse
  .bundle(BUNDLE)
  .instructions(' > index.tsx')
  .hmr()
  .watch();

fuse.run();
