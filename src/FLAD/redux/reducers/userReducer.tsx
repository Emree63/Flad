import { User } from "../../Model/User";
import { userTypes } from "../types/userTypes";
const initialState = {
  loading: false,
  user: User, // for user object
  userFladToken: "", // for storing the JWT
  userSpotifyToken : null,
  error: null,
  isLogedIn: false,
  }
  
  const userReducer = (state = initialState, action : any) => {
    switch (action.type) {
      // just for the navigation and speciafly use 
      // and 
      case userTypes.RESTORE_TOKEN:
            const resp = (action.playload ==  "" ? false : true)
            console.log(resp, "si il ya le tokennen ou passssssssssss")
          return {
            ...state,
            userFladToken : action.playload,
            loading: true,
            isLogedIn: resp,
          };
      case userTypes.LOGIN:
        console.log("++++++++++++++++++++++++++++++++++++++userRducer+++++++++++++++++++++++++++++3");  
        console.log(action.playload, "LOOGGIIINN");  
        console.log("++++++++++++++++++++++++++++++++++++++userRducer+++++++++++++++++++++++++++++3");  
        return {
          ...state,
          user :action.playload,
          isLogedIn: true 
        };
      case userTypes.SIGNUP:
        console.log("++++++++++++++++++++++++++++++++++++++userRducer+++++++++++++++++++++++++++++3");  

        console.log(action.playload, "LOOGGIIINN");  
        console.log("++++++++++++++++++++++++++++++++++++++userRducer+++++++++++++++++++++++++++++3");  
      return {
        ...state,
        user :action.playload,
        isLogedIn: true 
      };
      // case USER_SIGNUP:
      //   return {...state, nounours: action.payload};
      case userTypes.USER_LOGOUT:
        return {...state,
          user :null,
          isLogedIn: false  }
      default:
        return state;
    }
  }
  export default userReducer

  