import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import CategoryButton from "../components/CategoryButton";
import ChallengeCard from "../components/ChallengeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import type {IfetchType, challengeCardProps, User } from "../types/types";
import { Status } from "../types/types";
import { ChallengeContext } from "../globalState/ChallengeContext";
import { useNavigate } from "react-router-dom";

function Search() {

  const {user, setUser } = useContext(ChallengeContext);
  const navigate = useNavigate();

  //  Cheks if email and password is in localStorage. Saves it in global state. Sends to login if not. 
  useEffect(() => {
    if (!user.isLoggedIn) {
      if (!localStorage.getItem("Email") === null) {
        const email = localStorage.getItem("Email") ?? "";
        const password = localStorage.getItem("Password") ?? "";
        setUser({
          email,
          password,
          isLoggedIn: true
        });
      } else {
        navigate("/LoggInn");
      }
    }      
  },[navigate, setUser, user.isLoggedIn]);

  //  const [limit, setLimit] = useState(30); //  offset for fetching the next ODA-problems in the infinite scroll
  const [searchPhrase, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("Løst");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchHits, ] = useState(11);

  //  Infinite scroll
  const [limit, ] = useState(20);
 
  const placeHolder : User = {
    email: "edvard.bjornevik@nesodden.kommune.no",
    telephone: "123 45 678",
    affiliation: "Trondheim",
  }

  const subUserPlaceHolder : User = {
    email: "subPlaceholder@mail.com",
    telephone: "123 45 678",
    affiliation: "Malvik",
  }

  //  dummy data
  const subPlaceholder: User[] = [subUserPlaceHolder];

  const subPlaceholder2: User[] = [subUserPlaceHolder, subUserPlaceHolder];

  const subPlaceholder3: User[] = [subUserPlaceHolder, subUserPlaceHolder, placeHolder];

  const subPlaceholder4: User[] = [subUserPlaceHolder, subUserPlaceHolder, placeHolder, placeHolder];

  const odaPlaceholder : challengeCardProps = {
    id: "12345",
    title: "Lisens",
    system: "Bluegaarden",
    status: Status.newChallenge,
    specificProblem: "Lisens om ringepigging hadde vært en god ting for mindreårige. Da de ikke kan bli straffet, men fortsatt utgjør denne ugjerningen. I flere tilfeller har vi sett større grupper med tenåringer gå sammen i systematisk ringepigging. Om kommunen kunne laget et digitalt system for lisens for ringepinng, hadde det vært lurt.",
    clearDataProduct: "Områdekart som viser sannsynligheten for ringepigging for en gitt dato",
    accessibleData: "Nasjonale ringepigging-datasett",
    definedAction: "Lage en nettside med områdekart. Dette kan vi gi ut til innbyggerne som kan forhindre ringepigging før det skjer.",
    subCount: subPlaceholder.length,
    owner: placeHolder,
    subs: subPlaceholder,
  }




  //  List of filters available. Future work: list on db, and fetch the list. Such that admin´s can add systems.
  const filters = [
    {
      value: 'Løst',
      label: 'Løst',
    },
    {
      value: 'Påbegynnt',
      label: 'påbegynnt',
    },
    {
      value: 'Uløst',
      label: 'Uløst',
    },
    {
      value: 'Nyest',
      label: 'Nyest',
    },
    {
      value: 'Eldst',
      label: 'Eldst',
    },
  ];

    //  Styling for mui components (sx).
  const textFieldStyle = {
    backgroundColor: "white",
      '& label.Mui-focused': {
        color: '#0D264A',
      }, 
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: '#0D264A',
        },  '&.Mui-focused fieldset': {
          borderColor: '#0D264A',
        },
      },
    };

  // initial IfetchType object
  const querySearch: IfetchType = {
    limit,
    categoryFilter,
    searchPhrase,
    orderBy,
  }

  const [query, setQuery] = useState<IfetchType>(querySearch);
  const [page, setPage] = useState(0);
  const { isLoading, isError, ODAproblems } = useFetch(query, page);
  //  const loader = useRef(null);

  //  Fetches ODAproblems
  const fetchODAproblems = (limit: number, categoryFilter: string, searchPhrase: string, orderBy: string) => {
    const newQuery:IfetchType = {
      limit,
      categoryFilter,
      searchPhrase,
      orderBy,
    }
    setQuery(newQuery);
}


  //  Handle events for changes in search inputs.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
    fetchODAproblems(limit, searchPhrase, categoryFilter, orderBy);
    alert(ODAproblems);
  }

  //  Handle event changes for filter.
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setOrderBy(event.target.value);
  }

  //  Handle event for category changes.
  const handleCategoryButtonClick = (value: string) => {
    setPage(0);
    if (categoryFilter === value) {
      setCategoryFilter("");
    } else {
    setCategoryFilter(value);
    }
  }


    return (
      <div className="App">
          <Header />
          <div className="bg-background flex flex-col items-center mb-5 min-h-screen">

          <div className="flex flex-col mt-5 items-center">
            <div className="flex flex-row gap-1">
              <TextField
              id="outlined-required"
              label="Søk"
              size="small"
              onChange={handleSearchChange}
              sx={ {...textFieldStyle, width: "60vw",
              maxWidth: "375px"}}
              />

            <TextField
              select
              label="Filter"
              size="small"
              defaultValue={"Løst"}
              onChange={handleFilterChange}
              sx={{...textFieldStyle, width: "20vw",
              maxWidth: "125px"}}
            >
              {filters.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </div>

            <div className="flex flex-row flex-nowrap overflow-auto gap-2 my-5 h-12 w-[80vw] sm:w-[500px] no-scrollbar">
              <CategoryButton text={"Lisens"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Økonomi"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Skole"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Data"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Faktura"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Forvaltning"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
            </div>
                <p className="">{ searchHits } treff</p>

          </div>
          

              {isLoading ? <h1>Laster innhold...</h1> : isError? <h1>En feil har oppstått...</h1> : 
            <div className="flex flex-wrap justify-center overflow gap-4 mt-5">
               <ChallengeCard { ...odaPlaceholder } />
               <ChallengeCard id={"12345"} title={"Økonomi"} system={"Bluegaarden"} status={Status.solved} specificProblem={"lisens om ringepigging"} clearDataProduct={"www"} accessibleData={"www"} definedAction={"www"} subCount={11} owner={placeHolder} subs={subPlaceholder2}/>
               <ChallengeCard id={"12345"} title={"Skole"} system={"Bluegaarden"} status={Status.started} specificProblem={"lisens om ringepigging"} clearDataProduct={"www"} accessibleData={"www"} definedAction={"www"} subCount={11} owner={placeHolder} subs={subPlaceholder3}/>
               <ChallengeCard id={"12345"} title={"Turn down for what!"} system={"Bluegaarden"} status={Status.newChallenge} specificProblem={"lisens om ringepigging"} clearDataProduct={"www"} accessibleData={"www"} definedAction={"www"} subCount={11} owner={placeHolder} subs={subPlaceholder4}/>
               </div>
        }

             
           
          </div>
          <Footer />
      </div>
    )
  }
  
  export default Search;