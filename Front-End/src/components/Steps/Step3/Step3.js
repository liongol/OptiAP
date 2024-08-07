import '../step.css';
import Header from "../../Headers/Header";
import Underline from "../../Underline";
import DistanceFromUser from "./DistanceFromUser";
import React, {useState} from 'react';

const Step3 =(props)=>
{
    let tmp;
    return (
        <div>
            <Header goToPage={props.goToPage}/>
            <p className="textHead">Step 3</p>
            <pre className="textPara">{"Fantastic! \n Now, please mark two points on the map where you know the distance between them."}</pre>
            <div>
                <form>
                    <label className={"textPara"}>
                        Distance (in meters):
                        <input
                            type="number"
                            value={props.distance}
                            onChange={(e) => {
                                props.setDistance(e.target.value);
                                console.log('distance:', e.target.value);
                            }}
                        />
                    </label>
                </form>
            </div>
            <div className="image-preview">
            <img id="image" src={props.uploadedImg} alt="Uploaded Map" style={{ maxWidth: '100%' }}
                 onClick={(event)=>
                 {
                     if (props.arrayTwoDotsImg.length < 2)
                     {
                     console.log(event.pageX,event.pageY);
                     tmp=[...props.arrayTwoDotsImg];
                     tmp.push({x: event.pageX, y: event.pageY});
                     props.setArrayTwoDotsImg(tmp);
                     }
                 }}/>
            {props.arrayTwoDotsImg.map((coordinate, index) => (
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
                />
            ))}
            </div>
            <table className={'tableBody'}>
                <td>
                    <button className={'buttonGrey'} onClick={() => {
                        props.setBeginningOfAxis([]);
                        props.setDistance(0); props.setStepNumber('2');
                    }}>Back
                    </button>
                </td>
                <td>
                    <button
                        className={'buttonGrey'}
                        onClick={() => { props.setStepNumber('4'); }}
                        style={{ display: (props.arrayTwoDotsImg.length > 1 && props.distance!==0) ? 'inline-block' : 'none' }}
                    >
                        Next
                    </button>
                </td>
            </table>
            <Underline/>
        </div>
    );
}
export default Step3;