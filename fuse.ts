import * as express from 'express';
import { FuseBox, WebIndexPlugin } from 'fuse-box';
import * as proxy from 'http-proxy-middleware';
import * as path from 'path';

const BUNDLE = {
  ui: 'ui/app',
  server: 'server/app',
};

const fuse = FuseBox.init({
  homeDir: 'src/',
  target: 'browser@es6',
  output: 'dist/$name.js',
  emitHMRDependencies: true,
  sourceMaps: true,
  plugins: [
    WebIndexPlugin({
      bundles: [BUNDLE.ui],
      template: 'src/ui/index.html',
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
      pathRewrite: {
        '^/api': '/',
      },
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
  .bundle(BUNDLE.ui)
  .instructions(' > ui/index.tsx')
  .hmr()
  .watch('ui/**');

fuse
  .bundle(BUNDLE.server)
  .target('server@esnext')
  .instructions(' > [server/index.ts]')
  .watch('server/**')
  .completed(proc => proc.start());

fuse.run();
