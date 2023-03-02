import React, { useState } from "react";
import ChallengeCard from "../components/ChallengeCard";
import Header from "../components/Header";

function MyChallenges() {

const[isMyChallenges, setIsMyChallenges] = useState(true)

const handleChallengeShow = ( value: boolean) =>{
  setIsMyChallenges(value);
}

    return (
      <div className="App">
          <Header />
              
              <div className="flex flex-col items-center">
              <div className="flex flex-row text-center gap-1 mt-10">
                <div onClick={() => {handleChallengeShow(true)}} className={isMyChallenges ? "bg-buttonLight text-lg border-y-4 border-l-4 border-buttonLight cursor-pointer text-white py-2 px-5 rounded-l-3xl w-[245px]" : "bg-buttonDark border-y-4 border-l-4 border-buttonDark cursor-pointer text-white py-2 px-5 rounded-l-3xl w-[245px]"}>Mine utfordringer</div>
                <div onClick={() => {handleChallengeShow(false)}} className={!isMyChallenges ? "bg-buttonLight text-lg text-bold border-y-4 border-r-4 border-buttonLight cursor-pointer text-white py-2 px-5 rounded-r-3xl w-[245px]" : "bg-buttonDark border-y-4 border-r-4 border-buttonDark cursor-pointer text-white py-2 px-5 rounded-r-3xl w-[245px]"}>Abbonerte utfordringer</div>
              </div>
              </div>

          <div className="flex flex-wrap justify-center overflow gap-4 mt-16">
                  <ChallengeCard/>
                  <ChallengeCard/>
                  <ChallengeCard/>
                  <ChallengeCard/>
                  <ChallengeCard/>
                  <ChallengeCard/>

          </div>
      </div>
    )
  }
  
  export default MyChallenges;