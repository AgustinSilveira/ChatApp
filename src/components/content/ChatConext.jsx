import { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../../firebase/config"
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const ChatContext = createContext();



export const ChatContextProvider = ({ children }) => {
    const [USER] = useAuthState(auth);
    
    
    

    const INITIAL_STATE = {
        chatId: "null",
        user:{}
    }

    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId :
                    USER.uid > action.payload.uid
                    ? USER.uid + action.payload.uid
                    : action.payload.uid + USER.uid,
                }
                default:
                    return state
            }
    }
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}