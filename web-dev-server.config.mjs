import { esbuildPlugin } from '@web/dev-server-esbuild';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  open: '/',
  watch: !hmr,

  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'auto',
      tsconfig: './tsconfig.json',
    }),
  ],

  // See documentation for all available options
});
