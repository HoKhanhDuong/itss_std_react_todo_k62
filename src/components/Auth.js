import React, {useEffect, useRef, useState} from "react";
import firebase, {storageImage, uiConfig} from "../lib/firebase";
import {StyledFirebaseAuth} from "react-firebaseui";
import useStorageUser from "../hooks/storage_user";
import Todo from "./Todo";

function Auth() {
    const [users, addUser, updateUser] = useStorageUser();
    const inputFile = useRef(null);
    const [currentUser, setCurrentUser] = useState([]);
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            if (!!user) {
                const target = {key: user.email, name: user.displayName, image: user.photoURL};
                setCurrentUser(target);
                let flag = false;
                for (let target of users) {
                    if (target.key === user.email) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    addUser(target);
                }
            }
        });
        return () => unregisterAuthObserver();
    });
    const handleClickAvatar = () => {
        inputFile.current.click();
    };
    const handleChangeFile = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        // console.log(file);
        await storageImage.child(currentUser.key).put(file);
        const url = await storageImage.child(currentUser.key).getDownloadURL();
        await setCurrentUser({...currentUser, image: url});
        await updateUser(currentUser);
        e.target.value = null;
    };
    if (currentUser.length === 0) {
        return (
            <div className="column panel-block">
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        );
    }
    const signout = () => {
        firebase.auth().signOut();
        setCurrentUser([]);
    };
    
    return (
        <div>
            <div className="columns panel-block">
                <div className="column is-one-fifth">
                    <img src={currentUser.image} alt="" onClick={this.handleClickAvatar} style={{cursor: 'pointer'}}/>
                    <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={this.handleChangeFile}/>
                </div>
                <div className="column">
                    {firebase.auth().currentUser.displayName}
                    <button className="button is-danger is-light is-small" onClick={signout}>Sign out</button>
                </div>
            </div>
            <Todo/>
        </div>
    );
}
export default Auth; 