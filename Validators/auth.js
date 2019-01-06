import { verify } from "jsonwebtoken";
import { secretOrKey } from "../config/keys";

export const authenticateUser = request => {
  const header = request.headers.authorization;
  if (!header) {
    return Error(JSON.stringify("not authorized"));
  } else {
    const token = header.replace("Bearer ", "");
    const decoded = verify(token, secretOrKey);
    if (!decoded) {
      return Error(JSON.stringify( 'errors : invalid token'))
    } else {
      return {
        user: decoded.user,
        id: decoded.id,
        email: decoded.email
      };
    }
  }
};
