import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Login() {


  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleLogin = () => {
    alert("Navn: " + name + ". Passord: " + password);
  }

    return (
      <div  className="text-center">
        <Header />
        <main className="min-h-[82vh] flex flex-col items-center">
          <h1 className="text-center mt-10 text-2xl">Innlogging</h1>
          <section className="mt-28 grid grid-rows-3 gap-6">
            <TextField
              label="Navn"
              size="medium"
              onChange={handleNameChange}
              sx={ { ...textFieldStyle,     width: "50vw",
              maxWidth: "300px", }}
            />
              <TextField
              label="Passord"
              type = "password"
              size="medium"
              onChange={handlePasswordChange}
              sx={ { ...textFieldStyle,     width: "50vw",
              maxWidth: "300px", }}
            />
            <Link to="/RegistrerBruker"><p className="text-right underline">Har du ikke bruker?</p></Link>
          </section>

            <Button variant="contained" onClick={handleLogin} sx={{ color: "white", backgroundColor: "#0D264A", width: "150px", borderRadius: "45px", marginBottom: "2rem", marginTop: "1rem", '&:hover': {
            backgroundColor: '#14325E',
      }}}   >Logg inn</Button>

        </main>
        <Footer/>
      </div>
    )
  }
  
  export default Login;