import React, { useContext, useEffect } from 'react';
import Footer from "../components/Footer";
import Nav from "../components/Header";
import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../images/userProfileIcon.webp';
import editIcon from '../images/editProfileIcon.svg';
import { ChallengeContext } from '../globalState/ChallengeContext';
import { findUser, getUserInfo } from '../api/odaAPI';

function UserProfile() {
    const { user, setUser } = useContext(ChallengeContext);
    const navigate = useNavigate();
  
    //  Cheks if email and password is in localStorage. Saves it in global state. Sends to login if not. 
    useEffect(() => {
      if (!user.isLoggedIn) {
        const email = localStorage.getItem("Email") ?? "";
        const password = localStorage.getItem("Password") ?? "";

        findUser(email, password).then(r => {
          if (r.data) {
            getUserInfo(email).then(userInfo => {
              if (userInfo.data) {
                setUser({...userInfo.data, isLoggedIn: true});
              }
            }).catch(() => {
              console.log("no user!")
              navigate("/LoggInn");})
            
          } else {
            setUser({
              email: "",
              password: "",
              affiliation: "",
              telephone: "",
              isLoggedIn: false,
              isAdmin: false,
            });
            navigate("/LoggInn");
          }
        }).catch(() => {
          console.log("no user!")
          navigate("/LoggInn");})
      }      
    },[navigate, setUser, user.isLoggedIn]);


    const handleLogout = () => {
        localStorage.setItem("Email", "")
        localStorage.setItem("Password", "")

        setUser({
            email: "",
            password: "",
            affiliation: "",
            telephone: "",
            isLoggedIn: false,
            isAdmin: false,
          });

        navigate("/LoggInn");
    }

    return (
        <div className="UserProfile ">
           <Nav />
           <div className={'UserProfilePage bg-background text-text flex flex-col place-items-center pb-20'}>
               <h1 className={'heading text-5xl mt-5 pb-3'}>
                   Min Profil
               </h1>
               <div className={'profileImage h-80 w-80'}>
                   <img src={userIcon} alt={'image of userProfileIcon'}/>
               </div>
               <div className="text-left">
               <h2 className={'subheading text-xl underline flex flex-row space-x-4 mb-2 text-left'}>
                   <p> Kontaktinformasjon</p>
                   <Link to={'/RedigerMinProfil'}>
                        <img className={'h-5 w-5'} src={editIcon} alt={'edit button icon'} />
                   </Link>
               </h2>
               <div className={'userInformation text-base text-left'}>
                   <p>Tilhører: {user.affiliation} </p>
                   <p>Epost: {user.email}</p>
                   <p>+47 {user.telephone}</p>
               </div>
               </div>
               <Link className={'mt-6 mb-6'} to={'/MineUtfordringer'}>
                <button className={'myProblemsButton bg-buttonDark hover:bg-buttonHover text-white rounded-full h-9 w-40'}>
                       Mine utfordringer
                </button>
               </Link>
                <button onClick={handleLogout} className={'bg-buttonDark hover:bg-statusRed text-white rounded-full h-9 w-40'}>
                       Logg ut
                </button>
           </div>
            <Footer />
        </div>
    );
}

export default UserProfile;