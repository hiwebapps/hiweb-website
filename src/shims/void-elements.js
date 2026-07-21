/** ESM shim: void-elements is CJS (`module.exports = {…}`) and breaks under Vite 8 when Sanity is not prebundled. */
const voidElements = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
};

export default voidElements;
