import { FuseBox } from 'fuse-box';

const fuse = FuseBox.init({
  homeDir: 'src/',
  target: 'server@esnext',
  output: 'dist/$name.js',
  sourceMaps: true,
});

fuse
  .bundle('server')
  .instructions(' > [index.ts]')
  .watch()
  .completed(proc => proc.start());

fuse.run();
