import '../App.css'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import ODACircle from '../components/ODACircle';
//  import ChallengeCard from '../components/ChallengeCard';

function NewChallenge() {

  //  Input constants.
  const [title, setTitle] = useState("");
  const [system, setSystem] = useState("");
  const [otherSystem, setOtherSystem] = useState("");
  const [otherSystemShow, setOtherSystemShow] = useState(false);
  const [status, setStatus] = useState("newChallenge");
  const [specificProblem, setSpecificProblem] = useState("");
  const [clearDataProduct, setClearDataProduct] = useState("");
  const [accessibleData, setAccessibleData] = useState("");
  const [definedAction, setDefinedAction] = useState("");

  //  State of visualizing in UI that an input field is required.
  const [titleRequired, setTitleRequired] = useState(false);
  const [systemRequired, setSystemRequired] = useState(false);
  const [specificProblemRequired, setSpecificProblemRequired] = useState(false);
  const [clearDataProductRequired, setClearDataProductRequired] = useState(false);
  const [accessibleDataRequired, setAccessibleDataRequired] = useState(false);
  const [definedActionRequired, setDefinedActionRequired] = useState(false);
  const lengthRequirement = 5;
  const [requiredTextShow, setRequiredTextShow] = useState(false);

  //  State for showing similar challenges.
  const [showSimilarChallenges, setShowSimilarChallenges] = useState(false);

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
    }
  };

  const textFieldRequiredBordersStyle = {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      border: "2px solid #FF002F"
  },
  };

  //  List of systems available. Future work: list on db, and fetch the list. Such that admin´s can add systems.
  const systems = [
    {
      value: 'Visma',
      label: 'Visma',
    },
    {
      value: 'Bluegarden',
      label: 'Bluegarden',
    },
    {
      value: 'Teams',
      label: 'Teams',
    },
    {
      value: 'Annet system',
      label: 'Annet system',
    },
  ];

  //  Handle events for changes in inputs.
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleRequired(false);
    setRequiredTextShow(false);
  }

  const handelSystemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "Annet system") {
      setOtherSystemShow(true);
      setShowSimilarChallenges(true); //  Used for testing component. Should be removed!
    } else if (event.target.value !== "Annet system" && system === "Annet system") {
      setOtherSystemShow(false);
      setOtherSystem("");
      setShowSimilarChallenges(false); //  Used for testing component. Should be removed!
    }
    setSystem(event.target.value);
    setSystemRequired(false);
    setRequiredTextShow(false);
  }

  const handleOtherSystemCHange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherSystem(event.target.value);
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  }

  const handleSpecificProblemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecificProblem(event.target.value);
    setSpecificProblemRequired(false);
    setRequiredTextShow(false);
  }

  const handleClearDataProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClearDataProduct(event.target.value);
    setClearDataProductRequired(false);
    setRequiredTextShow(false);
  }

  const handleAccessibleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessibleData(event.target.value);
    setAccessibleDataRequired(false);
    setRequiredTextShow(false);
  }

  const handleDefinedActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefinedAction(event.target.value);
    setDefinedActionRequired(false);
    setRequiredTextShow(false);
  }

  //  Checks if the input fields have input.
  const checkRequiredFields = () => {
    if (title.length < lengthRequirement) {
      setTitleRequired(true);
      setRequiredTextShow(true);
    }
    if (system.length < lengthRequirement) {
      setSystemRequired(true);
      setRequiredTextShow(true);
    }
    if (specificProblem.length < lengthRequirement) {
      setSpecificProblemRequired(true);
      setRequiredTextShow(true);
    }
    if (clearDataProduct.length < lengthRequirement) {
      setClearDataProductRequired(true);
      setRequiredTextShow(true);
    }
    if (accessibleData.length < lengthRequirement) {
      setAccessibleDataRequired(true);
      setRequiredTextShow(true);
    }
    if (definedAction.length < lengthRequirement) {
      setDefinedActionRequired(true);
      setRequiredTextShow(true);
    }
  }

  //  Pust func. Future work: post the challenge to db. Should also create an interface for challenges. 
  const postChallenge = () => {
    if (!requiredTextShow) {
      
      alert("Title: " + title + "\nSystem: " + system + "\notherSystem" + otherSystem + "\nStatus: " + status +
       "\nSpecProblem: " + specificProblem + "\nclearDataProduct: " + clearDataProduct +
        "\naccessibleData: " + accessibleData + "\ndefinedAction: " + definedAction);
      }
  }
  
  //  Event handler for send button.
  const handleSend = () => {
    checkRequiredFields();
    postChallenge();
  }

  return (
    <div className="App">
        <Header />
        
        <div className="bg-background  flex flex-col items-center">
            <h1 className="text-3xl text-text p-5">Ny utfordring!</h1>

            <TextField
          required
          id="outlined-required"
          label="Tittel"
          size="small"
          onChange={handleTitleChange}
          sx={ titleRequired ? { ...textFieldStyle, ...textFieldRequiredBordersStyle,     width: "60vw",
          maxWidth: "375px", } : { ...textFieldStyle,     width: "60vw",
          maxWidth: "375px", }}
        />

        <TextField
    
          select
          required
          label="System"
          size="small"
          onChange={handelSystemChange}
          sx={ systemRequired ? { ...textFieldStyle, ...textFieldRequiredBordersStyle, width: "60vw",
          maxWidth: "375px", marginTop: "10px"} : { ...textFieldStyle, width: "60vw",
          maxWidth: "375px", marginTop: "10px"}}
        >
          {systems.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {otherSystemShow ? <TextField
          required
          id="outlined-required"
          label="Annet system"
          size="small"
          onChange={handleOtherSystemCHange}
          sx={{ backgroundColor: "white", width: "60vw", maxWidth: "375px", marginTop: "10px"}}
        /> : <div></div>}

        <FormLabel id="demo-radio-buttons-group-label" className="mt-5">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        className="mb-5"
        defaultValue="newChallenge"
        name="radio-buttons-group"
        onChange={handleStatusChange}
      >
        <FormControlLabel value="newChallenge" control={<Radio sx={{ '&.Mui-checked': {color: "#FF002F"}}}/>} label="Ny utfordring" />
        <FormControlLabel value="inProcess" control={<Radio sx={{ '&.Mui-checked': {color: "#F0AE2F"}}}/>} label="Påbegynnt" />
        <FormControlLabel value="Solved" control={<Radio sx={{ '&.Mui-checked': {color: "#2BB728"}}}/>} label="Løst" />
      </RadioGroup>
        
      <div className="flex flex-col">
      <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center gap-8">
        <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA1"} text={"Spesifikt problem"}/>
        <TextField
          required
          id="outlined-multiline-static"
          multiline
          rows={8}
          maxRows={8}
          label="Spesifikt problem"
          size="small"
          onChange={handleSpecificProblemChange}
          sx={ specificProblemRequired ? { ...textFieldStyle, ...textFieldRequiredBordersStyle, width: "40vw", minWidth: "215px", maxWidth: "600px", height: "100%"
         } : { ...textFieldStyle, width: "40vw", minWidth: "215px", maxWidth: "600px", height: "100%"
           }}
        />
      </div>

      <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center gap-8">
        <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA2"} text={"Dataprodukt"}/>
        <TextField
          required
          id="outlined-multiline-static"
          multiline
          rows={8}
          maxRows={8}
          label="Dataprodukt"
          size="small"
          onChange={handleClearDataProductChange}
          sx={ clearDataProductRequired ? { ...textFieldStyle, ...textFieldRequiredBordersStyle, width: "40vw", minWidth: "215px", maxWidth: "600px", height: "100%"
        } : { ...textFieldStyle, width: "40vw", minWidth: "215px", maxWidth: "600px", height: "100%"
          }}
        />
      </div>

      <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center gap-8">
        <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA3"} text={"Data"}/>
        <TextField
          required
          id="outlined-multiline-static"
          multiline
          rows={8}
          maxRows={8}
          label="Data"
          size="small"
          onChange={handleAccessibleDataChange}
          sx={ accessibleDataRequired ? { ...textFieldStyle, ...textFieldRequiredBordersStyle, width: "40vw", minWidth: "215px", maxWidth: "600px", height: "100%"
        } : { ...textFieldStyle, width: "40vw", minWidth: "215px", maxWidth: "600px", height: "100%"
          }}
        />
      </div>

      <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center gap-8">
        <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA4"} text={"Definert handling"}/>
        <TextField
          required
          id="outlined-multiline-static"
          multiline
          rows={8}
          maxRows={8}
          label="Definert handling"
          size="small"
          onChange={handleDefinedActionChange}
          sx={ definedActionRequired ? { ...textFieldStyle, ...textFieldRequiredBordersStyle, width: "40vw", minWidth: "215px", maxWidth: "600px", height: "100%"
        } : { ...textFieldStyle, width: "40vw", minWidth: "215px", maxWidth: "600px", height: "100%"
          }}
        />
      </div>
      </div>
      
      {showSimilarChallenges ? 
      <div className=" bg-white h-80 w-4/5 px-3 py-2">
        <h2 className="text-text underline underline-offset-2 text-left mb-2">Like utfordringer</h2>
        <div className="flex flex-row flex-nowrap overflow-auto gap-4">
      
        </div>
      </div> 
      : ""}

      {requiredTextShow ? <p className="text-statusRed">Fyll inn de påkrevde boksene!</p> : ""}

      <Button variant="contained" onClick={handleSend} sx={{ color: "white", backgroundColor: "#0D264A", width: "150px", borderRadius: "45px", marginBottom: "2rem", marginTop: "1rem", '&:hover': {
      backgroundColor: '#14325E',
  }}}>Send</Button>
      </div>

      <Footer />   
    </div>
  )
}

export default NewChallenge;