import Cookies from "js-cookie";
export const getJWT = () => {
  return Cookies.get("X-PPEC-JWT");
};
export const getTS = () => {
  return Cookies.get("X-PPEC-TS");
};
