import './step.css';
import Header from "../Headers/Header";
import Underline from "../Underline";
import Upload from "./UploadTemplate/UploadTemplate";
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Step1 =(props)=>
{
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, []);

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);
            console.log('User signed in successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    if(user){
        return (
            <div>
                <Header goToPage={props.goToPage}/>
                <p className="textHead">Step 1</p>
                <p className="textPara">Upload a map of a structure where you're willing to identify optimal access
                points' placements.</p>
                <Upload setUploadedImg={props.setUploadedImg} setStepNumber={props.setStepNumber}/>
                <Underline/>
                <button onClick={() => setUser(null)}>Sign Out</button>
            </div>
    );
    }
    else{
        return (
            <form onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign In</button>
            </form>
          );
    }

}

export default Step1;