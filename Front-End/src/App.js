import './App.css';
import Welcome from './components/welcome/welcome';
import AboutUs from './components/About us/About us';
import Instructions from './components/Instructions/Instructions';
import React,{useState} from "react";
import Steps from "./components/Steps/Steps";

function App() {

    const [currentPage, setCurrentPage] = useState('Welcome');
    // Function to switch between pages
    const goToPage = (page) => {
        setCurrentPage(page);
    };


    // Render the appropriate screen based on the currentPage state
    let screen;
    if (currentPage === 'Welcome') {
        screen = <Welcome goToPage={goToPage} />;
    }
    else if (currentPage === 'Instructions') {
        screen = <Instructions goToPage={goToPage} />;
    }
    else if (currentPage === 'AboutUs') {
        screen = <AboutUs goToPage={goToPage} />;
    } else if (currentPage === 'Step1') {
        screen = <Steps goToPage={goToPage} />;
    }

  return (
      <div className="App">
          {screen}
      </div>
  );
}

export default App;
