import isEmpty from '../isEmpty';
const initialState = {
      user : {},
      isAuthenticated : false
}

export default function userReducer(state = initialState,action){
        switch(action.type){
            case "USER_AUTH" : 
            return {
             ...state,
             user : action.payload,
             isAuthenticated : !isEmpty(action.payload)
            }
            default : 
              return state
        }
} 