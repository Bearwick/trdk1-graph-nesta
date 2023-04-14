import Button from '@mui/material/Button';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from '../components/Header';
import ODACircle from '../components/ODACircle';
import PDFdownload from '../components/PDFdownload';
import { ChallengeContext } from '../globalState/ChallengeContext';

function Home() {
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
        }
      }      
    },[navigate, setUser, user.isLoggedIn]);


    return (
      <div className="text-center flex flex-col min-h-screen">

        <Header />
  
        <div className="bg-background flex flex-col items-center">
  
          <div className="text-white bg-footer px-5 py-3 w-full items-center justify-center flex flex-col">
            <div>
            <h1 className="text-4xl mb-5">Velkommen!</h1>
            <p className="max-w-2xl text-xl sm:text-2xl mb-1">Har du en utfordring i din arbeidsoppgave?</p>
            <p className="max-w-2xl text-sm sm:text-base mb-5">Alle norske kommuner har samme lovpålagte ansvarsområder. Det betyr at en annen kommune kanskje har eller har hatt samme utfordring! Søk etter din utfordring, kanskje er den allerede løst eller noen arbeider med en løsning. Hvis ikke, opprett en ny utfordring! </p>
            </div>
            
          <div className="flex flex-row gap-4 md:gap-2 mb-2">
          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            <Link to="/Søk"><Button variant="contained" sx={{ color: "white", backgroundColor: "#0D264A", width: "150px", borderRadius: "45px", border: "1px solid white", '&:hover': {backgroundColor: '#3d3f6b',}}}>
                Søk</Button></Link>
          <Link to="/NyUtfordring"><Button variant="contained" sx={{ color: "white", backgroundColor: "#0D264A", width: "200px", borderRadius: "45px", border: "1px solid white", '&:hover': {backgroundColor: '#3d3f6b',}}}>
          Nytt problem</Button></Link>
          </div>
          
          {user.isAdmin ? <div className="flex flex-col md:flex-row gap-4 md:gap-2"><Link to="/GodkjennProblem"><Button variant="contained" sx={{ color: "white", backgroundColor: "#0D264A", width: "200px", borderRadius: "45px", border: "1px solid white", '&:hover': {backgroundColor: '#3d3f6b',}}}>
          Godkjenn problem</Button></Link>  <Link to="/RegistrerBruker"><Button variant="contained" sx={{ color: "white", backgroundColor: "#0D264A", width: "200px", borderRadius: "45px", border: "1px solid white", '&:hover': {backgroundColor: '#3d3f6b',}}}>
          Ny bruker</Button></Link></div>: null}
        
          </div>
          
          </div>

          <div>
           
            
          <div className="flex flex-row h-12 w-[80vw] sm:w-[65vw] items-center mt-5">
          <div className="w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48">
          </div>
            
            <div className="flex flex-col mt-5 pl-4 sm:pl-8 gap-1">
              <h1 className="text-3xl sm:text-4xl text-text  underline underline-offset2 whitespace-nowrap">Om ODA-metoden</h1>
              <PDFdownload />
            </div>
          </div>



          <div className="flex flex-row h-12 w-[80vw] sm:w-[65vw] items-center mt-5">
          <div className="w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48">
          </div>

          <div className="flex flex-row items-center gap-2 pl-4 sm:pl-8">
          <ODACircle style={"rounded-full flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 bg-ODA1"} text={""}/>
          <ODACircle style={"rounded-full flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 bg-ODA2"} text={""}/>
          <ODACircle style={"rounded-full flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 bg-ODA3"} text={""}/>
          <ODACircle style={"rounded-full flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 bg-ODA4"} text={""}/>
          </div>
          </div>

          <div className="text-xs md:text-base">
          <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center">
            <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 bg-ODA1 text-xs sm:text-base"} text={"Et spesifikt problem"}/>
            <div className="flex flex-col gap-2 w-[62vw] sm:w-[45vw] h-100% text-text text-left pl-4 sm:pl-8">
              <p className="font-bold">Hovedpoeng: Det er ytterst viktig å bevege seg fra større, makronivå problemer til noe spesifikt og gjennomførbart.</p>
              <p>Virksomheter i den offentlige sektoren håndterer mange store problemer, men enkelte av dem er for bredt definert til å ha en umiddelbar løsning. For eksempel så er problemstillingen: “Det finnes tilfeller av moderne slaveri i byen” for vag.</p>
              <p>Etter litt betenkning kan problemstillingen omformuleres til noe mer spesifikt, slik som “Vi vet ikke hvilke av de regulerte bedriftene som har større sannsynlighet for å utnytte offer for moderne slaveri.”</p>
            </div>
          </div>

          <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center ">
            <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 bg-ODA2 text-xs sm:text-base"} text={"Et tydelig dataprodukt"}/>
            <div className="flex flex-col gap-2 w-[62vw] sm:w-[45vw] h-100% text-text text-left pl-4 sm:pl-8">
              <p className="font-bold">Hovedspørsmål: Hvilken informasjon må en person ha tilgang til på skjermen for å kunne utføre handlingene som ble bestemt i det forrige steget?</p>
              <p>Det er usannsynlig at de som utfører tiltaket (f.eks førstelinjearbeidere eller kundeansvarlige) vil be om et regneark eller rådata. I stedet vil de ofte ha informasjonen lagt fram på en mer forståelig måte som gir faktisk innsikt- det er det vi mener med et &#39;dataprodukt&#39;.</p>
              <p>Et &#39;dataprodukt&#39; kan være et kart, varmekart, prioritert liste, varselsystem, et dashboard, en visualisering og så videre.</p>
            </div>
          </div>

          <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center ">
            <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 bg-ODA3 text-xs sm:text-base"} text={"Tilgjengelig data"}/>
            <div className="flex flex-col gap-2 w-[62vw] sm:w-[45vw] h-100% text-text text-left pl-4 sm:pl-8">
              <p className="font-bold">hovedspørsmål: Hvilke data trenger du for å lage dataproduktet, eksisterer de, har du tilgang til dem, og kan de brukes?</p>
              <p>Data kan komme fra flere forskjellige kilder, slik som:<br/>
              • Åpne data (f.eks. data.gov.uk)<br/>
              • Offentlig sektor<br/>
              • Bedrifter og tredjesektor (frivillige organisasjoner)<br/>
              • Allmennheten</p>
              <p>Du kan bruke en enkel mal slik som den på neste lysbilde til idémyldring om hvilke datasett som kan hentes fra de forskjellige kildene.</p>
            </div>
          </div>

          <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center ">
            <ODACircle style={"rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 bg-ODA4 text-xs sm:text-base"} text={"En definert handling"}/>
            <div className="w-[62vw] sm:w-[45vw] h-100% text-text text-left pl-4 sm:pl-8">
              <p className="font-bold">Hovedspørsmål: Hva ville du gjort annerledes om du hadde all informasjonen du trengte om ditt spesifikke problem?</p>
              <p>For å være tydelig, dataanalyseprosessen er ikke tiltaket. Det er viktig å identifisere praktiske løsninger og tiltak som er innenfor din kontroll å forandre. For eksempel så kan ikke virksomheter &#39;løse&#39; bostedløshet på egenhånd - men du kan kanskje ta for deg et spesifikt aspekt i ditt miljø.</p>
              <p>Finn ut nøyaktig hvem som skal gjøre noe, hvor og når det skal gjøres.</p>
            </div>
          </div>
          </div>

          </div>

        </div>

        <Footer />
 
      </div>
    );
  }
  
  export default Home;