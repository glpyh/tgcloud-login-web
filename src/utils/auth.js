import tgCookie from "./cookie";

const TokenKey = "login-token";

export function getToken() {
  return tgCookie.get(TokenKey);
}

export function setToken(token) {
  return tgCookie.set({ key: TokenKey, value: token });
}

export function removeToken() {
  return tgCookie.remove(TokenKey);
}
