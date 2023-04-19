import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { addUser, findUser } from "../api/odaAPI";
import MenuItem from "@mui/material/MenuItem";
import { ChallengeContext } from "../globalState/ChallengeContext";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

function RegisterUser(){

    const navigate = useNavigate();
    const[newUserIsAdmin, setNewUserIsAdmin] = useState(false)
    const[affiliation, setAffiliation] = useState("");
    const[email, setEmail] = useState("");
    const[tlf, setTlf] = useState(0);
    const[password, setPassword] = useState("");
    const[passwordConfirm, setPasswordConfirm] = useState("");
    const[showRequiredMessage, setShowRequiredMessage] = useState(false);
    const[showUserExistMessange, setShowUserExistMessage] = useState(false);
    const[showErrorMessage, setShowErrorMessage] = useState(false);
    const[showAddedUserText, setShowAddedUserText] = useState(false);

    //  Cheks if email and password is in localStorage. Saves it in global state. Sends to login if not.
    const { user } = useContext(ChallengeContext);
    useEffect(() => {
      if (!(user.isAdmin.toString() === "true")) {
          navigate("/LoggInn");
        }
    },[navigate, user.isAdmin]);

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

    const affiliations = [
        {
          value: 'Trondheim kommune',
          label: 'Trondheim kommune',
        },
        {
          value: 'Malvik kommune',
          label: 'Malvik kommune',
        },
        {
          value: 'Trøndelag fylkeskommune',
          label: 'Trøndelag fylkeskommune',
        },
        {
          value: 'Steinkjer kommune',
          label: 'Steinkjer kommune',
        },
    ];


      const handleAffiliationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAffiliation(event.target.value);
        setShowRequiredMessage(false);
      }
      const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setShowRequiredMessage(false);
        setShowUserExistMessage(false);
      }
      const handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTlf(event.target.valueAsNumber);
        setShowRequiredMessage(false);
      }
      const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setShowRequiredMessage(false);

      }
      const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
        setShowRequiredMessage(false);
      }


      const handlePost = () => {
        if (affiliation.length === 0 || email.length === 0 || tlf.toString().length !== 8 || password.length === 0 || password !== passwordConfirm ) {
          setShowRequiredMessage(true)
        } else {
       findUser(email, password).then(r => {
        if (r.data) {
          console.log("User allready exists")
          setShowUserExistMessage(true)
        } else {
          addUser(tlf, email, affiliation, password, newUserIsAdmin).then(() => {
            console.log("User added");
            setShowAddedUserText(true);

          }).catch(() => {setShowErrorMessage(true)})
        }
       }).catch(() => {setShowErrorMessage(true)})
      }
      }

    return(
        <div className="App">
            <Header/>
                <main className="min-h-[82vh] flex flex-col items-center">
                  <h1 className="text-center mt-20 text-2xl">Registrer ny bruker</h1>
                  <section className="mt-5 flex flex-col">

                  <RadioGroup
                    row
                    aria-labelledby='demo-radio-buttons-group-label'
                    className='mb-5'
                    defaultValue='newChallenge'
                    name='Brukertype'
                    value={newUserIsAdmin}
                    onChange={e => {
                      setNewUserIsAdmin(e.target.value === "true")
                    }}
                  >
                    <FormControlLabel value={false} control={<Radio sx={{ '&.Mui-checked': { color: '#2BB728' } }} />}
                                      label='Vanlig bruker' />
                    <FormControlLabel value={true} control={<Radio sx={{ '&.Mui-checked': { color: '#FF002F' } }} />}
                                      label='Administrator' />
                  </RadioGroup>


                  <section className="flex flex-col gap-4">

                  <TextField
                    select
                    required
                    label="Tilhørighet"
                    size="medium"
                    onChange={handleAffiliationChange}
                    sx={ { ...textFieldStyle, width: "50vw", maxWidth: "300px"}}
                  >
                    {affiliations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                    <TextField
                      required
                      label="E-post"
                      size="medium"
                      onChange={handleEmailChange}
                      sx={ { ...textFieldStyle, width: "50vw", maxWidth: "300px"}}
                    />
                    <TextField
                      required
                      label="Tlf"
                      size="medium"
                      type="number"
                      onChange={handleTlfChange}
                      sx={ { ...textFieldStyle, width: "50vw", maxWidth: "300px"}}
                    />

                    <TextField
                      required
                      label="Passord"
                      type = "password"
                      size="medium"
                      onChange={handlePasswordChange}
                      sx={ { ...textFieldStyle, width: "50vw", maxWidth: "300px"}}
                    />

                    <TextField
                      required
                      label="Bekreft passord"
                      type = "password"
                      size="medium"
                      onChange={handlePasswordConfirmChange}
                      sx={ { ...textFieldStyle, width: "50vw", maxWidth: "300px"}}
                    />

                    {showRequiredMessage ? <p className="mt-0 text-statusRed">Alle feltene må fylles ut!</p> : null}
                    {showUserExistMessange ? <p className="mt-0 text-statusRed">Bruker finnes allerede!</p> : null}
                    {showErrorMessage ? <p className="mt-0 text-statusRed">Det har skjedd en feil...</p> : null}
                    {showAddedUserText ? <p className="mt-0 text-statusGreen">Bruker lagt til!</p>: null}

                  </section>
                  </section>
                  <Button variant="contained" onClick={handlePost} sx={{ color: "white", backgroundColor: "#0D264A", width: "180px", borderRadius: "45px", marginBottom: "2rem", marginTop: "1rem", '&:hover': {
                    backgroundColor: '#3d3f6b',
                    }}}   ><p className="whitespace-nowrap">Registrer bruker</p></Button>

                </main>
            <Footer/>
        </div>
    )

}

export default RegisterUser;
