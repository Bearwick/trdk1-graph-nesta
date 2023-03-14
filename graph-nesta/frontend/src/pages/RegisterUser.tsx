import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function RegisterUser(){

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[tlf, setTlf] = useState("");

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
 

      const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      }

      const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
      }

      const handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTlf(event.target.value);
      }

      const handlePost = () => {
        alert("Navn: " + name + ", E-post: " + email + ", Telefon: " + tlf + "registrert")
      }

    return(
        <div className="App">
            <Header/>
                <main className="min-h-[82vh] flex flex-col items-center">
                  <h1 className="text-center mt-20 text-2xl">Registrer bruker</h1>
                  <section className="mt-10 flex flex-col">
                  <section className="flex flex-col gap-4">
                    <TextField
                      label="Navn"
                      size="medium"
                      onChange={handleNameChange}
                      sx={ { ...textFieldStyle,     width: "50vw",
                      maxWidth: "300px", }}
                    />

                    <TextField
                      label="E-post"
                      size="medium"
                      onChange={handleNameChange}
                      sx={ { ...textFieldStyle,     width: "50vw",
                      maxWidth: "300px", }}
                    />

                    <TextField
                      label="Passord"
                      type = "password"
                      size="medium"
                      onChange={handleEmailChange}
                      sx={ { ...textFieldStyle,     width: "50vw",
                      maxWidth: "300px", }}
                    />


                    <TextField
                        label="Bekreft passord"
                        type = "password"
                        size="medium"
                        onChange={handleTlfChange}
                        sx={ { ...textFieldStyle,     width: "50vw",
                        maxWidth: "300px", }}/>
                  </section>
                  <Link to="/LoggInn"><p className="text-right underline hover:text-linkBlue">Har du allerede en konto?</p></Link>
                  </section>
                  <Button variant="contained" onClick={handlePost} sx={{ color: "white", backgroundColor: "#0D264A", width: "180px", borderRadius: "45px", marginBottom: "2rem", marginTop: "1rem", '&:hover': {
                    backgroundColor: '#14325E',
                    }}}   ><p className="whitespace-nowrap">Registrer bruker</p></Button>
                  
                </main>


            <Footer/>
        </div>
    )


}

export default RegisterUser;