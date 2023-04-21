import React, { useEffect, useState, useContext } from "react";
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { type challengeCardProps } from "../types/types";
import { Status } from "../types/types";
import ODACircle from "./ODACircle";
import { ChallengeContext } from "../globalState/ChallengeContext";
import { Link } from "react-router-dom";
import validateChallenge from "../utils/validateChallenge";

function ChallengeCard(props: challengeCardProps){

    const [statusColor, setStatusColor] = useState("rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed");

    const { setChallenge } = useContext(ChallengeContext)

    const onChange = () => {

        setChallenge({
            id: props.id,
            title: props.title,
            vendor: props.vendor,
            status: props.status,
            specificProblem: props.specificProblem,
            clearDataProduct: props.clearDataProduct,
            accessibleData: props.accessibleData,
            definedAction: props.definedAction,
            subCount: props.subCount,
            owner: props.owner,
            subs: props.subs,
            edit: props.edit,
        });
    }

    useEffect(() => {
        switch (props.status) {
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

    }, [props.status])

    try {
        validateChallenge(props);
    } catch (error: any) {
        const errorMsg = "En feil oppstod: ".concat(error);
        return (
            <div>
                <p className='color-red items-center'>{errorMsg}</p>
            </div>
        )
    }

    return(

        <div className="flex flex-col justify-between h-64 w-80 bg-buttonDark px-5 py-5 text-white cursor-pointer hover:drop-shadow-3xl hover:bg-buttonHover">
            <Link to={props.edit? "/RedigerProblem":"/InspiserProblem"}  onClick={onChange}>

            <section className="flex justify-between  items-center">
                <p className="font-bold text-left">{props.title}</p>

                <div className="flex flex-row items-center">
                    <ODACircle style={statusColor} text={""}/>
                    <p className="whitespace-nowrap">{props.status}</p>
                </div>

            </section>

            <section className="text-left pt-2.5 h-40">
                <p className="text-sm line-clamp-6">{props.specificProblem}</p>
            </section>

            <section className=" items-end flex flex-row justify-between text-xs">
                <div className="flex flex-row">
                    <PersonalVideoIcon sx={{ fontSize: "1rem"}}/>
                    <p className="ml-1.5 whitespace-nowrap">{props.vendor}</p>
                </div>
                <p>&#x2022;</p>
                <div className="flex flex-row">
                    <PeopleIcon sx={{fontSize: "1rem"}}/>
                    <p className="ml-1.5 whitespace-nowrap">{props.subCount}</p>
                </div>
                <p>&#x2022;</p>
                <div className="flex flex-row">
                    <LocationCityIcon sx={{fontSize: "1rem"}}/>
                    <p className="ml-1.5 whitespace-nowrap">{props.owner.affiliation}</p>
                </div>
            </section>
            </Link>
        </div>
    )
}

export default ChallengeCard;
