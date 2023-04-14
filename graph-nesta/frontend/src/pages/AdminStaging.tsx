import React, { useContext, useEffect } from "react";
//  import ChallengeCard from "../components/ChallengeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ChallengeContext } from "../globalState/ChallengeContext";
import { useNavigate } from "react-router-dom";

function AdminStaging() {

  const {user } = useContext(ChallengeContext);
  const navigate = useNavigate();

  //  Cheks if email and password is in localStorage. Saves it in global state. Sends to login if not. 
  useEffect(() => {
    if (!user.isAdmin) {
        navigate("/LoggInn");
      }   
  },[navigate, user.isAdmin]);

    return (
      <div className="text-center">
          <Header />
              
          <div className="flex flex-col items-center min-h-[82vh]">
          <h1 className='text-3xl text-text p-5'>Godkjenn problem for {user.email}</h1>
  
            <div className="flex flex-wrap justify-center overflow gap-4 mt-16 mb-5">
    
            </div>
          </div>
          <Footer />
      </div>
    )
  }
  
  export default AdminStaging;
