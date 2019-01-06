import {authenticateUser} from '../../Validators/auth';




export const currentUser = (parent,args,ctx) => {
      const user = authenticateUser(ctx.request);
      if(user instanceof Error){
          return Error(JSON.stringify('NOT AUTHORIZED'));
      } else {
          return {
              name : user.user,
              email : user.email,
              _id   : user.id
          } 
      }
}

