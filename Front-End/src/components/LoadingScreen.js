import React from 'react';
import './LoadingScreen.css';
import loading from '../assets/loading.gif';
const LoadingScreen = () => {
    return (
        <div className="container">
            <h1>Waiting for the optimal AP locations...</h1>
            <img src={loading} alt="Loading" className="imageLoading" />
        </div>
    );
};

export default LoadingScreen;