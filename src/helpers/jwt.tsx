import Cookies from "js-cookie";
export const getJWT = () => {
  return Cookies.get("attinderToken");
};

