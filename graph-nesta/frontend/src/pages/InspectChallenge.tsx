import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import Header from '../components/Header';
import ODACircle from '../components/ODACircle';
import { Status } from '../types/types';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SubInfoComponent from '../components/SubInfoComponent';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function InspectChallenge() {

    const [status,] = useState(Status.newChallenge);
    const [system] = useState("Bluegaarden");
    const [subCount] = useState(11);
    const [affiliation] = useState("Trondheim");
    const [statusColor, setStatusColor] = useState("rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed");
    const [email] = useState("ola.nordmann@trondheim.kommune.no");
    const [telephone] = useState("+47 123 45 678");
    const [isSubbed, setIsSubbed] = useState(false);


    useEffect(() => {
        switch (status) {
            case Status.newChallenge:
                setStatusColor("rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed");
                break;
    
            case Status.started:
                setStatusColor("rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusOrange");
                break;
    
            case Status.solved:
                setStatusColor("rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusGreen");
                break;
        }

    }, [status])

    const handleSubClick = () => {
        setIsSubbed(!isSubbed);
    }


    return (
      <div className="App">
        <Header />
        
        <div className="bg-background flex flex-col items-center">
            <div className="text-text px-5 py-3 w-full items-center justify-center flex flex-col mb-5">
       
                <h1 className="text-4xl mb-2.5">Lisensproblem</h1>
              

                
            <section className=" items-end flex flex-row justify-between text-xs mb-1.5 gap-2">
                <div className="flex flex-row">
                    <PersonalVideoIcon sx={{ fontSize: "1rem"}}/>
                    <p className="ml-1.5 whitespace-nowrap">{system}</p>
                </div>
  
                <div className="flex flex-row">
                    <PeopleIcon sx={{fontSize: "1rem"}}/>
                    <p className="ml-1.5 whitespace-nowrap">{subCount}</p>
                </div>

                <div className="flex flex-row">
                    <LocationCityIcon sx={{fontSize: "1rem"}}/>
                    <p className="ml-1.5 whitespace-nowrap">{affiliation}</p>
                </div>
            </section>

                <div className="flex flex-row items-center">
                        <ODACircle style={statusColor} text={""}/>
                        <p className="whitespace-nowrap">{status}</p>
                </div>
            </div>

          <div>
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

          <div className="flex flex-col w-[65vw] text-left mb-5 gap-1">
            <h2 className="text-text underline underline-offset2 text-2xl">Kontaktinformasjon</h2>
            <div className="flex flex-row items-center gap-1"><EmailIcon sx={{fontSize: "1rem"}}/>{email}</div>
            <div className="flex flex-row items-center gap-1"><PhoneIcon sx={{fontSize: "1rem"}}/>{telephone}</div>
          </div>

          <div className="flex flex-col w-[65vw] text-left mb-5 gap-1">

            <div className="mt-5 flex flex-row flex-wrap justify-between gap-2 mb-2">
                <h1 className="text-text underline underline-offset2 text-2xl">Disse har samme problem</h1>
                <Button variant="contained" onClick={handleSubClick} sx={{ color: "white", backgroundColor: "#0D264A", width: "200px", borderRadius: "45px", '&:hover': {backgroundColor: '#14325E',}}}> {isSubbed ? "Fjern fra lsiten": "Abboner"}</Button>
            </div>


            {isSubbed ? 
             <SubInfoComponent affiliation={"Trondheim"} email={"edvard.bjornevik@nesodden.kommune.no"} telephone={"+47 403 29 131"}/>
             : null}
           
            <SubInfoComponent affiliation={"Namsos"} email={"Olea.nordmane@namsos.kommune.no"} telephone={"+47 123 45 678"}/>
            <SubInfoComponent affiliation={"Trøndelag"} email={"olanormann@trøndelag.fylkeskommune.no"} telephone={"+47 123 45 678"}/>
            
          </div>

        </div>
          
          <Footer />
      </div>
    );
  }
  
  export default InspectChallenge;