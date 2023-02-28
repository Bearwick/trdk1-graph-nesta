import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Header(){

    const[show, setShow] = useState(false);
    const[login,] = useState(false);

    const onChange = () => {
        setShow(!show)
    }

    return(
        
        <nav className="h-14 grid grid-cols-3 gap-4 bg-white sticky top-0 z-50 drop-shadow-xl">

            <Link to="/Hjem" className="col-span-2 text-3xl text-left ml-20 w-48 mt-2"><p className="">Graph Nesta</p></Link>

                 <div className="text-lg">

                    <div onClick={onChange} className="cursor-pointer mt-2 z-20">{!show ? <MenuIcon sx={{ fontSize: "2.5rem"}} /> : <CloseIcon sx={{ fontSize: "2.5rem"}}/>}</div>

                    {show ?
                        (   
                            <div className="bg-white w-1/2 rounded-md ml-8" onClick={(e) => {e.stopPropagation()}}>
                                {login ? <Link to="/MinProfil"><div className="text-right pr-5 hover:bg-buttonDark hover:text-white">Min profil</div></Link>:<Link to="/LoggInn"><div className="text-right pr-5 hover:bg-buttonDark hover:text-white">Logg inn</div></Link>}
                                <hr />
                                <Link to="/MineUtfordringer"><div className="text-right pr-5 hover:bg-buttonDark hover:text-white">Mine utfordringer</div></Link>
                                <hr />
                                <Link to="/NyUtfordring"><div className="text-right pr-5 hover:bg-buttonDark hover:text-white">Ny utfordring</div></Link>
                                <hr />
                                <Link to="/Søk"><div className="text-right pr-5 hover:bg-buttonDark hover:text-white">Søk</div></Link>
                            </div>
                        ):
                            
                        (
                            null
                        )
                    }
                </div>
        </nav>
    )
}

export default Header;