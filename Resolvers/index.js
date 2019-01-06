import {createUser} from './Users/createUser';
import {user} from './Users/getUser';
import { loginUser } from './Users/LoginUser';
import { currentUser } from './Users/currentUser';
import { createProfile } from './Profiles/createProfile';

export const resolvers = {
     Mutation : {
          createUser : createUser,
          loginUser  : loginUser,
          createProfile : createProfile
     },
     Query : {
        User : user,
        currentUser : currentUser
     }
}