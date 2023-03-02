import React from "react";
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';

function ChallengeCard(){

    return(

        <div className="grid grid-rows-7 h-64 w-80 bg-buttonDark px-5 py-5 text-white cursor-pointer">

            <section className="row-span-2 grid grid-cols-3">        {/* Header */}
                <p className="col-span-2 font-bold text-left">Overskrift</p>
                <p className="text-base mt-2">Status</p>
            </section>

            <section className="row-span-4 text-left">               {/* Main */}
                <span className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
            </section>

            <section className="flex flex-row justify-between text-xs">{/* Footer */}
                <div className="flex flex-row">
                    <PersonalVideoIcon sx={{ fontSize: "1rem"}}/>
                    <p className="ml-1.5">System</p>
                </div>
                <p>&#x2022;</p>
                <div className="flex flex-row">
                    <PeopleIcon sx={{fontSize: "1rem"}}/>
                    <p className="ml-1.5">0</p>
                </div>
                <p>&#x2022;</p>
                <div className="flex flex-row">
                    <EmailIcon sx={{fontSize: "1rem"}}/>
                    <p className="ml-1.5">place@holder.com</p>
                </div>
            </section>




        </div>




    )



}

export default ChallengeCard;