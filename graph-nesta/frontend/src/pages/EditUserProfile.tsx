import React, {useState} from 'react';
import Footer from "../components/Footer";
import Nav from "../components/Header";
import backIcon from "../images/arrow-left-solid.svg"
import {Link} from "react-router-dom";

function EditUserProfile() {

    const initialState = {
        municipalityState: "testkommune",
        mailState: "test@kommune.no",
        phoneNumberState: "12345678"
    }
    // The state of all inputfields
    const [state, setState] = useState(initialState);

    // The saved value of the inputfield
    const handleInputChange = (e: any) => {
        const { name, value } = e.target.value;
        setState({
            ...state,
            [name]: value,
        });
    };


    return (
        <div className="UserProfile ">
            <Nav />
            <div className={'UserProfilePage bg-background text-text flex flex-col place-items-center pb-20'}>
                <div className={'heading-banner grid grid-cols-3 items-center'}>
                    <Link to={'/MinProfil'}>
                        <img className={'h-10 w-10'} src={backIcon} alt={'go back button icon'}/>
                    </Link>
                    <h1 className={'heading text-5xl mt-5 pb-8 '}>
                        Rediger min Profil
                    </h1>
                </div>

                <h2 className={'subheading text-xl underline flex flex-row space-x-4 mb-2'}>
                    <p> Kontaktinformasjon</p>
                </h2>
                <div className={'userInformation'}>
                    <form className={'form flex flex-col items-end'}>
                    <div className={'municiplaity-input pb-3'}>
                        <label htmlFor={'belongsTo'}>Tilhører: </label>
                        <input type={'text'} name={'municipalityState'} onChange={handleInputChange} placeholder={state.municipalityState}/>
                    </div>
                    <div className={'mail-input pb-3'}>
                        <label htmlFor={'email'}>Epost: </label>
                        <input id={'emial'} name={'mailState'} onChange={handleInputChange} type={'email'} placeholder={state.mailState}/>
                    </div>
                    <div className={'number-input pb-6'}>
                        <label htmlFor="phone">Telefonnummer: </label>
                        <input type={'text'} inputMode={"numeric"} pattern="[0-9]{8}" name={'phoneNumberState'} maxLength={8} onChange={handleInputChange} placeholder={state.phoneNumberState} className={'phone'} />
                    </div>
                    <button type={"submit"} className={'myProblemsButton bg-buttonDark hover:bg-buttonHover text-white rounded-full h-9 w-40 self-center'} >
                        Lagre endringer
                    </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditUserProfile;