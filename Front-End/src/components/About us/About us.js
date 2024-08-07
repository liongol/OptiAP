import React, {useState} from 'react';
import './About us.css'
import '../../ButtonsDesigns.css'
import '../Headers/HeaderAboutUs'
import HeaderAboutUs from "../Headers/HeaderAboutUs";
import Or from "../../assets/Or.jpg";
import Yanai from "../../assets/Yanai.jpg";
import Lion from "../../assets/Lion.jpg";
import img from "../../assets/AboutUsGraphyc.png"
import Underline from "../Underline";
import CardGetStarted from "../CardGetStarted/CardGetStarted";
function AboutUs(props) {
    return (
        <div>
            <HeaderAboutUs goToPage={props.goToPage}/>
            <h1 className="Headlines">About us</h1>
            <p className="para">We, three B.Sc. Computer Science students from The Academic College of Tel-Aviv, Yaffo,
                have conceived and developed this product as our final project in the workshop titled
                "Software Development Based On Computer Communication," under the mentorship of Dr. Binsky Hadar.</p>
            <img className="imageGraphy" src={img} alt='img' />
            <h1 className="Headlines">Our mission</h1>
            <p className="para">At YOLosoft, we're tackling the issue of setting up wireless access points (APs) efficiently for optimal signal coverage.
                Existing solutions are expensive and require expert assistance,
                making them inaccessible for smaller setups. Our solution offers a
                cost-effective, user-friendly approach using algorithms and hardware like
                microcontrollers to determine the best AP placement for small areas, empowering
                individuals and small organizations to enhance their wireless network coverage
                without extensive resources or external help.
            </p>
            <h1 className="Headlines">YOLosoft Team</h1>
            <p className="text">Meet the people behind our magical product</p>
            <table className="shiftRight">
                <tr>
                <td><img className="imageProfile" src={Yanai} alt='Yanai'/></td>
                <td><img className="imageProfile" src={Or} alt='Or' /></td>
                <td><img className="imageProfile" src={Lion} alt='Lion' /></td>
                </tr>
                <tr>
                    <td className="text"><b>Yanai Paran</b></td>
                    <td className="text"><b>Or Asherov</b></td>
                    <td className="text" ><b>Lion Golovanevsky</b></td>
                </tr>
                <tr>
                    <td className="text">Head of Back-End development</td>
                    <td className="text">Head of Front-End web development</td>
                    <td className="text">Head of IoT development</td>
                </tr>
            </table>
            <div className="shiftRight">
                <CardGetStarted goToPage={props.goToPage}/>
            </div>
            <Underline/>
        </div>
    );
}

export default AboutUs;
