import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import CategoryButton from "../components/CategoryButton";
import ChallengeCard from "../components/ChallengeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { type User } from "../types/types";
import { Status } from "../types/types";

function Search() {

  const [, setSearch] = useState("");
  const [, setFilter] = useState("Løst");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchHits, ] = useState(11);
 
  const placeHolder : User = {
    email: "edvard.bjornevik@nesodden.kommune.no",
    telephone: "69420",
    affiliation: "Trondheim",
  }

  const subPlaceholder: User[] = [placeHolder];




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


  //  Handle events for changes in inputs.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  //  Handle event changes for filter.
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }

  //  Handle event for category changes.
  const handleCategoryButtonClick = (value: string) => {
    if (categoryFilter === value) {
      setCategoryFilter("");
    } else {
    setCategoryFilter(value);
    }
  }

  const onClick = () => {
    alert("click");
  }



    return (
      <div className="App">
          <Header />
          <div className="bg-background flex flex-col items-center mb-5 min-h-screen">

          <div className="flex flex-col mt-5">
            <div className="flex flex-row gap-1">
              <TextField
              id="outlined-required"
              label="Søk"
              size="small"
              onChange={handleSearchChange}
              sx={ {...textFieldStyle, width: "80vw",
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

            <div className="flex flex-row flex-nowrap overflow-auto gap-2 my-5 h-12 w-[480px] sm:w-[500px] no-scrollbar">
              <CategoryButton text={"Lisens"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Økonomi"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Skole"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Data"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Faktura"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
              <CategoryButton text={"Forvaltning"} focused={categoryFilter} onClick={handleCategoryButtonClick}/>
            </div>
                <p className="">{ searchHits } treff</p>

          </div>
            <div className="flex flex-wrap justify-center overflow gap-4 mt-5">
              <ChallengeCard id={"12345"} onClick={onClick} title={"Lisens"} system={"Bluegaarden"} status={Status.newChallenge} specificProblem={"lisens om ringepigging hadde vært en god ting for mindreårige. Da de ikke kan bli straffet, men fortsatt utgjør denne ugjerningen. I flere tilfeller har vi sett større grupper med tenåringer gå sammen i systematisk ringepigging. Om kommunen kunne laget et digitalt system for lisens for ringepinng, hadde det vært lurt."} clearDataProduct={"www"} accessibleData={"www"} definedAction={"www"} subCount={11} owner={placeHolder} subs={subPlaceholder}/>
              <ChallengeCard id={"12345"} onClick={onClick} title={"Lisens"} system={"Bluegaarden"} status={Status.solved} specificProblem={"lisens om ringepigging"} clearDataProduct={"www"} accessibleData={"www"} definedAction={"www"} subCount={11} owner={placeHolder} subs={subPlaceholder}/>
              <ChallengeCard id={"12345"} onClick={onClick} title={"Lisens"} system={"Bluegaarden"} status={Status.started} specificProblem={"lisens om ringepigging"} clearDataProduct={"www"} accessibleData={"www"} definedAction={"www"} subCount={11} owner={placeHolder} subs={subPlaceholder}/>
              <ChallengeCard id={"12345"} onClick={onClick} title={"Lisens"} system={"Bluegaarden"} status={Status.newChallenge} specificProblem={"lisens om ringepigging"} clearDataProduct={"www"} accessibleData={"www"} definedAction={"www"} subCount={11} owner={placeHolder} subs={subPlaceholder}/>
       
            </div>
          </div>
          <Footer />
      </div>
    )
  }
  
  export default Search;

