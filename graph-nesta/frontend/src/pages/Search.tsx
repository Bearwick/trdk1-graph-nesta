import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import CategoryButton from "../components/CategoryButton";
import ChallengeCard from "../components/ChallengeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import type {IfetchType } from "../types/types";
import { ChallengeContext } from "../globalState/ChallengeContext";
import { useNavigate, Link } from "react-router-dom";
import { findUser, getUserInfo } from "../api/odaAPI";
import { Breadcrumbs, Typography } from "@mui/material";

function Search() {

  const {user, setUser } = useContext(ChallengeContext);
  const navigate = useNavigate();

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

  //  const [limit, setLimit] = useState(30); //  offset for fetching the next ODA-problems in the infinite scroll
  const [searchPhrase, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("Løst");
  const [categoryFilter, setCategoryFilter] = useState("");

  //  Infinite scroll
  const [limit, ] = useState(60);

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
    approved: true
  }

  const [query, setQuery] = useState<IfetchType>(querySearch);
  const [page, setPage] = useState(0);
  const { isLoading, isError, ODAproblems, ODAproblemsLength } = useFetch(query, page);
  //  const loader = useRef(null);

  //  Fetches ODAproblems
  const fetchODAproblems = (limit: number, categoryFilter: string, searchPhrase: string, orderBy: string) => {
    const newQuery:IfetchType = {
      limit,
      categoryFilter,
      searchPhrase,
      orderBy,
      approved: true
    }
    setQuery(newQuery);
}


  //  Handle events for changes in search inputs.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
    fetchODAproblems(limit, searchPhrase, categoryFilter, orderBy);
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
          <div className="bg-background flex flex-col mb-5 min-h-screen">

        <div className="text-left ml-10 sm:ml-[5.25rem] mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link className={"hover:underline"} to="/Hjem">
              Hjem
            </Link>

            <Typography color="text.primary">Søk</Typography>
          </Breadcrumbs>
        </div>

        <div className="items-center ">

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
                <p className="">{ ODAproblemsLength } treff</p>

          </div>

              {isLoading ? <h1>Laster innhold...</h1> : isError? <h1>En feil har oppstått...</h1> :
            <div className="flex flex-wrap justify-center overflow gap-4 mt-5">

              {ODAproblems.map((data) => (
                <ChallengeCard key={data.id} id={data.id} title={data.title} vendor={data.vendor.substring(20)} status={data.status} specificProblem={data.specificProblem} clearDataProduct={data.clearDataProduct} accessibleData={data.accessibleData} definedAction={data.definedAction} subCount={data.subCount} owner={data.owner} subs={data.subs} edit={false} approved={data.approved}/>
              ))}

              </div>
        }
          </div>
          </div>
          <Footer />
      </div>
    )
  }

  export default Search;
