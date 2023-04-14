import React, { useContext, useEffect, useState } from "react";
//  import ChallengeCard from "../components/ChallengeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ChallengeContext } from "../globalState/ChallengeContext";
import { useNavigate } from "react-router-dom";

function MyChallenges() {

  const[isMyChallenges, setIsMyChallenges] = useState(true);
  const {user, setUser } = useContext(ChallengeContext);
  const navigate = useNavigate();

  //  Cheks if email and password is in localStorage. Saves it in global state. Sends to login if not. 
  useEffect(() => {
    if (!user.isLoggedIn) {
      const email = localStorage.getItem("Email") ?? "";
      if (email) {
        const password = localStorage.getItem("Password") ?? "";
        setUser({
          email,
          password,
          isLoggedIn: true,
          isAdmin: false,
        });
      } else {
        navigate("/LoggInn");
      }
    }      
  },[navigate, setUser, user.isLoggedIn]);

  const handleChallengeShow = ( value: boolean) =>{
    setIsMyChallenges(value);

     }

    return (
      <div className="text-center">
          <Header />
              
          <div className="flex flex-col items-center min-h-[82vh]">
            <div className="flex flex-row text-center gap-1 mt-10">
              <div onClick={() => {handleChallengeShow(true)}} className={isMyChallenges ? "cursor-pointer text-white py-2 px-5 rounded-l-3xl bg-buttonHover border-y-4 border-l-4 border-buttonDark text-lg w-40 sm:w-60 sm:drop-shadow-3xl" : "cursor-pointer text-white py-2 px-5 rounded-l-3xl bg-buttonDark border-y-4 border-l-4 border-buttonDark w-40 sm:w-60 hover:bg-buttonHover"}>Mine utfordringer</div>
              <div onClick={() => {handleChallengeShow(false)}} className={!isMyChallenges ? "cursor-pointer text-white py-2 px-5 rounded-r-3xl bg-buttonHover text-bold border-y-4 border-r-4 border-buttonDark text-lg w-40 sm:w-60 sm:drop-shadow-3xl" : "cursor-pointer bg-buttonDark border-y-4 border-r-4 border-buttonDark text-white py-2 px-5 rounded-r-3xl w-40 sm:w-60 hover:bg-buttonHover"}>Abonnerte utfordringer</div>
             </div>
  
            <div className="flex flex-wrap justify-center overflow gap-4 mt-16 mb-5">
    
            </div>
          </div>
          <Footer />
      </div>
    )
  }
  
  export default MyChallenges;
