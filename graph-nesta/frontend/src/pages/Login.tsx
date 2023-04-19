import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { findUser, getUserInfo } from "../api/odaAPI";
import { ChallengeContext } from "../globalState/ChallengeContext";

function Login() {
  const {setUser} = useContext(ChallengeContext);

  const navigate = useNavigate();
  const[showNoUser, setShowNoUser] = useState(false);

  const [email, setEmail] = useState( localStorage.getItem("Email") ?? "");
  const [password, setPassword] = useState(localStorage.getItem("Password") ?? "");


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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleLogin = () => {

    findUser(email, password).then(r => {
      if (r.data) {
        localStorage.setItem("Email", email);
        localStorage.setItem("Password", password);
        getUserInfo(email).then(userInfo => {
          if (userInfo.data) {
              setUser({...userInfo.data, isLoggedIn: true});
          }
        }).catch(() => {setShowNoUser(true)})
        
        navigate("/Hjem")
      } else {
        setShowNoUser(true)
      }
    }).catch(() => {setShowNoUser(true)})
    
  }

    return (
      <div  className="text-center">
        <Header />
        <main className="min-h-[82vh] flex flex-col items-center">
          <h1 className="text-center mt-28 text-2xl">Innlogging</h1>

          <section className="mt-10 flex flex-col">
          <section className="flex flex-col gap-4">
            <TextField
              label="E-post"
              size="medium"
              value={email}
              onChange={handleEmailChange}
              sx={ { ...textFieldStyle,     width: "50vw",
              maxWidth: "300px", }}
            />
              <TextField
              label="Passord"
              type = "password"
              size="medium"
              value={password}
              onChange={handlePasswordChange}
              sx={ { ...textFieldStyle,     width: "50vw",
              maxWidth: "300px", }}
            />
            {showNoUser? <p className="mt-0 text-statusRed">Ingen bruker funnet</p> : null}
          </section>
          </section>

            <Button variant="contained" onClick={handleLogin} sx={{ color: "white", backgroundColor: "#0D264A", width: "150px", borderRadius: "45px", marginBottom: "2rem", marginTop: "1rem", '&:hover': {
            backgroundColor: '#3d3f6b',
      }}}   >Logg inn</Button>

        </main>
        <Footer/>
      </div>
    )
  }
  
  export default Login;