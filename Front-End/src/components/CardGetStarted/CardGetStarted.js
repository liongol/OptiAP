import React from 'react';
import './CardGetStarted.css';
import logo from '../../assets/LOGO_circlePNG.PNG';
import '../../ButtonsDesigns.css'
function CardGetStarted(props) {
    return (
        <div style={{ position: 'relative', left: '80px' }}>
            <table className="CardBody">
                <tr>
                    <td className="GetStarted">Get started with OptiAP today!</td>
                    <td><img className="imageLogo" src={logo} alt='Logo' /></td>
                </tr>
                <tr className="paraCard"><td>Start optimizing your processes today</td></tr>
                <tr><td><button className="buttonBlue" onClick={()=>props.goToPage('Step1')}>Try now</button></td></tr>
            </table>
            <table/><table/>
        </div>
    );
}

export default CardGetStarted;