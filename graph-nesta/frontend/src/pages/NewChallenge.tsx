import '../App.css'
import React, { useContext, useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
import { ChallengeContext } from '../globalState/ChallengeContext';
import Box from '@mui/material/Box';
import { addOdaProblem } from '../api/odaAPI';
//  import ChallengeCard from '../components/ChallengeCard';

function NewChallenge() {

  const {user, setUser } = useContext(ChallengeContext);
  const navigate = useNavigate();

  //  Cheks if email and password is in localStorage. Saves it in global state. Sends to login if not. 
  useEffect(() => {
    if (!user.isLoggedIn) {
      const email = localStorage.getItem("Email") ?? "";
      if (email) {
        const password = localStorage.getItem("Password") ?? "";
        setUser({
          email,
          password,
          isLoggedIn: true,
          isAdmin: false,
        });
      } else {
        navigate("/LoggInn");
      }
    }      
  },[navigate, setUser, user.isLoggedIn]);

  const [title, setTitle] = useState('')
  const [system, setSystem] = useState('')
  const [otherSystem, setOtherSystem] = useState('')
  const [otherSystemShow, setOtherSystemShow] = useState(false)
  const [status, setStatus] = useState('newChallenge')
  const [specificProblem, setSpecificProblem] = useState('')
  const [clearDataProduct, setClearDataProduct] = useState('')
  const [accessibleData, setAccessibleData] = useState('')
  const [definedAction, setDefinedAction] = useState('')
  const [showSimilarChallenges, setShowSimilarChallenges] = useState(false)
  const checkSystem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystem(event.target.value)
    if (event.target.value === 'Annet system') {
      setOtherSystemShow(true)
      setShowSimilarChallenges(true)
    } else {
      setOtherSystemShow(false)
      setShowSimilarChallenges(false)
    }
  }

  //  Styling for mui components (sx).
  const textFieldStyle = {
    backgroundColor: 'white',
    '& label.Mui-focused': {
      color: '#0D264A',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#0D264A',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0D264A',
      },
    },
  }

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
  ]
  const postChallenge = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    addOdaProblem(title, specificProblem, clearDataProduct, accessibleData, definedAction, system, user.email, status).then(() => {
      console.log('ODAproblem posted succesfully')
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // for safari, chrome, edge, etc.
      navigate("/Hjem");
    }).catch(() => {
      console.log('Failure posting ODAproblem')
    })

  }

  return (
    <div className='App'>
      <Header />

      <Box component='form' onSubmit={(e) => {
        postChallenge(e)
      }} className='bg-background   flex flex-col items-center'>
        <h1 className='text-3xl text-text p-5'>Ny utfordring!</h1>

        <TextField
          required
          id='outlined-required'
          label='Tittel'
          size='small'
          name='title'
          value={title}
          onChange={e =>
            { setTitle(e.target.value); }
          }
          sx={{
            ...textFieldStyle,
            width: '60vw',
            maxWidth: '375px',
          }}
        />

        <TextField

          select
          required
          label='System'
          name='system'
          size='small'
          value={system}
          onChange={checkSystem}
          sx={{
            ...textFieldStyle,
            width: '60vw',
            maxWidth: '375px',
            marginTop: '10px',
          }}
        >
          {systems.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {otherSystemShow ? <TextField
          required
          id='outlined-required'
          label='Annet system'
          size='small'
          value={otherSystem}
          name='otherSystem'
          onChange={e => {
            setSystem(e.target.value)
            setOtherSystem(e.target.value)
          }}
          sx={{
            backgroundColor: 'white',
            width: '60vw',
            maxWidth: '375px',
            marginTop: '10px',
          }}
        /> : <div></div>}

        <FormLabel id='demo-radio-buttons-group-label' className='mt-5'>Status</FormLabel>
        <RadioGroup
          row
          aria-labelledby='demo-radio-buttons-group-label'
          className='mb-5'
          defaultValue='newChallenge'
          name='status'
          value={status}
          onChange={e => {
            setStatus(e.target.value)
          }}
        >
          <FormControlLabel value='newChallenge' control={<Radio sx={{ '&.Mui-checked': { color: '#FF002F' } }} />}
                            label='Ny utfordring' />
          <FormControlLabel value='inProcess' control={<Radio sx={{ '&.Mui-checked': { color: '#F0AE2F' } }} />}
                            label='Påbegynnt' />
          <FormControlLabel value='Solved' control={<Radio sx={{ '&.Mui-checked': { color: '#2BB728' } }} />}
                            label='Løst' />
        </RadioGroup>

        <div className='flex flex-col'>
          <div className='flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center gap-8'>
            <ODACircle
              style={'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA1'}
              text={'Spesifikt problem'} />
            <TextField
              required
              id='outlined-multiline-static'
              multiline
              value={specificProblem}
              onChange={e => {
                setSpecificProblem(e.target.value)
              }}
              name='specificProblem'
              rows={8}
              label='Spesifikt problem'
              placeholder='Problemet vårt er at … [sett inn spesifikk problemstilling]. F.eks. Problemet vårt problem er at det er mange lisenser som ikke brukes, men som likevel koster penger for enhetene.'
              size='small'
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
          </div>

          <div className='flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center gap-8'>
            <ODACircle
              style={'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA2'}
              text={'Dataprodukt'} />
            <TextField
              required
              id='outlined-multiline-static'
              multiline
              name='dataProduct'
              rows={8}
              value={clearDataProduct}
              onChange={e => {
                setClearDataProduct(e.target.value)
              }}
              label='Tydelig dataprodukt'
              placeholder='Hvis vi kunne sett/Hvis vi visste… [sett inn hva dataproduktet viser]. F.eks. Hvis vi kunne sett hvilke lisenser som ikke er i bruk og synliggjøre kostnadene som tabell,'
              size='small'
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
          </div>

          <div className='flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center gap-8'>
            <ODACircle
              style={'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA3'}
              text={'Tilgjengelig data'} />
            <TextField
              required
              id='outlined-multiline-static'
              multiline
              rows={8}
              value={accessibleData}
              onChange={e => {
                setAccessibleData(e.target.value)
              }}
              name='accessibleData'
              label='Tilgjengelige data'
              placeholder='Ved å bruke disse datasettene… [sett inn hva datasettene du planlegger å bruke]. F.eks. Ved å bruke rapporter på kostnader, liste med lisenser og liste over reell bruk av programmet,'
              size='small'
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
          </div>

          <div className='flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center gap-8'>
            <ODACircle
              style={'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA4'}
              text={'Definert handling'} />
            <TextField
              required
              id='outlined-multiline-static'
              multiline
              rows={8}
              name='definedAction'
              label='Definert handling'
              value={definedAction}
              onChange={e => {
                setDefinedAction(e.target.value)
              }}
              placeholder='For å løse dette vil vi … [liste over tiltak du ønsker å implementere]. F.eks. For å løse dette vil vi frigjøre lisenser vi allerede har betalt for og som kan gjenbrukes av andre, og bevisstgjøre enhetsledere på kostnaden ved lisenser.'
              size='small'
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
          </div>
        </div>

        {showSimilarChallenges ?
          <div className=' bg-white h-80 w-4/5 px-3 py-2'>
            <h2 className='text-text underline underline-offset-2 text-left mb-2'>Like utfordringer</h2>
            <div className='flex flex-row flex-nowrap overflow-auto gap-4'>

            </div>
          </div>
          : ''}


        <Button variant='contained' type='submit' sx={{

          color: 'white',
          backgroundColor: '#0D264A',
          width: '150px',
          borderRadius: '45px',
          marginBottom: '2rem',
          marginTop: '1rem',
          '&:hover': {
            backgroundColor: '#3d3f6b',
          },
        }}>Send</Button>
      </Box>

      <Footer />
    </div>
  )
}

export default NewChallenge;
