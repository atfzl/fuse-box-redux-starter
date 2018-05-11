import { FuseBox, WebIndexPlugin } from 'fuse-box';

const fuse = FuseBox.init({
  homeDir: 'src/',
  target: 'browser@es6',
  output: 'dist/$name.js',
  plugins: [WebIndexPlugin()],
});

fuse.dev();

fuse
  .bundle('app')
  .instructions(' > index.tsx')
  .hmr()
  .watch();

fuse.run();
