import User from "../../models/User";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import validateLoginInput from "../../Validators/loginValidators";
import { secretOrKey } from "../../config/keys";

export const loginUser = async (parent, args) => {
  const { errors, isValid } = validateLoginInput(args);
  if (!isValid) {
    return Error(JSON.stringify(errors));
  } else {
    const user = await User.findOne({ email: args.email });
    if (!user) {
      return Error(JSON.stringify({...errors,email : "the email doesn't exist"}))
    } else {
      const isMatched = await compare(args.password, user.password);
      if (!isMatched) {
        return Error(
          JSON.stringify({...errors,password : "password doesn't match"})
        );
      } else {
        const payload = { id: user.id, user: user.name , email : user.email};
        //sign the token
        const token = jwt.sign(payload, secretOrKey);
        return {token : "Bearer " + token};
      }
    }
  }
};
