import React, { useState } from "react";
import ChallengeCard from "../components/ChallengeCard";
import Header from "../components/Header";

function MyChallenges() {

const[isMyChallenges, setIsMyChallenges] = useState(true)
const onChange = () =>{
  setIsMyChallenges(!isMyChallenges);
}

    return (
      <div className="App">
          <Header />
          <header className="flex flex-row">
              <div className="grid grid-cols-11 mx-auto text-center w-2/5 mt-10">
                {isMyChallenges ? 
                  <h1 className="text-2xl font-bold underline col-span-5">Mine utfordringer</h1> : <h1 onClick={onChange} className="col-span-5 text-xl text-slate-400 opacity-70 cursor-pointer">Mine utfordringer</h1>}
                <p className="mx-auto text-2xl">|</p>
                {!isMyChallenges ? 
                  <h1 className="text-2xl font-bold underline col-span-5">Du har samme problem</h1> : <h1 onClick={onChange} className="col-span-5 text-xl text-slate-400 opacity-70 cursor-pointer">Du har samme problem</h1>}
              </div>
          </header>
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