import React, { useEffect, useState, createContext } from "react";
import { getJWT } from "../helpers/jwt";
// var jwtDecode = require("jwt-decode");

interface ContextValue {
  authentication: boolean;
  setauthentication: any;
  token: string;
}

export const AccountContext = createContext({
  authentication: false,
  setauthentication: () => {},
  token: "",
} as ContextValue) ;

export const AccountProvider: React.FC<any> = ( {children}:any) => {
  const [authentication, setauthentication] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const jwt = getJWT();
console.log("jwt",jwt)
console.log("auth1",authentication)
    if (!jwt) {
      console.log("No cookie token");
      setauthentication(false);
      // var rurl = window.location.href;
      // alert(window.location.pathname)
      // TODO:
      // var encodedURL =
      //   "https://nm5.ppec.phonepe.com/oauth/login?rurl=" +
      //   encodeURIComponent(rurl);
      
    } else {
      console.log("JWT Present");
      setToken(jwt)
      setauthentication(true)
      // const data = jwtDecode(jwt);

      // const ts = getTS() ?? 0;
      // if (data.iat === Math.floor(parseFloat(ts.toString()))) {
      //   console.log("VALID TS");
      //   var accessArray: any = [];
      //   var readerArray: any = [];
      //   var writerArray: any = [];
      //   // console.log("UDEBUG" + JSON.stringify(data.sub.access));
      //   Object.keys(data.sub.access).map((key) => {
      //     accessArray.push(key);
      //     if (data.sub.access[key] === "WRITER") {
      //       writerArray.push(key);
      //     } else {
      //       readerArray.push(key);
      //     }
      //   });

      //   var userObj = {
      //     user_name: data.sub.name,
      //     user_id: data.sub.email,
      //     profile_pic: data.sub.profile_pic,
      //     access: accessArray,
      //     reader: readerArray,
      //     writer: writerArray,
      //     groups: data.sub.groups,
      //   };
      //   setUser(userObj);
      //   setToken(jwt);
      //   setauthentication(true);
      // } else {
      //   console.log("INVALID TS ");
      //   setauthentication(false);
      // }
    }
  }, [setauthentication]);

  // useEffect(() => {
  //   const timeout = setInterval(() => {
  //     const jwt: any = getTS();
  //     var date: any = new Date(jwt * 1000);
  //     var date2 = new Date(new Date(date).getTime() + 60 * 60 * 24 * 1000);
  //     var rightnow = new Date(Date.now());
  //     var dif = date2.getTime() - rightnow.getTime();
  //     if (dif / 1000 < 900) {
  //       setAlert(true);
  //     }
  //     // if (!jwt) {
  //     //   setauthentication(false);
  //     // }
  //   }, 10000);
  //   return () => {
  //     clearInterval(timeout);
  //   };
  // }, []);
  return (
    <AccountContext.Provider
      value={{ authentication, setauthentication, token }}
    >
      {children}
    </AccountContext.Provider>
  );
};
