import * as firebase from "firebase/app";
import "firebase/auth";

export const handleSignOut = () => {
        firebase.auth().signOut().then(result =>{
            console.log("signout succeesful")
        }).catch(err => {
            console.log(err.message)
        });
}
