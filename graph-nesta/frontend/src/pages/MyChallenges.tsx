import React, { useState } from "react";
//  import ChallengeCard from "../components/ChallengeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MyChallenges() {

const[isMyChallenges, setIsMyChallenges] = useState(true)

const handleChallengeShow = ( value: boolean) =>{
  setIsMyChallenges(value);
}

    return (
      <div className="text-center">
          <Header />
              
          <div className="flex flex-col items-center min-h-[82vh]">
            <div className="flex flex-row text-center gap-1 mt-10">
              <div onClick={() => {handleChallengeShow(true)}} className={isMyChallenges ? "cursor-pointer text-white py-2 px-5 rounded-l-3xl bg-buttonLight border-y-4 border-l-4 border-buttonDark text-lg w-40 sm:w-60 sm:drop-shadow-3xl" : "cursor-pointer text-white py-2 px-5 rounded-l-3xl bg-buttonDark border-y-4 border-l-4 border-buttonDark w-40 sm:w-60"}>Mine utfordringer</div>
              <div onClick={() => {handleChallengeShow(false)}} className={!isMyChallenges ? "cursor-pointer text-white py-2 px-5 rounded-r-3xl bg-buttonLight text-bold border-y-4 border-r-4 border-buttonDark text-lg w-40 sm:w-60 sm:drop-shadow-3xl" : "cursor-pointer bg-buttonDark border-y-4 border-r-4 border-buttonDark text-white py-2 px-5 rounded-r-3xl w-40 sm:w-60"}>Abonnerte utfordringer</div>
             </div>
  
            <div className="flex flex-wrap justify-center overflow gap-4 mt-16 mb-5">
    
            </div>
          </div>
          <Footer />
      </div>
    )
  }
  
  export default MyChallenges;
