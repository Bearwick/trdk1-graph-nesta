import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import React from 'react';
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Header from './components/Header';
import ODACircle from './components/ODACircle';

function App() {

    return (
      <div className="App">
        <Header />
        
        <div className="bg-background flex flex-col items-center">
          
          <div className="text-white bg-footer px-5 py-3 w-full items-center justify-center flex flex-col">
            <div>
            <h1 className="text-4xl mb-5">Velkommen!</h1>
            <p className="max-w-2xl text-xl sm:text-2xl mb-1">Har du en utfordring i din arbeidsoppgave?</p>
            <p className="max-w-2xl text-sm sm:text-base mb-5">Alle norske kommuner har samme lovpålagte ansvarsområder. Det betyr at en annen kommune kanskje har eller har hatt samme utfordring! Søk etter din utfordring, kanskje er den allerede løst eller noen arbeider med en løsning. Hvis ikke, opprett en ny utfordring! </p>
            </div>
            
            <div className="flex gap-4">
            <Link to="/Søk"><Button variant="contained" sx={{ color: "white", backgroundColor: "#0D264A", width: "150px", borderRadius: "45px", marginTop: "1rem", marginBottom: "1rem", border: "1px solid white", '&:hover': {backgroundColor: '#14325E',}}}>
                Søk</Button></Link>
          <Link to="/NyUtfordring"><Button variant="contained" sx={{ color: "white", backgroundColor: "#0D264A", width: "200px", borderRadius: "45px", marginTop: "1rem", marginBottom: "1rem", border: "1px solid white", '&:hover': {backgroundColor: '#14325E',}}}>
          Ny utfordring</Button></Link>

            </div>
          
          </div>

          <div>
           
            
          <div className="flex flex-row h-12 w-[65vw] mb-8 items-center mt-5">
            <div className="h-[4vw] max-h-12 w-[18vw] max-w-[12rem] mr-8">
            </div>
            
            <div className="flex flex-col mt-5">
              <h1 className="text-4xl text-text underline underline-offset2 whitespace-nowrap mb-1">Om ODA-metoden</h1>
              <a href="/" download><p className="text-xs text-linkBlue underline underline-offset2 mb-5 whitespace-nowrap text-left">Last ned oversettelse av NESTA-guiden <DownloadIcon sx={{ fontSize: "medium"}} /></p> </a>
            </div>
          </div>



          <div className="flex flex-row h-12 w-[65vw] mb-4 items-center ">
          <div className="h-[4vw] max-h-12 w-[18vw] max-w-[12rem] mr-8">
          </div>

          <div className="flex flex-row">
          <ODACircle style={"rounded-full flex items-center justify-center h-[4vw] max-h-12 w-[4vw] max-w-[3rem] mr-2 bg-ODA1"} text={""}/>
          <ODACircle style={"rounded-full flex items-center justify-center h-[4vw] max-h-12 w-[4vw] max-w-[3rem] mr-2 bg-ODA2"} text={""}/>
          <ODACircle style={"rounded-full flex items-center justify-center h-[4vw] max-h-12 w-[4vw] max-w-[3rem] mr-2 bg-ODA3"} text={""}/>
          <ODACircle style={"rounded-full flex items-center justify-center h-[4vw] max-h-12 w-[4vw] max-w-[3rem] mr-2 bg-ODA4"} text={""}/>
          </div>
          </div>

          <div className="flex flex-row h-50 w-[65vw] mb-8 items-center ">
            <ODACircle style={"rounded-full flex items-center justify-center h-[18vw] max-h-48 w-[18vw] max-w-[12rem] mr-8 bg-ODA1 text-xs sm:text-base"} text={"Spesifikt problem"}/>
            <p className="w-[45vw] h-100% text-text text-xs sm:text-base text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
            </p>
          </div>

          <div className="flex flex-row h-50 w-[65vw] mb-8 items-center ">
            <ODACircle style={"rounded-full flex items-center justify-center h-[18vw] max-h-48 w-[18vw] max-w-[12rem] mr-8 bg-ODA2 text-xs sm:text-base"} text={"Dataprodukt"}/>
            <p className="w-[45vw] h-100% text-text text-xs sm:text-base text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
            </p>
          </div>

          <div className="flex flex-row h-50 w-[65vw] mb-8 items-center ">
            <ODACircle style={"rounded-full flex items-center justify-center h-[18vw] max-h-48 w-[18vw] max-w-[12rem] mr-8 bg-ODA3 text-xs sm:text-base"} text={"Data"}/>
            <p className="w-[45vw] h-100% text-text text-xs sm:text-base text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
            </p>
          </div>

          <div className="flex flex-row h-50 w-[65vw] mb-8 items-center ">
            <ODACircle style={"rounded-full flex items-center justify-center h-[18vw] max-h-48 w-[18vw] max-w-[12rem] mr-8 bg-ODA4 text-xs sm:text-base"} text={"Definert handling"}/>
            <p className="w-[45vw] h-100% text-text text-xs sm:text-base text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
            </p>
          </div>

          </div>

        </div>
          
          <Footer />
      </div>
    );
  }
  
  export default App;