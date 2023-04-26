import React, { useContext, useEffect, useState } from 'react'
//  import ChallengeCard from "../components/ChallengeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ChallengeContext } from "../globalState/ChallengeContext";
import { useNavigate, Link } from "react-router-dom";
import { findUser, getUserInfo } from "../api/odaAPI";
import useFetch from '../hooks/useFetch';
import { type IfetchType } from '../types/types';
import ChallengeCard from '../components/ChallengeCard';
import { Breadcrumbs, Typography } from '@mui/material';

function MyChallenges () {

  const [isMyChallenges, setIsMyChallenges] = useState(true)
  const {
    user,
    setUser,
  } = useContext(ChallengeContext)
  const navigate = useNavigate()

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


  const [ searchPhrase ] = useState("");
  const [ orderBy ] = useState("Løst");
  const [ categoryFilter ] = useState("");
  const [ limit ] = useState(20);
  // initial IfetchType object
  const querySearch: IfetchType = {
    limit,
    categoryFilter,
    searchPhrase,
    orderBy,
    email: user.email,
    relation: 1,
  }


  const [query, setQuery] = useState<IfetchType>(querySearch);
  const [ page ] = useState(0);
  const { isLoading, isError, ODAproblems } = useFetch(query, page);
  //  const loader = useRef(null);

  //  Fetches ODAproblems
  const fetchODAproblems = (limit: number, categoryFilter: string, searchPhrase: string, orderBy: string, relation: number) => {
    const newQuery:IfetchType = {
      limit,
      categoryFilter,
      searchPhrase,
      orderBy,
      email: user.email,
      relation,
    }
    setQuery(newQuery);
}


  const handleChallengeShow = (value: boolean) => {
    setIsMyChallenges(value)
    fetchODAproblems(limit, searchPhrase, categoryFilter, orderBy, value ? 1 : 0);
  }

  return (
    <div className='text-center'>
      <Header />
      <div className="text-left ml-10 sm:ml-[5.25rem] mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link className={"hover:underline"}  to="/Hjem">
              Hjem
            </Link>
           
            <Typography color="text.primary">Mine utfordringer</Typography>
          </Breadcrumbs>
        </div>
      <div className='flex flex-col items-center min-h-[82vh]'>
        <div className='flex flex-row text-center gap-1 mt-10'>
          <div onClick={() => {
            handleChallengeShow(true)
          }}
               className={isMyChallenges ? 'cursor-pointer text-white py-2 px-5 rounded-l-3xl bg-buttonHover border-y-4 border-l-4 border-buttonDark text-lg w-40 sm:w-60 sm:drop-shadow-3xl' : 'cursor-pointer text-white py-2 px-5 rounded-l-3xl bg-buttonDark border-y-4 border-l-4 border-buttonDark w-40 sm:w-60 hover:bg-buttonHover'}>Mine
            problem
          </div>
          <div data-cy ="abonnerteProblemer" onClick={() => {
            handleChallengeShow(false)
          }}
               className={!isMyChallenges ? 'cursor-pointer text-white py-2 px-5 rounded-r-3xl bg-buttonHover text-bold border-y-4 border-r-4 border-buttonDark text-lg w-40 sm:w-60 sm:drop-shadow-3xl' : 'cursor-pointer bg-buttonDark border-y-4 border-r-4 border-buttonDark text-white py-2 px-5 rounded-r-3xl w-40 sm:w-60 hover:bg-buttonHover'}>Abonnerte
            problem
          </div>
        </div>

        {isLoading ? <h1>Laster innhold...</h1> : isError? <h1>En feil har oppstått...</h1> : ODAproblems.length < 1 ? isMyChallenges? <p>Du har ingen problem...</p> : <p>Du har ingen abonnerte problem...</p>
        :
            <div className="flex flex-wrap justify-center overflow gap-4 mt-5">
           
              { ODAproblems.map((data) => (
                <ChallengeCard key={data.id} id={data.id} title={data.title} vendor={data.vendor.substring(20)} status={data.status} specificProblem={data.specificProblem} clearDataProduct={data.clearDataProduct} accessibleData={data.accessibleData} definedAction={data.definedAction} subCount={data.subCount} owner={data.owner} subs={data.subs} edit={false} approved={data.approved}/>
              ))}
              </div>
        }
      </div>
      <Footer />
    </div>
  )
}

export default MyChallenges
