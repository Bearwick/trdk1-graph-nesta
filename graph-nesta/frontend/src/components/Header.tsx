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
        
        <div className="h-14 grid grid-cols-2 gap-4 place-content-between bg-white sticky top-0 z-50 drop-shadow-xl">

            <Link to="/Hjem" className="text-3xl text-left ml-20  w-48 mt-2"><p className="">Graph Nesta</p></Link>

            <div className="text-base">

                    {show ?
                        (   
                            <div className="flex flex-col items-end" >
                            <div  className="mt-2 mr-[-2rem]  z-20 "> <CloseIcon onClick={onChange} sx={{ fontSize: "2.5rem", cursor: "pointer"}}/>
                            <div className="bg-menuBackground w-36 mr-[7rem] rounded-b mt-2 z-20">
                                <hr />
                                {login ? <Link to="/MinProfil"><div className="text-right pr-1 hover:bg-buttonDark hover:text-white">Min profil</div></Link>:<Link to="/LoggInn"><div className="text-right pr-1 hover:bg-buttonDark hover:text-white">Logg inn</div></Link>}
                                <hr />
                                <Link to="/MineUtfordringer"><div className="text-right pr-1 hover:bg-buttonDark hover:text-white whitespace-nowrap">Mine utfordringer</div></Link>
                                <hr />
                                <Link to="/NyUtfordring"><div className="text-right pr-1 hover:bg-buttonDark hover:text-white">Ny utfordring</div></Link>
                                <hr />
                                <Link to="/Søk"><div className="text-right pr-1 hover:bg-buttonDark hover:rounded-b hover:text-white">Søk</div></Link>
                            </div>
                            </div>
                            </div>
                        ):
                       
                        (
                            <div className="flex flex-col items-end" >
                            <div className="mt-2 z-20 mr-[5rem] "> 
                            <MenuIcon onClick={onChange}  sx={{ fontSize: "2.5rem", cursor: "pointer"}} />
                            </div>
                            </div>
                        )
                    }
            </div>
        </div>
    )
}

export default Header;