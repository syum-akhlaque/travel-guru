import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FirebaseConfig.js';
import { useContext } from 'react';
import { userContext } from '../../App';
import googleLogo from '../../Images/Icon/google.png';
import fbLogo from '../../Images/Icon/fb.png';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './Login.css'
import defaultUserImg from '../../Images/Icon/noImage.png'
firebase.initializeApp(firebaseConfig);

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const { register, handleSubmit, errors } = useForm();
    
    const [newUser, setNewUser] = useState(false) 
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const defaultUser = {
        isLogIn: false,
        name : '',
        photo : defaultUserImg,
        email : '',
        error: ''
      }

      //login with user and password
      const onSubmit = user =>{
    
        if(newUser && user.email && user.password){ // create user case, if new user

          if(user.password === user.confirm_password){

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
             .then(res=> {
               const newUserInfo = {...defaultUser};
               newUserInfo.isLogIn = true;
               newUserInfo.name = user.firstName +" "+user.lastName;
               newUserInfo.email = user.email;
               newUserInfo.error = '';
               setLoggedInUser(newUserInfo);
               updateUserName(newUserInfo.name);
               history.replace(from);
             })
             .catch(error => {
                const newUserInfo = {...defaultUser};
                newUserInfo.error = error.message;
                console.log(error.message);
                setLoggedInUser(newUserInfo);
            });   
          }

          else{ //if new new password and confirm password dont match
               const newUserInfo = {...defaultUser}; 
               newUserInfo.error = 'Password dont match';
               setLoggedInUser(newUserInfo);
          }
        }

        if(!newUser && user.email && user.password){ // login case, if not new user 
          console.log("Login User")
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(res =>{
            const newUserInfo = {...defaultUser};
               newUserInfo.isLogIn = true;
               newUserInfo.email = user.email;
               newUserInfo.error = '';
               newUserInfo.name = res.displayName;
               setLoggedInUser(newUserInfo);
               history.replace(from);
               console.log(res.user.displayName);
          })
          .catch(error => {
            const newUserInfo = {...defaultUser};
            newUserInfo.error = error.message;
            console.log(error.message);
            setLoggedInUser(newUserInfo);
          });
        }
      };
  
    //google login process
    const googleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(result => {
        const token = result.credential.accessToken;
        const {displayName, email, photoURL} = result.user;
        const newUserInfo = {...defaultUser};
        newUserInfo.isLogIn = true;
        newUserInfo.name = displayName;
        newUserInfo.email = email;
        newUserInfo.photo = photoURL
        newUserInfo.error = '';
        setLoggedInUser(newUserInfo);
        history.replace(from);
      })
      .catch(error => {
        const newUserInfo = {...defaultUser};
        newUserInfo.error = error.message;
        setLoggedInUser(newUserInfo);
      })
  }

  //facebook login process
  const facebookSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user;// The signed-in user info.

      const {displayName, email, photoURL} = user;
      const newUserInfo = {...defaultUser};
        newUserInfo.isLogIn = true;
        newUserInfo.name = displayName;
        newUserInfo.email = email;
        newUserInfo.photo = photoURL
        newUserInfo.error = '';
      setLoggedInUser(newUserInfo);
      history.replace(from);
    })
    .catch(error => {
      const newUserInfo = {...defaultUser};
      newUserInfo.error = error.message;
      setLoggedInUser(newUserInfo);
    })
  }
  // set username in firebase when user created
  const updateUserName = name =>{
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('User name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }
  
    return (
    
        <div className = 'login-form'>
            <h4> { newUser ?  'Create an Account' :'Login'  }</h4>
            <form onSubmit={handleSubmit(onSubmit)} >
                       
                {newUser && <>  <input name="firstName" placeholder= 'First Name' ref={register({ required: true, minLength: 2 , pattern : /^([^0-9]*)$/ })} />
                {errors.firstName && <span className='error'>*Required, minimum charecters 2 and digit not allowed</span>}</>}

                {newUser && <> <input name="lastName" placeholder= 'Last Name' ref={register({ required: true,minLength: 2 , pattern : /^([^0-9]*)$/})} />
                {errors.firstName && <span className='error'>*Required, minimum charecters 2 and digit not allowed</span>}</>}

                <input name="email" type="email" defaultValue={loggedInUser.email} placeholder = "Email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
                 {errors.email && <span className='error'>Email is required </span>}

                <input type="password" name="password" placeholder= 'Password' ref={register({ required: true , pattern: /(?=.*\d)(?=.*[a-z]).{6,100}$/ })} />
                {errors.password && <span className='error'>*At least 1 number,1 one lowercase latter and minimum 6 characters </span>}
          
                {newUser && <> <input type="password" name="confirm_password" placeholder= 'Confirm Password' ref={register({ required: true , pattern: /(?=.*\d)(?=.*[a-z]).{6,100}$/ })} />
                {errors.Password && <span className='error'>*Password dont match</span>}  </>}
                
                 <span className='error'>{loggedInUser.error}</span>
              
                <input type="submit" value = { newUser ?  'Create an Account' :'Login'  }/>

                <p> { newUser ?  'Already have an account?' :'Dont have an account?' } 
                <small onClick={()=>{setNewUser(!newUser) ;loggedInUser.error="" }}> {!newUser ?  'Create account' :'Login'  } </small> </p> 

            </form> 
 
            <table width="95%">
              <tr>
                <td><hr /></td>
                <td className = 'table-hr'>Or</td>
                <td><hr /></td>
              </tr>
            </table>

            <button className = 'logo-button' onClick={googleSignIn}> <img src={googleLogo}  alt=""/>Continue With Google</button>
            <button className = 'logo-button'  onClick={facebookSignIn}> <img src={fbLogo}  alt=""/> Continue With Facebook</button>
          
        </div>
    );
};

export default Login;
