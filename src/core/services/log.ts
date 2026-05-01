/**
 * `log()` — production ignores invocations; dev/staging hosts forward to
 * `console.log`. The list of hostnames matches the petabox stage rotation.
 */
const isDevHost =
  location.hostname === 'localhost' ||
  /^(www|cat)-[a-z0-9]+\.archive\.org$/.test(location.host) ||
  /\.code\.archive\.org$/.test(location.host) ||
  /\.dev\.archive\.org$/.test(location.host) ||
  /^ia-petabox-/.test(location.host) ||
  /^internetarchive/.test(location.host);

const log: (...args: unknown[]) => void = isDevHost
  ? console.log.bind(console)
  : () => {};

export default log;
