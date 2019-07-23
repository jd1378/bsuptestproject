/** deletes a cookie
 * @param {String} cname - cookie name
 */
const deleteCookie = cname => {
  document.cookie = cname + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
};

/** returns cookie value
 * @param {String} cname - cookie name
 */
const getCookie = cname => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

/** sets a cookie
 * @param {String} cname - cookie name
 * @param {String} value - cookie value
 * @param {Number} exSec - expire in seconds
 */
const setCookie = (cname, cvalue, exSec) => {
  var d = new Date();
  d.setTime(d.getTime() + exSec * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export { deleteCookie, getCookie, setCookie };
