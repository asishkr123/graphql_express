import validateRegisterInput from "../../Validators/userValidators";
import User from "../../models/User";
import { hash as _hash } from "bcryptjs";

export function createUser(parent, args) {
  const { errors, isValid } = validateRegisterInput(args);
  if (!isValid) {
    console.log("run into error");
    return Error(JSON.stringify(errors));
  } else {
    console.log("running without error");
    return User.findOne({ email: args.email }).then(user => {
      if (user) {
        return Error(JSON.stringify((errors.email = "email already exists")));
      } else {
        const newUser = new User({
          name: args.name,
          email: args.email,
          password: args.password
        });
        return _hash(newUser.password, 12)
          .then(hashedPassword => {
            newUser.password = hashedPassword;
            return newUser.save().then(user => {
              return { ...user._doc,password : null, _id: user.id };
            });
          })
          .catch(err => {
            throw err;
          });
      }
    });
  }
}
