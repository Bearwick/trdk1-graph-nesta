import '../App.css'
import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import ODACircle from '../components/ODACircle'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Link, useNavigate } from 'react-router-dom'
import { ChallengeContext } from '../globalState/ChallengeContext'
import Box from '@mui/material/Box'
import { type Categories, Status } from '../types/types'
import {
  Alert,
  Breadcrumbs,
  Snackbar,
  Tooltip,
  type TooltipProps,
  Typography,
  styled,
  tooltipClasses,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import {
  approve,
  deleteOdaProblem,
  getCategories,
  getVendors,
  updateOdaProblem,
} from '../api/odaAPI'

function EditProblem() {
  const { user, challenge } = useContext(ChallengeContext)
  const navigate = useNavigate()

  //  Cheks if email and password is in localStorage. Saves it in global state. Sends to login if not.
  useEffect(() => {
    if (!(user.isAdmin.toString() === 'true' || challenge.owner.email === user.email)) {
      navigate('/LoggInn')
    }

    switch (challenge.status) {
      case Status.newChallenge:
        setStatus('newChallenge')
        break

      case Status.started:
        setStatus('inProcess')
        break

      case Status.solved:
        setStatus('Solved')
        break
    }
  }, [navigate, user.isAdmin])

  const [title, setTitle] = useState(challenge.title)
  const [system, setSystem] = useState(challenge.vendor)
  const [otherSystem, setOtherSystem] = useState('')
  const [otherSystemShow, setOtherSystemShow] = useState(false)
  const [status, setStatus] = useState('newChallenge')
  const [specificProblem, setSpecificProblem] = useState(challenge.specificProblem)
  const [specificProblemCategory, setSpecificProblemCategory] = useState('')
  const [clearDataProduct, setClearDataProduct] = useState(challenge.clearDataProduct)
  const [clearDataProductCategory, setClearDataProductCategory] = useState('')
  const [accessibleData, setAccessibleData] = useState(challenge.accessibleData)
  const [accessibleDataCategory, setAccessibleDataCategory] = useState('')
  const [definedAction, setDefinedAction] = useState(challenge.definedAction)
  const [submitDelete, setSubmitDelete] = useState(false)
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false)
  const [showConfirmEditMessage, setShowConfirmEditMessage] = useState(false)
  const [categories, setCategories] = useState<Categories>()
  const [error, setError] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const checkSystem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystem(event.target.value)
    if (event.target.value === 'Annet system') {
      setOtherSystemShow(true)
    } else {
      setOtherSystemShow(false)
    }
  }
  const handleSpecificProblemCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecificProblemCategory(event.target.value)
  }
  const handleClearDataProductCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClearDataProductCategory(event.target.value)
  }
  const handleAccessibleDataCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessibleDataCategory(event.target.value)
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

  const statusHelpText = `Nytt problem: problemet er nettopp oppdaget og/eller aldri arbeidet med.
  Påbegynnt: problemet arbeides med.
  Løst: det er blitt laget en løsning for problemet. `

  const specificProblemHelpText = `Problemet vårt er at … [sett inn spesifikk problemstilling].
            F.eks. Problemet vårt problem er at det er mange lisenser som ikke brukes,
            men som likevel koster penger for enhetene.`

  const dataProductHelpText = `Hvis vi kunne sett/Hvis vi visste… [sett inn hva dataproduktet viser].
        F.eks. Hvis vi kunne sett hvilke lisenser som ikke er i bruk og synliggjøre kostnadene som tabell,`

  const accessibleDataHelpText = `Ved å bruke disse datasettene… [sett inn hva datasettene du planlegger å bruke].
          F.eks. Ved å bruke rapporter på kostnader, liste med lisenser og liste over reell bruk av programmet,`

  const definedActionHelpText = `For å løse dette vil vi … [liste over tiltak du ønsker å implementere].
          F.eks. For å løse dette vil vi frigjøre lisenser vi allerede har betalt for og som kan gjenbrukes av andre,
          og bevisstgjøre enhetsledere på kostnaden ved lisenser.`

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 400,
    },
  })

  //  List of systems available.
  const [systems, setSystems] = useState<string[]>()
  useEffect(() => {
    getVendors()
      .then((r) => {
        setSystems(r.data)
      })
      .catch(() => {
        setSystems([])
      })
  }, [])
  //  List of accessible data categories

  useEffect(() => {
    getCategories()
      .then((r) => {
        setCategories(r.data)
      })
      .catch(() => {
        setError(true)
      })
  }, [])

  const handleSuccessClose = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
    setShowSuccessMessage(false)
    navigate('/Søk')
  }

  const handleCancelDelete = () => {
    setShowConfirmDeleteDialog(false)
  }

  const handleDelete = () => {
    setShowConfirmDeleteDialog(false)
    deleteOdaProblem(challenge.id)
      .then(() => {
        setShowSuccessMessage(true)
      })
      .catch((res) => {
        setError(true)
        console.log(res)
      })
  }

  const handleCancelChanges = () => {
    setShowConfirmEditMessage(false)
  }

  const handleSaveButton = () => {
    if (user.isAdmin.toString() === 'true') {
      if (
        specificProblemCategory === '0' ||
        clearDataProductCategory === '0' ||
        accessibleDataCategory === '0'
      ) {
        setSpecificProblemCategory('')
        setClearDataProductCategory('')
        setAccessibleDataCategory('')
      } else {
        setSubmitDelete(false)
      }
    } else {
      fillCategories()
      setSubmitDelete(false)
    }
  }

  const handleSaveChanges = () => {
    if (user.isAdmin.toString() === 'true') {
      updateOdaProblem(
        challenge.id,
        system,
        status,
        title,
        specificProblem,
        clearDataProduct,
        accessibleData,
        definedAction
      )
        .then(() => {
          approve(
            specificProblemCategory,
            accessibleDataCategory,
            clearDataProductCategory,
            challenge.id,
            true
          )
            .then(() => {
              setShowConfirmEditMessage(false)
              setShowSuccessMessage(true)
            })
            .catch((res) => {
              setError(true)
              console.log(res)
            })
        })
        .catch((res) => {
          setError(true)
          console.log(res)
        })
    } else {
      updateOdaProblem(
        challenge.id,
        system,
        status,
        title,
        specificProblem,
        clearDataProduct,
        accessibleData,
        definedAction
      )
        .then(() => {
          approve(
            specificProblemCategory,
            accessibleDataCategory,
            clearDataProductCategory,
            challenge.id,
            false
          )
            .then(() => {
              setShowConfirmEditMessage(false)
              setShowSuccessMessage(true)
            })
            .catch((res) => {
              setError(true)
              console.log(res)
            })
        })
        .catch((res) => {
          setError(true)
          console.log(res)
        })
    }
  }
  //   Fills the categories if empty. Used when deleting or user is editing problem. Then categories are not neccessary.
  const fillCategories = () => {
    setSpecificProblemCategory(specificProblemCategory || '0')
    setClearDataProductCategory(clearDataProductCategory || '0')
    setAccessibleDataCategory(accessibleDataCategory || '0')
  }

  const postChallenge = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitDelete) {
      setShowConfirmDeleteDialog(true)
    } else {
      setShowConfirmEditMessage(true)
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="text-left ml-10 sm:ml-[5.25rem] mt-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className={'hover:underline'} to="/Hjem">
            Hjem
          </Link>
          <Link color="inherit" className={'hover:underline'} to="/Søk">
            Søk
          </Link>

          <Typography color="text.primary">{challenge.title}</Typography>
        </Breadcrumbs>
      </div>

      <Box
        component="form"
        onSubmit={(e) => {
          postChallenge(e)
        }}
        className="bg-background flex flex-col items-center"
      >
        <h1 className="text-3xl text-text mt-5">Rediger problem</h1>
        <h1 className="text-2xl text-text mb-5">Problemet tilhører: {challenge.owner.email}</h1>

        <TextField
          required
          id="outlined-required"
          label="Tittel"
          size="small"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          sx={{
            ...textFieldStyle,
            width: '60vw',
            maxWidth: '350px',
          }}
        />

        <TextField
          select
          required
          label="System"
          name="system"
          size="small"
          value={system}
          onChange={checkSystem}
          sx={{
            ...textFieldStyle,
            width: '60vw',
            maxWidth: '350px',
            marginTop: '10px',
          }}
        >
          {systems?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          <MenuItem data-cy="Annet system" key="Annet system" value="Annet system">
            Annet system
          </MenuItem>
        </TextField>
        {otherSystemShow ? (
          <TextField
            required
            id="outlined-required"
            label="Annet system"
            size="small"
            value={otherSystem}
            name="otherSystem"
            onChange={(e) => {
              setSystem(e.target.value)
              setOtherSystem(e.target.value)
            }}
            sx={{
              backgroundColor: 'white',
              width: '60vw',
              maxWidth: '350px',
              marginTop: '10px',
            }}
          />
        ) : null}

        <FormLabel id="demo-radio-buttons-group-label" className="mt-5">
          Status på problemet
          <CustomWidthTooltip title={statusHelpText}>
            <HelpOutlineIcon
              sx={{
                marginLeft: '0.25rem',
                marginTop: '-0.1rem',
                fontSize: 'medium',
                '&:hover': { cursor: 'pointer' },
              }}
            />
          </CustomWidthTooltip>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          className="mb-5"
          defaultValue="newChallenge"
          name="Status på problemet"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
          }}
        >
          <FormControlLabel
            value="newChallenge"
            control={<Radio sx={{ '&.Mui-checked': { color: '#FF002F' } }} />}
            label="Nytt problem"
          />
          <FormControlLabel
            value="inProcess"
            control={<Radio sx={{ '&.Mui-checked': { color: '#F0AE2F' } }} />}
            label="Påbegynnt"
          />
          <FormControlLabel
            value="Solved"
            control={<Radio sx={{ '&.Mui-checked': { color: '#2BB728' } }} />}
            label="Løst"
          />
        </RadioGroup>

        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center gap-8">
            <ODACircle
              style={
                'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA1'
              }
              text={'Spesifikt problem'}
            />
            <TextField
              required
              id="outlined-multiline-static"
              multiline
              value={specificProblem}
              onChange={(e) => {
                setSpecificProblem(e.target.value)
              }}
              name="specificProblem"
              rows={8}
              label="Spesifikt problem"
              size="small"
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
            <CustomWidthTooltip title={specificProblemHelpText}>
              <HelpOutlineIcon
                sx={{
                  '@media screen and (max-width: 640px)': {
                    marginLeft: '200px',
                    marginTop: '-230px',
                    marginBottom: '11rem',
                  },
                  marginLeft: '-50px',
                  marginTop: '-175px',
                  zIndex: '1',
                  fontSize: 'medium',
                  '&:hover': { cursor: 'pointer' },
                }}
              />
            </CustomWidthTooltip>
          </div>

          {user.isAdmin.toString() === 'true' ? (
            <div className="flex flex-col sm:flex-row w-[80vw] sm:w-[65vw] items-center justify-center gap-8 mb-8">
              <div className="w-20 sm:w-36 md:w-40 lg:w-44 xl:w-48 "></div>

              <div className="flex flex-row items-center justify-center sm:justify-start w-[62vw] sm:w-[40vw] max-w-[600px]">
                <TextField
                  data-cy = "kategoriserSpesProblem"
                  select
                  required
                  label="Kategoriser spesifikt problem"
                  name="Kategoriser spesifikt problem"
                  size="small"
                  value={specificProblemCategory}
                  onChange={handleSpecificProblemCategoryChange}
                  sx={{
                    ...textFieldStyle,
                    width: '40vw',
                    minWidth: '215px',
                    maxWidth: '350px',
                  }}
                >
                  {categories?.specificProblem.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center gap-8">
            <ODACircle
              style={
                'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA2'
              }
              text={'Dataprodukt'}
            />
            <TextField
              required
              id="outlined-multiline-static"
              multiline
              name="dataProduct"
              rows={8}
              value={clearDataProduct}
              onChange={(e) => {
                setClearDataProduct(e.target.value)
              }}
              label="Tydelig dataprodukt"
              size="small"
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
            <CustomWidthTooltip title={dataProductHelpText}>
              <HelpOutlineIcon
                sx={{
                  '@media screen and (max-width: 640px)': {
                    marginLeft: '200px',
                    marginTop: '-230px',
                    marginBottom: '11rem',
                  },
                  marginLeft: '-50px',
                  marginTop: '-175px',
                  zIndex: '1',
                  fontSize: 'medium',
                  '&:hover': { cursor: 'pointer' },
                }}
              />
            </CustomWidthTooltip>
          </div>

          {user.isAdmin.toString() === 'true' ? (
            <div className="flex flex-col sm:flex-row w-[80vw] sm:w-[65vw] items-center justify-center gap-8 mb-8">
              <div className="w-20 sm:w-36 md:w-40 lg:w-44 xl:w-48 "></div>

              <div className="flex flex-row items-center justify-center sm:justify-start w-[62vw] sm:w-[40vw] max-w-[600px]">
                <TextField
                  data-cy = "kategoriserDataprodukt"
                  select
                  required
                  label="Kategoriser dataprodukt"
                  name="Kategoriser dataprodukt"
                  size="small"
                  value={clearDataProductCategory}
                  onChange={handleClearDataProductCategoryChange}
                  sx={{
                    ...textFieldStyle,
                    width: '40vw',
                    minWidth: '215px',
                    maxWidth: '350px',
                  }}
                >
                  {categories?.dataProduct.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center gap-8">
            <ODACircle
              style={
                'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA3'
              }
              text={'Tilgjengelig data'}
            />
            <TextField
              required
              id="outlined-multiline-static"
              multiline
              rows={8}
              value={accessibleData}
              onChange={(e) => {
                setAccessibleData(e.target.value)
              }}
              name="accessibleData"
              label="Tilgjengelige data"
              size="small"
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
            <CustomWidthTooltip title={accessibleDataHelpText}>
              <HelpOutlineIcon
                sx={{
                  '@media screen and (max-width: 640px)': {
                    marginLeft: '200px',
                    marginTop: '-230px',
                    marginBottom: '11rem',
                  },
                  marginLeft: '-50px',
                  marginTop: '-175px',
                  zIndex: '1',
                  fontSize: 'medium',
                  '&:hover': { cursor: 'pointer' },
                }}
              />
            </CustomWidthTooltip>
          </div>

          {user.isAdmin.toString() === 'true' ? (
            <div className="flex flex-col sm:flex-row w-[80vw] sm:w-[65vw] items-center justify-center gap-8 mb-8">
              <div className="w-20 sm:w-36 md:w-40 lg:w-44 xl:w-48 "></div>

              <div className="flex flex-row items-center justify-center sm:justify-start w-[62vw] sm:w-[40vw] max-w-[600px]">
                <TextField
                  data-cy = "kategoriserTilgjengeligData"
                  select
                  required
                  label="Kategoriser tilgjengelig data"
                  name="Kategoriser tilgjengelig data"
                  size="small"
                  value={accessibleDataCategory}
                  onChange={handleAccessibleDataCategoryChange}
                  sx={{
                    ...textFieldStyle,
                    width: '40vw',
                    minWidth: '215px',
                    maxWidth: '350px',
                  }}
                >
                  {categories?.accessibleData.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center gap-8">
            <ODACircle
              style={
                'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA4'
              }
              text={'Definert handling'}
            />
            <TextField
              required
              id="outlined-multiline-static"
              multiline
              rows={8}
              name="definedAction"
              label="Definert handling"
              value={definedAction}
              onChange={(e) => {
                setDefinedAction(e.target.value)
              }}
              size="small"
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
            <CustomWidthTooltip title={definedActionHelpText}>
              <HelpOutlineIcon
                sx={{
                  '@media screen and (max-width: 640px)': {
                    marginLeft: '200px',
                    marginTop: '-230px',
                    marginBottom: '11rem',
                  },
                  marginLeft: '-50px',
                  marginTop: '-175px',
                  zIndex: '1',
                  fontSize: 'medium',
                  '&:hover': { cursor: 'pointer' },
                }}
              />
            </CustomWidthTooltip>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-4 mb-8">
          <Button
            variant="contained"
            onClick={() => {
              fillCategories()
              setSubmitDelete(true)
            }}
            type="submit"
            sx={{
              color: 'white',
              backgroundColor: '#0D264A',
              width: '200px',
              borderRadius: '45px',
              '&:hover': {
                backgroundColor: '#FF002F',
              },
            }}
          >
            Slett problem
          </Button>

          <Button
            variant="contained"
            onClick={handleSaveButton}
            type="submit"
            sx={{
              color: 'white',
              backgroundColor: '#0D264A',
              width: '200px',
              borderRadius: '45px',
              '&:hover': {
                backgroundColor: '#2BB728',
              },
            }}
          >
            Lagre endringer
          </Button>
        </div>
      </Box>

      <Snackbar open={showSuccessMessage} autoHideDuration={2000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          {submitDelete ? 'Problem slettet!' : 'Problem lagret!'}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => {
          setError(false)
        }}
      >
        <Alert
          onClose={() => {
            setError(false)
          }}
          severity="error"
          sx={{ width: '100%' }}
        >
          Det har skjedd en feil...
        </Alert>
      </Snackbar>

      <Dialog
        open={showConfirmDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Slett {title}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sletting av ODA-problem er permanent. Det er ikke mulig å reversere denne handlingen!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>kanseller</Button>
          <Button
            onClick={handleDelete}
            sx={{ '&:hover': { backgroundColor: '#FF002F', color: 'white' } }}
          >
            Slett
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showConfirmEditMessage}
        onClose={handleCancelChanges}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Lagre {title}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {user.isAdmin.toString() === 'true'
              ? 'Lagring av ODA-problem er permanent. Det er ikke mulig å reversere handlingen.'
              : 'Ved endring av ODA-problem må problemet bli godkjent av administrator på nytt. Dette vil også medføre at eventuelle abbonenter fjernes fra problemet.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelChanges}>kanseller</Button>
          <Button
            onClick={handleSaveChanges}
            sx={{ '&:hover': { backgroundColor: '#2BB728', color: 'white' } }}
          >
            Lagre endringer
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>
  )
}

export default EditProblem
