import React,{useState, useRef} from 'react';
import Step1 from "./step1";
import Step2 from "./Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Welcome from "../welcome/welcome";
import LoadingScreen from "../LoadingScreen";
import axios from 'axios';

function Steps(props) {
    const [uploadedImg, setUploadedImg] = useState(null);
    const[stepNumber,setStepNumber]=useState('1');
    const [arrayBoundingImg,setArrayBoundingImg]=useState([]);
    const [arrayBeaconsLocations , setArrayBeaconsLocations]=useState([]);
    const [arrayApsLocations , setArrayApsLocations]=useState([]); //Results from API...
    const [beginningOfAxis,setBeginningOfAxis]=useState([]);
    const [arrayTwoDotsImg,setArrayTwoDotsImg]=useState([]);
    const [distanceBetweenTwoDots, setDistanceBetweenTwoDots]=useState(0);

    let step;
    // Render the appropriate screen based on the currentPage state

    // axios requests handling
    const baseURL = "http://localhost:8000";

    function calculateXYDistances(point1, point2) {
        const xDistance = Math.abs(point1.x - point2.x);
        const yDistance = Math.abs(point1.y - point2.y);

        return {
            xDistance: xDistance,
            yDistance: yDistance
        };
    }

    const calculateDistance=(point1, point2)=>
    {
        const x1 = point1.x;
        const y1 = point1.y;
        const x2 = point2.x;
        const y2 = point2.y;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    const getRatioMapToReality=()=>{
        const mapDistance= calculateDistance(arrayTwoDotsImg[0], arrayTwoDotsImg[1]);
        return (distanceBetweenTwoDots/mapDistance);
    }
    const CorrectBeaconsLocations=()=>
    {
        let tmp=[];
        let fromBeginning;
        const ratioMap = getRatioMapToReality();
        arrayBeaconsLocations.map((coordinate) =>
            {
                fromBeginning = calculateXYDistances(beginningOfAxis,coordinate);
                tmp.push({x : fromBeginning.xDistance * ratioMap, y:fromBeginning.yDistance * ratioMap});
            });
        setArrayBeaconsLocations(tmp);
    }

    const APsReturnedToMapValues=()=>{
        let tmp=[];
        let fromBeginning;
        const ratioMap = getRatioMapToReality();
        arrayApsLocations.map((coordinate) =>
        {
            fromBeginning = calculateXYDistances(beginningOfAxis,coordinate);
            tmp.push({x : fromBeginning.xDistance / ratioMap, y:fromBeginning.yDistance / ratioMap});
        });
        console.log("this is the returned tmp:");
        console.log(tmp);
        tmp = [1]
        setArrayApsLocations(tmp);
    }

    const SendBeacnosLocAndRGB = (arrayBeaconsLocations) => {
        axios.post(`${baseURL}/beacons_locations_and_colors`, {
            beacons_data: {arrayBeaconsLocations}
            }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => console.log(response))
            .catch((error) => console.error(error));
    }

    const SendDone = () => {
        axios.get(`${baseURL}/done`)
            .then((response) => {
                console.log(response)
                const arrayApsLocations = response.data.optimal_locations;
                setArrayApsLocations(arrayApsLocations);
                APsReturnedToMapValues();
                console.log("the array of optimal locations ::::::::::");
                console.log(arrayApsLocations); // This will log the arrayApsLocations array
                setStepNumber('5');
        })
            .catch((error) => console.error(error));
    }


    if (uploadedImg === null)
    {
        step = <Step1 goToPage = {props.goToPage} setStepNumber={setStepNumber} setUploadedImg = {setUploadedImg} />;
    }
    else
    {
        // eslint-disable-next-line default-case
        switch (stepNumber)
        {
            case '2':
                step = <Step2 goToPage = {props.goToPage} setStepNumber={setStepNumber}
                              uploadedImg = {uploadedImg} setUploadedImg = {setUploadedImg}
                              arrayBoundingImg={arrayBoundingImg} setArrayBoundingImg={setArrayBoundingImg}
                              beginningOfAxis={beginningOfAxis}
                              setBeginningOfAxis={setBeginningOfAxis} setArrayTwoDotsImg={setArrayTwoDotsImg}/>;
                break;
            case '3':
                step= <Step3 goToPage = {props.goToPage} setStepNumber={setStepNumber} uploadedImg = {uploadedImg}
                             arrayTwoDotsImg={arrayTwoDotsImg} setArrayTwoDotsImg={setArrayTwoDotsImg}
                             distance={distanceBetweenTwoDots} setDistance={setDistanceBetweenTwoDots} setBeginningOfAxis={setBeginningOfAxis}/>;
                break;

            case '4':
                step = <Step4 goToPage = {props.goToPage} setStepNumber={setStepNumber} uploadedImg = {uploadedImg}
                              arrayBoundingImg={arrayBoundingImg} arrayBeaconsLocations={arrayBeaconsLocations} setArrayBeaconsLocations={setArrayBeaconsLocations}
                              SendBeacnosLocAndRGB = {SendBeacnosLocAndRGB} CorrectBeaconsLocations = {CorrectBeaconsLocations}
                              setArrayTwoDotsImg={setArrayTwoDotsImg} setDistance={setDistanceBetweenTwoDots} SendDone = {SendDone}/>;
                break;
            case 'loading':
                step= <LoadingScreen/>;
                break;
            case '5':
                step = <Step5 goToPage = {props.goToPage} setStepNumber={setStepNumber} uploadedImg = {uploadedImg}
                              arrayApsLocations={arrayApsLocations} SendDone = {SendDone}/>;
                break;
            case 'Welcome':
                props.goToPage('Welcome');
                step= <Welcome goToPage='Welcome' />;
                break;
        }
    }
    return (
        <div>
            {step}
        </div>
    );
}

export default Steps;