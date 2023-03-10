import React from 'react';
import { type User } from '../types/types';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function SubInfoComponent(props: User) {

    return (
        <div className="flex flex-col flex-wrap text-white justify-between bg-buttonDark py-2.5 px-2.5 text-xs sm:flex-row sm:text-base">
            <div className="flex flex-row items-center gap-1"><LocationCityIcon sx={{fontSize: "1rem"}}/>{props.affiliation}</div>
            <div className="flex flex-row items-center gap-1"><EmailIcon sx={{fontSize: "1rem"}}/>{props.email}</div>
            <div className="flex flex-row items-center gap-1"><PhoneIcon sx={{fontSize: "1rem"}}/>{props.telephone}</div>
            
        </div>
    );
}

export default SubInfoComponent;