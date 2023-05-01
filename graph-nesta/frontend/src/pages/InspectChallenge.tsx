import Button from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ODACircle from '../components/ODACircle'
import { type IfetchType, Status, type User } from '../types/types'
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo'
import PeopleIcon from '@mui/icons-material/People'
import SubInfoComponent from '../components/SubInfoComponent'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import EditIcon from '@mui/icons-material/Edit';
import { ChallengeContext } from '../globalState/ChallengeContext'
import { Link, useNavigate } from 'react-router-dom'
import { getSubscribers, isSubscribed, subscribe, findUser, getUserInfo } from '../api/odaAPI'
import { Breadcrumbs, Typography } from '@mui/material'
import useFetch from '../hooks/useFetch'
import ChallengeCard from '../components/ChallengeCard'

function InspectChallenge () { 

  const [title, setTitle] = useState('')
  const [status, setStatus] = useState(Status.newChallenge)
  const [system, setSystem] = useState('')
  const [, setSubCount] = useState(0)
  const [affiliation, setAffiliation] = useState('')
  const [specificProblem, setSpecificProblem] = useState('')
  const [clearDataProduct, setClearDataProduct] = useState('')
  const [accessibleData, setAccessibility] = useState('')
  const [definedAction, setDefinedAction] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [subs, setSubs] = useState<User[]>([])

  const [isSubbed, setIsSubbed] = useState(false)
  const [statusColor, setStatusColor] = useState('rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed')
  const { challenge } = useContext(ChallengeContext)
  const [challengeIsLoaded, setChallengeIsLoaded] = useState(false)
  const [showSimilarChallenges, setShowSimilarChallenges] = useState(false)
  const [lastMyProblems] = useState(localStorage.getItem("lastMyProblems"))

  const {
    user,
    setUser,
  } = useContext(ChallengeContext)
  const navigate = useNavigate()

  const querySearch: IfetchType = {
    limit: 40,
    categoryFilter: '',
    searchPhrase: '',
    orderBy: '',
    approved: true,
    similarProblem: challenge.id,

  }

  const [query] = useState<IfetchType>(querySearch)
  const { ODAproblems } = useFetch(query, 0)
  //  Sets the const´s above by using global state.
  useEffect(() => {

    if (!user.isLoggedIn) {
      const email = localStorage.getItem('Email') ?? ''
      const password = localStorage.getItem('Password') ?? ''

      findUser(email, password).then(r => {
        if (r.data) {
          getUserInfo(email).then(userInfo => {
            if (userInfo.data) {
              setUser({
                ...userInfo.data,
                isLoggedIn: true,
              })
            }
          }).catch(() => {
            console.log('no user!')
            document.body.scrollTop = 0 // For Safari
            document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
            navigate('/LoggInn')
          })

        } else {
          setUser({
            email: '',
            password: '',
            affiliation: '',
            telephone: '',
            isLoggedIn: false,
            isAdmin: false,
          })
          document.body.scrollTop = 0 // For Safari
          document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
          navigate('/LoggInn')
        }
      }).catch(() => {
        console.log('no user!')
        document.body.scrollTop = 0 // For Safari
        document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
        navigate('/LoggInn')
      })
    }

    if (!challengeIsLoaded) {
      setTitle(challenge.title)
      setStatus(challenge.status)
      setSystem(challenge.vendor)
      setSubCount(challenge.subCount)
      setAffiliation(challenge.owner.affiliation)
      setSpecificProblem(challenge.specificProblem)
      setEmail(challenge.owner.email)
      setTelephone(challenge.owner.telephone)
      setClearDataProduct(challenge.clearDataProduct)
      setAccessibility(challenge.accessibleData)
      setDefinedAction(challenge.definedAction)
      setSubs([])
      setChallengeIsLoaded(true)
    }

    //  Changes the color theme of the status circle.
    switch (challenge.status) {
      case Status.newChallenge:
        setStatusColor('rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed')
        break

      case Status.started:
        setStatusColor('rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusOrange')
        break

      case Status.solved:
        setStatusColor('rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusGreen')
        break
    }
    
    //  Adds all subs of a challenge to the subs Array.
    getSubscribers(challenge.id).then(r => {
      console.log(r.data)
      setSubs(r.data)
    }).catch(() => {
    })
    isSubscribed(challenge.id, user.email).then(r => {
      if (r.data) {
        console.log(r)
        setIsSubbed(true)
      }
    }).catch(() => {
      setIsSubbed(false)

    })

  }, [])
  useEffect(() => {
    console.log(subs)
  }, [subs])

  //  Handles similarChallenges show
  const handleSimilarChallengesShow = () => {
    setShowSimilarChallenges(!showSimilarChallenges)
  }

  //  updates database of subs
  const handleSubClick = () => {
    if (isSubbed) {
      subscribe(challenge.id, user.email, false).then(() => {
        setIsSubbed(false)
        getSubscribers(challenge.id).then(r => {
          console.log(r.data)
          setSubs(r.data)
        }).catch(() => {
        })
      }).catch(() => '')
    } else {
      subscribe(challenge.id, user.email, true).then(() => {
        setIsSubbed(true)
        getSubscribers(challenge.id).then(r => {
          console.log(r.data)
          setSubs(r.data)
        }).catch(() => {
        })
      }).catch(() => '')
    }
  }

  return (
    <div className='App'>
      <Header />

      <div className='bg-background flex flex-col'>

        <div className='text-left ml-10 sm:ml-[5.25rem] mt-4'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link className={'hover:underline'} to='/Hjem'>
              Hjem
            </Link>
            <Link className={'hover:underline'} to={lastMyProblems === "true" ? "/MineProblem" : '/Søk'}>
              {lastMyProblems === "true" ? "Mine problem" : "Søk"}
            </Link> 

            <Typography color='text.primary'>{title}</Typography>
          </Breadcrumbs>
        </div>

        <div className='items-center justify-center flex flex-col'>

          <div className='text-text px-5 py-3 w-full items-center justify-center flex flex-col mb-5'>

            <div className="flex flex-row gap-4 items-center mb-2.5">
              <h1 className='text-4xl'>{title}</h1>
              { user.isAdmin.toString() === 'true' || challenge.owner.email === user.email ? <Link to={"/RedigerProblem"}><EditIcon  sx={{ fontSize: '2rem', '&:hover': { backgroundColor: '#3d3f6b', color: "white", borderRadius: "5px" }}}/></Link> : null}
            </div>

            <section className=' items-end flex flex-row justify-between text-xs mb-1.5 gap-2'>
              <div className='flex flex-row'>
                <PersonalVideoIcon sx={{ fontSize: '1rem' }} />
                <p className='ml-1.5 whitespace-nowrap'>{system}</p>
              </div>

              <div className='flex flex-row'>
                <PeopleIcon sx={{ fontSize: '1rem' }} />
                <p className='ml-1.5 whitespace-nowrap'>{subs.length}</p>
              </div>

              <div className='flex flex-row'>
                <LocationCityIcon sx={{ fontSize: '1rem' }} />
                <p className='ml-1.5 whitespace-nowrap'>{affiliation}</p>
              </div>
            </section>

            <div className='flex flex-row items-center'>
              <ODACircle style={statusColor} text={''} />
              <p className='whitespace-nowrap'>{status}</p>
            </div>
          </div>

          <div>
            <div className='flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center'>
              <ODACircle
                style={'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA1'}
                text={'Spesifikt problem'} />
              <p
                className='w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8'>{specificProblem}</p>
            </div>

            <div className='flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center'>
              <ODACircle
                style={'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA2'}
                text={'Dataprodukt'} />
              <p
                className='w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8'>{clearDataProduct}</p>
            </div>

            <div className='flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center'>
              <ODACircle
                style={'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA3'}
                text={'Data'} />
              <p
                className='w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8'>{accessibleData}</p>
            </div>

            <div className='flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center'>
              <ODACircle
                style={'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA4'}
                text={'Definert handling'} />
              <p
                className='w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8'>{definedAction}</p>
            </div>
          </div>

          <Button variant='contained' onClick={handleSimilarChallengesShow} sx={{
                  color: 'white',
                  backgroundColor: '#0D264A',
                  width: '250px',
                  borderRadius: '45px',
                  '&:hover': { backgroundColor: '#3d3f6b' },
                }}> {showSimilarChallenges ? 'Lukk lignende problem' : 'Vis lignende problem'} 
          </Button>

          {showSimilarChallenges ?
            <div className='my-8 w-[60vw]'>
              <div className={ODAproblems.length > 1 ?'bg-white flex px-4 py-2 flex-nowrap overflow-auto gap-4': "text-center"}>
                
                {ODAproblems.length > 1 ? 
                  
                  ODAproblems.map((data) => { return data.id !== challenge.id ?
                    <ChallengeCard key={data.id} id={data.id} title={data.title} vendor={data.vendor.substring(20)}
                    status={data.status} specificProblem={data.specificProblem}
                    clearDataProduct={data.clearDataProduct} accessibleData={data.accessibleData}
                    definedAction={data.definedAction} subCount={data.subCount} owner={data.owner}
                    subs={data.subs} edit={false} approved={data.approved} /> 
                  : null})
                
                : <p>Ingen lignende problem funnet!</p>}
             
              </div>
            </div>
            : null}

          <div data-cy = "kontaktContainer" className='flex flex-row w-[60vw] 3xl:w-[57vw] 4xl:w-[54vw] mt-10 mb-5 items-center justify-center'>
            <div className="flex flex-col text-left gap-1 ">
            <h2 className='text-text underline underline-offset2 text-2xl'>Kontaktinformasjon</h2>

            <div className='flex flex-row items-center gap-1 text-xs sm:text-base'><LocationCityIcon
              sx={{ fontSize: '1rem' }} />{affiliation}</div>
            <div className='flex flex-row items-center gap-1 text-xs sm:text-base'><EmailIcon
              sx={{ fontSize: '1rem' }} />{email}</div>
            <div className='flex flex-row items-center gap-1 text-xs sm:text-base'><PhoneIcon
              sx={{ fontSize: '1rem' }} />+47 {telephone}</div>
            </div>
            <div className="w-[60vw] pl-4 sm:pl-8"></div>
          </div>

          <div className='flex flex-col w-[60vw] 3xl:w-[57vw] 4xl:w-[54vw] text-left mb-5 gap-1'>

            <div className='mt-5 flex flex-row flex-wrap gap-2 mb-2 items-center justify-between'>
              <h1 data-cy ="subcount"
                className='text-text underline underline-offset2 text-2xl flex flex-row items-center whitespace-nowrap'>
                <PeopleIcon sx={{
                  fontSize: '2rem',
                  marginRight: '0.5rem',
                }} />{subs.length} har samme problem</h1>
              {user.email === challenge.owner.email ? null :
                <Button data-cy ="subscribeBtn" variant='contained' onClick={handleSubClick} sx={{
                  color: 'white',
                  backgroundColor: '#0D264A',
                  width: '200px',
                  borderRadius: '45px',
                  '&:hover': { backgroundColor: '#3d3f6b' },
                }}> {isSubbed ? 'Fjern fra listen' : 'Abonner'}
                </Button>
              }
            </div>

            {

              subs.map((userprops: User) =>
                <div key={userprops.email}>
                  <SubInfoComponent {...userprops} />
                </div>)

            }

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default InspectChallenge