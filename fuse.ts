import { FuseBox, WebIndexPlugin } from 'fuse-box';

const fuse = FuseBox.init({
  homeDir: 'src/',
  target: 'browser@es6',
  output: 'dist/$name.js',
  plugins: [WebIndexPlugin({ bundles: ['client/app'] })],
});

fuse.dev();

fuse
  .bundle('client/app')
  .instructions(' > ui/index.tsx')
  .hmr()
  .watch('ui/**');

fuse
  .bundle('server/app')
  .target('server@esnext')
  .instructions(' > [server/index.ts]')
  .watch('server/**')
  .completed(proc => proc.start());

fuse.run();
