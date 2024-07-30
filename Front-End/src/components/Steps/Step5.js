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
                        <td style={{border:'1px solid black'}}>(11,13)</td>
                    </tr>))}
            </table>
        </div>);
}

const Step5 = (props) => {
    return (
        <div>
            <Header goToPage={props.goToPage}/>
            {"this i"}
            {console.log(props.arrayApsLocations)}
            <p className="textHead">Step 5</p>
            <pre className="textPara">{"Done! \n You can now configure your wireless access points for optimal signal coverage by placing them in the locations given below." }</pre>
            <div className="image-preview" style={{ position: 'relative' }}>
                <img id="image" src={props.uploadedImg} alt="Uploaded Map" style={{ maxWidth: '100%' }}/>
                {props.arrayApsLocations.map((coordinate, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: 780, // Assuming coordinate has x and y properties
                            top: 200,
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(255,0,0)',
                            transform: 'translate(-50%, -50%)' // Center the dot on the clicked point
                        }}
                    >
                        <p>{index + 1}</p>
                    </div>
                ))}
            </div>
            {getTableOfAps([1])}
            {console.log(props.arrayApsLocations)}
            <p>
                <button className={'buttonBlue'} onClick={() =>props.setStepNumber('Welcome')}>Back to Home Page</button>
            </p>
            <Underline/>
        </div>
    );
}

export default Step5;
