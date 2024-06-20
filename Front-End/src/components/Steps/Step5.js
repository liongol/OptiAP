import './step.css';
import Header from "../Headers/Header";
import Underline from "../Underline";
import React from 'react';

const getTableOfAps = (arrayApsLocations) =>{
    return(
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 'bold' }}>
            <table style={{paddingLeft: 530}}>
                <tr>
                    <th style={{border:'1px solid black'}}>Ap</th>
                    <th style={{border:'1px solid black'}}>Location</th>
                </tr>
                {arrayApsLocations.map((coordinate, index) => (
                    <tr>
                        <td style={{border:'1px solid black'}}>#{index + 1}</td>
                        <td style={{border:'1px solid black'}}>({coordinate.x},{coordinate.y})</td>
                    </tr>))}
            </table>
        </div>);
}

const Step5 =(props)=>
{
    let tmp;
    return (
        <div>
            <Header goToPage={props.goToPage}/>
            <p className="textHead">Step 5</p>
            <pre className="textPara">{"Done! \n You can now configure your wireless access points for optimal signal coverage by placing them in the locations given below." }</pre>
            <div className="image-preview">
                <img id="image" src={props.uploadedImg} alt="Uploaded Map" style={{ maxWidth: '100%' }}/>
                {props.arrayApsLocations.map((coordinate, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: coordinate.x,
                            top: coordinate.y,
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            transform: 'translate(-50%, -50%)' // Center the dot on the clicked point
                        }}
                    ><p>{index + 1}</p></div>))}
            </div>
            {getTableOfAps(props.arrayApsLocations)}
            <p>
                <button className={'buttonBlue'} onClick={() =>props.setStepNumber('Welcome')}>Back to Home Page</button>
            </p>
            <p>
                <button className={'buttonBlue'} onClick={() =>props.SendDone()}>Done</button>
            </p>
            <Underline/>
        </div>
    );
}

export default Step5;