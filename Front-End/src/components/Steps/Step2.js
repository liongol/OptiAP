import './step.css';
import Header from "../Headers/Header";
import Underline from "../Underline";
import React, {useState} from 'react';
import '../../ButtonsDesigns.css';
import videojs from 'video.js';
import Step2Exp from '../../assets/Step2Exp.mp4';
import GetBoundingImage from "./GetBoundingImage";

const Step2 =(props)=> {
    return (
        <div>
            {/*<GetBoundingImage idImg={props.uploadedImg} setArrayBounding={props.setArrayBounding}/>*/}
            <Header goToPage={props.goToPage}/>
            <p className="textHead">Step 2</p>
            <pre className="textPara">{"Upload complete. \n Please mark the top-left corner of the submitted map. \n\n"}</pre>
            <div className="image-preview">
                <img id="image" src={props.uploadedImg} alt="Uploaded Map" style={{maxWidth: '100%'}}
                     onClick={(event) => {
                         props.setBeginningOfAxis([{x: event.pageX, y: event.pageY}]);
                         console.log({x: event.pageX, y: event.pageY});
                     }}/>
                {props.beginningOfAxis.length > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: props.beginningOfAxis[0].x,
                            top: props.beginningOfAxis[0].y,
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            transform: 'translate(-50%, -50%)', // Center the dot on the clicked point
                        }}
                    />
                )}
            </div>
            {/*<p className="textParaSmaller">You can view a demonstration in the video provided below.</pre>
                {/*<pre className="textPara">{"Upload complete. \n Now ensure to delineate the submitted map by marking the vertices encompassing the structure. " }</pre>*/}
            {/*<p className="textParaSmaller">You can view a demonstration in the video provided below. </p>*/}
            {/*<video controls width="350" height="250">*/}
            {/*    <source src={Step2Exp} type="video/mp4" />*/}
            {/*</video>*/}
            {/*<div className="image-preview">*/}
            {/*    <img id="image" src={props.uploadedImg} alt="Uploaded Map" style={{ maxWidth: '100%' }}*/}
            {/*         onClick={(event)=>*/}
            {/*    {*/}
            {/*        console.log(event.pageX,event.pageY);*/}
            {/*        tmp=[...props.arrayBoundingImg];*/}
            {/*        tmp.push({x: event.pageX, y: event.pageY});*/}
            {/*        props.setArrayBoundingImg(tmp);*/}
            {/*    }*/}
            {/*    }/>*/}
            {/*    {props.arrayBoundingImg.map((coordinate, index) => (*/}
            {/*        <div*/}
            {/*            key={index}*/}
            {/*            style={{*/}
            {/*                position: 'absolute',*/}
            {/*                left: coordinate.x,*/}
            {/*                top: coordinate.y,*/}
            {/*                width: '10px',*/}
            {/*                height: '10px',*/}
            {/*                borderRadius: '50%',*/}
            {/*                backgroundColor: 'red',*/}
            {/*                transform: 'translate(-50%, -50%)' // Center the dot on the clicked point*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}
            <table className={'tableBody'}>
                <td>
                    <button className={'buttonGrey'} onClick={() => {
                        props.setUploadedImg(null);
                        props.setStepNumber('1');
                        props.setBeginningOfAxis([]);
                    }}>Back
                    </button>
                </td>
                <td>
                    <button
                        className={'buttonGrey'}
                        onClick={() => {
                            props.setArrayTwoDotsImg([]);
                            props.setStepNumber('3');
                        }}
                        style={{ display: props.beginningOfAxis.length > 0 ? 'inline-block' : 'none' }}
                    >
                        Next
                    </button>                </td>
            </table>
            <Underline/>
        </div>
    );
}
export default Step2;