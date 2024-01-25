import React from "react";
import { signOut } from "firebase/auth"
import { auth } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {

    const [user] = useAuthState(auth);

    return(
        <div className="navbar-chat">
            <span className="logo-chat"></span>
            <div className="user-chat">
                <div className="user-chat">
                    <img src={user.photoURL} alt="" />
                    <span>{user.displayName}</span>
                </div>
                
                <button onClick={()=>signOut(auth)}>Cerrar sesión</button>
            </div>
        </div>
    )
}

export default Navbar