import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react';
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
import { ChallengeContext } from '../globalState/ChallengeContext';
import { type User } from "../types/types";

function InspectChallenge() {

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(Status.newChallenge);
    const [system, setSystem] = useState("");
    const [subCount, setSubCount] = useState(0);
    const [affiliation, setAffiliation] = useState("");
    const [specificProblem, setSpecificProblem] = useState("");
    const [clearDataProduct, setClearDataProduct] = useState("");
    const [accessibleData, setAccessibility] = useState("");
    const [definedAction, setDefinedAction] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [subs, setSubs] = useState<User[]>([]);
    const [isSubs, setIsSubs] = useState(false);

    const [isSubbed, setIsSubbed] = useState(false);
    const [statusColor, setStatusColor] = useState("rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed");
    const {challenge, } = useContext(ChallengeContext);

    //  Sets the const´s above by using global state.
    useEffect(() => {

        setTitle(challenge.title);
        setStatus(challenge.status);
        setSystem(challenge.vendor);
        setSubCount(challenge.subCount);
        setAffiliation(challenge.owner.affiliation);
        setSpecificProblem(challenge.specificProblem);
        setEmail(challenge.owner.email);
        setTelephone(challenge.owner.telephone);
        setClearDataProduct(challenge.clearDataProduct);
        setAccessibility(challenge.accessibleData);
        setDefinedAction(challenge.definedAction);
        setSubs([]);

        //  Adds all subs of a challenge to the subs Array.
        challenge.subs.forEach(sub => {
            setSubs(subs => [...subs, sub]);
        });
        if (subs.length > 0 && subs[0].email !== "-") {
            setIsSubs(true);
        }

        //  Changes the color theme of the status circle.
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
    }, [challenge, status, subs])

    // TODO: update database.
    const handleSubClick = () => {
        setIsSubbed(!isSubbed);
    }


    return (
      <div className="App">
        <Header />

        <div className="bg-background flex flex-col items-center">
            <div className="text-text px-5 py-3 w-full items-center justify-center flex flex-col mb-5">

                <h1 className="text-4xl mb-2.5">{ title }</h1>



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
            <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center">
                <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA1"} text={"Spesifikt problem"}/>
                <p className="w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8">{ specificProblem }</p>
            </div>

            <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center ">
                <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA2"} text={"Dataprodukt"}/>
                <p className="w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8">{ clearDataProduct }</p>
            </div>

            <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center ">
                <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA3"} text={"Data"}/>
                <p className="w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8">{ accessibleData }</p>
            </div>

            <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center ">
                <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA4"} text={"Definert handling"}/>
                <p className="w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8">{ definedAction }</p>
            </div>
          </div>

          <div className="flex flex-col w-[65vw] text-left mb-5 gap-1">
            <h2 className="text-text underline underline-offset2 text-2xl">Kontaktinformasjon</h2>


            <div className="flex flex-row items-center gap-1 text-xs sm:text-base"><EmailIcon sx={{fontSize: "1rem"}}/>{ email }</div>
            <div className="flex flex-row items-center gap-1 text-xs sm:text-base"><PhoneIcon sx={{fontSize: "1rem"}}/>{ telephone }</div>
            <div className="flex flex-row items-center gap-1 text-xs sm:text-base"><LocationCityIcon sx={{fontSize: "1rem"}}/>{ affiliation }</div>
          </div>

          <div className="flex flex-col w-[65vw] text-left mb-5 gap-1">

            <div className="mt-5 flex flex-row flex-wrap justify-between gap-2 mb-2">
                <h1 className="text-text underline underline-offset2 text-2xl flex flex-row items-center whitespace-nowrap">  <PeopleIcon sx={{fontSize: "2rem", marginRight: "0.5rem"}}/>{ subCount } har samme problem</h1>
                <Button variant="contained" onClick={handleSubClick} sx={{ color: "white", backgroundColor: "#0D264A", width: "200px", borderRadius: "45px", '&:hover': {backgroundColor: '#3d3f6b',}}}> {isSubbed ? "Fjern fra listen": "Abonner"}</Button>
            </div>

            {isSubs ?

            subs.map((userprops: User) =>
             <div key={userprops.email}>
                <SubInfoComponent { ...userprops } />
            </div>
             )
            : null
            }

          </div>

        </div>

          <Footer />
      </div>
    );
  }

  export default InspectChallenge;
