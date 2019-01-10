import { verify } from "jsonwebtoken";
import { secretOrKey } from "../config/keys";

export const authenticateUser = request => {
  const header = request.headers.authorization;
  if (!header) {
    throw new Error('not authorized')
  } else {
    const token = header.replace("Bearer ", "");
    const decoded = verify(token, secretOrKey);
    if (decoded instanceof Error) {
      throw new Error('invalid token')
    } else {
      return {
        user: decoded.user,
        id: decoded.id,
        email: decoded.email
      };
    }
  }
};
