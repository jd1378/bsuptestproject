import { deleteCookie, getCookie, setCookie } from "./utils/cookiehelper";

const TOKEN_KEY = "access_token";

/**
 * Manages how Access Token is being stored and retreived.
 **/
const TokenService = {
  getToken() {
    return getCookie(TOKEN_KEY);
  },

  saveToken(accessToken, expire_in) {
    setCookie(TOKEN_KEY, accessToken, expire_in);
  },

  removeToken() {
    deleteCookie(TOKEN_KEY);
  }
};

export { TokenService };
