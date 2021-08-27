import 'nextra-theme-docs/style.css';
import Prism from 'prism-react-renderer/prism';
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-toml");
require("prismjs/components/prism-shell-session");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-nginx");
require("prismjs/components/prism-log");

export default function Nextra({ Component, pageProps }) {
  return <Component {...pageProps} />
}
