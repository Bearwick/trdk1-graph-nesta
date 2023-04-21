import React, { useContext, useEffect } from 'react';
import Footer from "../components/Footer";
import Nav from "../components/Header";
import { useNavigate, Link } from 'react-router-dom';
import userIcon from '../images/userProfileIcon.webp';
import adminIcon from '../images/adminProfileIcon.webp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
//  import editIcon from '../images/editProfileIcon.svg';
import { ChallengeContext } from '../globalState/ChallengeContext';
import { findUser, getUserInfo } from '../api/odaAPI';
import { Breadcrumbs, Typography } from '@mui/material';

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

    //  <Link to={'/RedigerMinProfil'}>
    //    <img className={'h-5 w-5'} src={editIcon} alt={'edit button icon'} />
    //  </Link>

    return (
        <div className="UserProfile ">
           <Nav />
           <div className={'UserProfilePage bg-background text-text flex flex-col pb-20'}>

              <div className="text-left ml-10 sm:ml-[5.25rem] mt-4">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link className={"hover:underline"} to="/Hjem">
                    Hjem
                  </Link>
                
                  <Typography color="text.primary">Min profil</Typography>
                </Breadcrumbs>
              </div>

              <div className="items-center flex flex-col">
               <h1 className={'heading text-5xl mt-5 pb-3'}>
                   Min Profil
               </h1>
               <div className={'profileImage h-80 w-80'}>
                  {user.isAdmin.toString() === "true" ? <img src={adminIcon} alt={'image of adminProfileIcon'}/> : <img src={userIcon} alt={'image of userProfileIcon'}/>}
               </div>
              
               <div className="flex flex-col text-left my-5 gap-1">
                  <h2 className="text-text underline underline-offset2 text-2xl">Kontaktinformasjon</h2>

                  <div className="flex flex-row items-center gap-1 text-xs sm:text-base"><LocationCityIcon sx={{fontSize: "1rem"}}/>{ user.affiliation }</div>
                  <div className="flex flex-row items-center gap-1 text-xs sm:text-base"><EmailIcon sx={{fontSize: "1rem"}}/>{ user.email }</div>
                  <div className="flex flex-row items-center gap-1 text-xs sm:text-base"><PhoneIcon sx={{fontSize: "1rem"}}/>+47 { user.telephone }</div>
              </div>




               <Link className={"my-4"}  to={'/MineProblem'}>
                <button className={'myProblemsButton bg-buttonDark hover:bg-buttonHover text-white rounded-full h-9 w-40'}>
                       Mine problem
                </button>
               </Link>
                <button onClick={handleLogout} className={'bg-buttonDark hover:bg-statusRed text-white rounded-full h-9 w-40'}>
                       Logg ut
                </button>
           </div>
           </div>
            <Footer />
        </div>
    );
}

export default UserProfile;