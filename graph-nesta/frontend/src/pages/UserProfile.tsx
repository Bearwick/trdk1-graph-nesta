import React from 'react';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import userIcon from '../images/userProfileIcon.webp';
import editIcon from '../images/pen-to-square-regular.svg';

function UserProfile() {
    return (
        <div className="UserProfile ">
            <div className={'navPlaceholder h-20'}>
                Nav Nav Nav someday I will be a Nav
            </div>
           <div className={'UserProfilePage bg-background text-text flex flex-col place-items-center pb-20'}>
               <h1 className={'heading text-5xl mt-5'}>
                   Min Profil
               </h1>
               <div className={'profileImage h-80 w-80'}>
                   <img src={userIcon} alt={'image of userProfileIcon'}/>
               </div>
               <h2 className={'subheading text-xl underline flex flex-row space-x-4 mb-2'}>
                   <p> Kontaktinformasjon</p>
                   <Link to={''}>
                        <img className={'h-5 w-5'} src={editIcon} alt={'edit button icon'} />
                   </Link>
               </h2>
               <div className={'userInformation'}>
                   <p>Tilhører: test kommune </p>
                   <p>Epost: placeholder@placeholderkommune.no </p>
                   <p>+47 123 45 678</p>
               </div>
               <Link className={'mt-6 mb-6'} to={'/'}>
                <button className={'myProblemsButton bg-buttonDark text-white rounded-full h-9 w-40'}>
                       Mine utfordringer
                </button>
               </Link>
           </div>
            <Footer />
        </div>
    );
}

export default UserProfile;