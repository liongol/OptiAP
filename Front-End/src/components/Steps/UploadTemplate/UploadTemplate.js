import React, { useState } from 'react';
import './UploadTemplate.css';
import upload from '../../../assets/upload.PNG'


function Upload(props) {
    // Function to handle file selection
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log("this is what were setting at the img:::")
                props.setUploadedImg(event.target.result);
                props.setStepNumber('2');
            };
            reader.readAsDataURL(file);
        }
    };
    // Function to handle drag and drop
    const handleDragDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                props.setUploadedImg(event.target.result);
                props.setStepNumber('2');
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to prevent default behavior during drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
    };


    return (
        <div className="UploadBody">
            <img className="imageUpload" src={upload} alt='upload' />
            <div className="upload-area" onDrop={handleDragDrop} onDragOver={handleDragOver}>
                <input type="file" accept="image/*" onChange={handleFileSelect} />
                <p className="UploadText">Drag &amp; Drop or Click to Upload</p>
            </div>
        </div>
    );
}

export default Upload;