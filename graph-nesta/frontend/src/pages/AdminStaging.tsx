import React, { useContext, useEffect, useState } from "react";
//  import ChallengeCard from "../components/ChallengeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ChallengeContext } from "../globalState/ChallengeContext";
import { useNavigate } from "react-router-dom";
import {type IfetchType } from "../types/types";
import useFetch from "../hooks/useFetch";
import ChallengeCard from "../components/ChallengeCard";

function AdminStaging() {

  const [searchPhrase, ] = useState("");
  const [orderBy, ] = useState("Løst");
  const [categoryFilter, ] = useState("");
  const [limit, ] = useState(20);

   // initial IfetchType object
   const querySearch: IfetchType = {
    limit,
    categoryFilter,
    searchPhrase,
    orderBy,
  }

  const [query, ] = useState<IfetchType>(querySearch);
  const [page, ] = useState(0);
  const { isLoading, isError, ODAproblems } = useFetch(query, page);
  


  const { user } = useContext(ChallengeContext);
  const navigate = useNavigate();

  //  Cheks if email and password is in localStorage. Saves it in global state. Sends to login if not. 
  useEffect(() => {
    if (!(user.isAdmin.toString() === "true")) {
        navigate("/LoggInn");
      }   
  },[navigate, user.isAdmin]);

    return (
      <div className="text-center">
          <Header />
              
          <div className="flex flex-col items-center min-h-[82vh]">
          <h1 className='text-3xl text-text p-5'>Godkjenn problem for {user.affiliation}</h1>
  
          {isLoading ? <h1>Laster innhold...</h1> : isError? <h1>En feil har oppstått...</h1> :
            <div className="flex flex-wrap justify-center overflow gap-4 mt-5">
           
              {ODAproblems.map((data) => (
                <ChallengeCard key={data.id} id={data.id} title={data.title} vendor={data.vendor.substring(20)} status={data.status} specificProblem={data.specificProblem} clearDataProduct={data.clearDataProduct} accessibleData={data.accessibleData} definedAction={data.definedAction} subCount={data.subCount} owner={data.owner} subs={data.subs} edit={true}/>
              ))}

              </div>
        }
          </div>
          <Footer />
      </div>
    )
  }
  
  export default AdminStaging;
