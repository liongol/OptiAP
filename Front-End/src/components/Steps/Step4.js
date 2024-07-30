import './step.css';
import '.././/welcome/welcome.css'
import Header from "../Headers/Header";
import Underline from "../Underline";
import Upload from "./UploadTemplate/UploadTemplate";
import React from 'react';

const getRandomColor = () => {
    // Generate random values for R, G, B
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Return the RGB string format
    return [r,g,b];
}

const removeBeacon = (index, arrayBeaconsLocations, setArrayBeaconsLocations)=>{
    let tmp = [...arrayBeaconsLocations];
    tmp.splice(index, 1);
    setArrayBeaconsLocations(tmp);
}

const getTableOfBeacons = (arrayBeaconsLocations, setArrayBeaconsLocations) => {
    const removeBeacon = (index, array, setArray) => {
        const newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);
    };

    return (
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 'bold' }}>
            <table style={{paddingLeft: 530}}>
                <thead>
                <tr>
                    <th style={{border: '1px solid black'}}>Beacon</th>
                    <th style={{border: '1px solid black'}}>Color</th>
                </tr>
                </thead>
                <tbody>
                {arrayBeaconsLocations.map((coordinate, index) => {
                    const tmpColor = `rgb(${coordinate.color[0]},${coordinate.color[1]},${coordinate.color[2]})`;
                    return (
                        <tr key={index}>
                            <td style={{border: '1px solid black'}}>#{index + 1}</td>
                            <td style={{backgroundColor: tmpColor, border: '1px solid black'}}></td>
                            <td><button className="circle-button" onClick={() => removeBeacon(index, arrayBeaconsLocations, setArrayBeaconsLocations)}>
                                X
                            </button></td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

const Step4 =(props)=>
{
    let tmp;
    return (
        <div>
            <Header goToPage={props.goToPage}/>
            <p className="textHead">Step 4</p>
            <pre className="textPara">{"Great! \n Now mark the locations where you would like to place the beacons in the structure." +
                "\n You can easily remove any beacon by clicking the red button next to the respective beacon.\n"}</pre>
            <div className="image-preview">
                <img id="image" src={props.uploadedImg} alt="Uploaded Map" style={{ maxWidth: '100%' }}
                     onClick={(event)=>
                     {
                         const color= getRandomColor();
                         tmp=[...props.arrayBeaconsLocations];
                         tmp.push({x: event.pageX, y: event.pageY, color: color});
                         console.log({x: event.pageX, y: event.pageY, color: color})
                         props.setArrayBeaconsLocations(tmp);
                         console.log(tmp)
                     }
                     }/>
                {props.arrayBeaconsLocations.map((coordinate, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                             left: coordinate.x,
                            top: coordinate.y, 
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: `rgb(${coordinate.color[0]},${coordinate.color[1]},${coordinate.color[2]})`,
                            transform: 'translate(-50%, -50%)' // Center the dot on the clicked point
                        }}
                    ><p>{index + 1}</p></div>))}
            </div>
            {getTableOfBeacons(props.arrayBeaconsLocations, props.setArrayBeaconsLocations)}
            <table className={'tableBody'}>
                <td><button className={'buttonGrey'} onClick={() => {props.setArrayTwoDotsImg([]); props.setDistance(0);
                    props.setStepNumber('3');}}>Back</button></td>
                <td>
                    <button
                        className={'buttonGrey'}
                        onClick={() => {
                            props.CorrectBeaconsLocations();
                            props.setStepNumber('loading');
                            props.SendBeacnosLocAndRGB(props.arrayBeaconsLocations);
                            props.SendDone();
                        }}
                    >
                        Next
                    </button>
                </td>            </table>
            <Underline/>
        </div>
    );
}

export default Step4;