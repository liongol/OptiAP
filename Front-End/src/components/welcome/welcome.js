import React from 'react';
import './welcome.css'
import logo from '../../assets/LOGO.jpeg';
import '../Headers/HeaderHome'
import HeaderHome from "../Headers/HeaderHome";
import Underline from "../Underline";
import '../../ButtonsDesigns.css'
console.log(logo);


function Welcome(props) {
    return (
        <div>
            <HeaderHome goToPage={props.goToPage}/>
            <table className="TableBody">
                <tr/><tr/>
                <tr>
                    <td className="welcome">Welcome to OptiAP</td>
                    <td><img className="imageWelcome" src={logo} alt='Logo'/></td>
                </tr>
                <tr>
                    <td className="para">Setting up wireless access points efficiently for optimal signal coverage</td>
                </tr>
                <tr><p/></tr>
                <tr>
                    <td>
                        <button className="buttonBlue" onClick={()=> props.goToPage('Step1')}>Start now</button></td>
                    <td><button className="buttonGrey" onClick={()=>props.goToPage('Instructions')}>See how it works</button></td>
                </tr>
            </table>
            <bottom> <Underline/></bottom>
        </div>
    );
}

export default Welcome;