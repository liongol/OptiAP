import React,{useState, useEffect} from 'react';
import Step1 from "./step1";
import Step2 from "./Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Welcome from "../welcome/welcome";
import LoadingScreen from "../LoadingScreen";
import axios from 'axios';
import getBoundingImage from "./GetBoundingImage";
import { storage, firestore } from '../../firebase'; // Import storage and firestore from firebase.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary storage functions
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'; // Import necessary Firestore functions

function Steps(props) {
    const [uploadedImg, setUploadedImg] = useState(null);
    const[stepNumber,setStepNumber]=useState('1');
    const [arrayBeaconsLocations , setArrayBeaconsLocations]=useState([]);
    const [arrayApsLocations , setArrayApsLocations]=useState([]); //Results from API...
    const [beginningOfAxis,setBeginningOfAxis]=useState([]);
    const [arrayTwoDotsImg,setArrayTwoDotsImg]=useState([]);
    const [distanceBetweenTwoDots, setDistanceBetweenTwoDots]=useState(0);
    const [hasUpdated, setHasUpdated] = useState(false);
    //const [arrayBounding,setArrayBounding] = useState([]);

    let step;
    // Render the appropriate screen based on the currentPage state

    // axios requests handling

    const baseURL = "https://yanaiparan.pythonanywhere.com";

    const calculateDistance=(point1, point2)=>
    {
        const x1 = point1.x;
        const y1 = point1.y;
        const x2 = point2.x;
        const y2 = point2.y;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    }
    const getRatioMapToRealityAndRealityToMap=()=>{
        const mapDistance= calculateDistance(arrayTwoDotsImg[0], arrayTwoDotsImg[1]);
        return ([{map: mapDistance/distanceBetweenTwoDots, reality: 1},{map: 1, reality: distanceBetweenTwoDots/mapDistance}]);
    }
    const CorrectBeaconsLocations=()=>
    {
        let tmp=[];
        //let fromBeginning;
        const ratioMap = getRatioMapToRealityAndRealityToMap();
        arrayBeaconsLocations.map((coordinate) =>
            {
                tmp.push([(coordinate.x - beginningOfAxis[0].x) * ratioMap[1].reality, (coordinate.y - beginningOfAxis[0].y) * ratioMap[1].reality]);
            });
        setArrayBeaconsLocations(tmp);
        console.log('Beacons locations To reality values: ',arrayBeaconsLocations);
    }

    const APsReturnedToMapValues=()=>{
        let tmp=[];
        const ratioMap = getRatioMapToRealityAndRealityToMap();
        console.log('ratio map: ',ratioMap, 'distance between dots: ',distanceBetweenTwoDots);
        arrayApsLocations.map((coordinate) => {
            tmp.push({x: (beginningOfAxis[0].x + coordinate[0]* ratioMap[0].map), y: (beginningOfAxis[0].y + coordinate[1]* ratioMap[0].map),
                xReality: coordinate[0], yReality: coordinate[1]});
        });
        setArrayApsLocations(tmp);
        console.log('APs returned To Maps values: ',arrayApsLocations);

    }

    const SendBeacnosLoc = (arrayBeaconsLocations) => {
        axios.post(`${baseURL}/store_data`, {
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
                const arrayApsLocations1 = response.data.optimal_locations;
                setArrayApsLocations(arrayApsLocations1);
                setStepNumber('5');

                // Send answer to server
        })
            .catch((error) => console.error(error));
    }


    useEffect(() => {
        if (arrayApsLocations.length > 0 && !hasUpdated) {
            console.log('APs result reality values: ', arrayApsLocations);
            APsReturnedToMapValues();
            setHasUpdated(true); // Set flag to prevent further calls
        }
    }, [arrayApsLocations]);

    /*const stam = () => {
        console.log('begin of axis: ', beginningOfAxis);
        const arrayApsLocations1 = [[5, 6],[2,1]];
        setArrayApsLocations(arrayApsLocations1);
        setStepNumber('5');
    }*/
   // Function to convert a base64 string to a Blob
const base64ToBlob = (base64, mime) => {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
};


const SendDoneDemoResults = () => {
    axios.get(`${baseURL}/done_demo`)
        .then(async (response) => {
            let arrayApsLocations1 = response.data.optimal_locations;
            let arrayApsLocationsflat = arrayApsLocations1.flat(); // Flatten the array if needed

            setArrayApsLocations(arrayApsLocations1);
            setStepNumber('5');

            try {
                if (!uploadedImg) {
                    throw new Error('No valid image available for upload.');
                }

                // Extract the MIME type from the Base64 string
                const mime = uploadedImg.match(/:(.*?);/)[1];
                // Convert Base64 to Blob
                const blob = base64ToBlob(uploadedImg, mime);

                // Create a unique file name
                const fileName = `image_${Date.now()}.jpg`;

                // Create a storage reference
                const imageRef = ref(storage, `images/${fileName}`);

                // Upload the blob
                const snapshot = await uploadBytes(imageRef, blob);
                const downloadURL = await getDownloadURL(snapshot.ref);

                console.log('Uploaded a blob or file! Image URL:', downloadURL);

                // Prepare the data to save
                const newData = {
                    locations: arrayApsLocationsflat,
                    imageUrl: downloadURL,
                    timestamp: serverTimestamp()
                }
                const docId = fileName.split('.')[0]; // Using the filename without extension as docId

                // Save data to Firestore
                const docRef = doc(firestore, 'results', docId);
                await setDoc(docRef, newData);

                console.log('Data successfully written!');
            } catch (error) {
                console.error('Error uploading image or saving data:', error);
            }
        })
        .catch((error) => console.error(error));
};
        

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
                               arrayBeaconsLocations={arrayBeaconsLocations} setArrayBeaconsLocations={setArrayBeaconsLocations}
                              SendBeacnosLoc = {SendBeacnosLoc} CorrectBeaconsLocations = {CorrectBeaconsLocations}
                              setArrayTwoDotsImg={setArrayTwoDotsImg} setDistance={setDistanceBetweenTwoDots} SendDone={SendDoneDemoResults}/>;
                break;
            case 'loading':
                step= <LoadingScreen/>;
                break;
            case '5':
                step = <Step5 goToPage = {props.goToPage} setStepNumber={setStepNumber} uploadedImg = {uploadedImg}
                              arrayApsLocations={arrayApsLocations} />;
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