import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import CategoryButton from "../components/CategoryButton";
import ChallengeCard from "../components/ChallengeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Search() {

  const [, setSearch] = useState("");
  const [, setFilter] = useState("Løst");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchHits, ] = useState(11);


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
              <ChallengeCard />
              <ChallengeCard />
              <ChallengeCard />
              <ChallengeCard />
            </div>
          </div>
          <Footer />
      </div>
    )
  }
  
  export default Search;