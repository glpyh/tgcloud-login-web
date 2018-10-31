import { config } from "./config";
import tgCookie from "./cookie";

function getUrlKey(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export { config, tgCookie, getUrlKey };
