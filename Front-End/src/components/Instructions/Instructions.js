import Header from "../Headers/Header";
import Underline from "../Underline";
import React from "react";
import VideoAP from '../../assets/OptiUPVideo.mp4';

const Instructions =(props)=>
{
    return (
        <div>
            <Header goToPage={props.goToPage}/>
            <p className="textHead">See how it works</p>
            <p className="textPara">Watch the video below to see how optiAP operates in action</p>
            <video width="600" controls>
                <source src={VideoAP} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Underline/>
        </div>
    );
}

export default Instructions;