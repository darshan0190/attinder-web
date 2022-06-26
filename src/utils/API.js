import axios from "axios";
import { getJWT } from "../helpers/jwt";

const jwtdata = getJWT();
export default axios.create({
  headers: { Authorization: jwtdata },
});
