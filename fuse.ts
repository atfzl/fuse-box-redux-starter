import { FuseBox, WebIndexPlugin } from 'fuse-box';

const BUNDLE = {
  ui: 'ui/app',
  server: 'server/app',
};

const fuse = FuseBox.init({
  homeDir: 'src/',
  target: 'browser@es6',
  output: 'dist/$name.js',
  plugins: [
    WebIndexPlugin({
      bundles: [BUNDLE.ui],
      template: 'src/ui/index.html',
    }),
  ],
});

fuse.dev();

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
