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
        
        <div className="h-14 grid grid-cols-2 gap-4 place-content-between bg-white sticky top-0 z-50 drop-shadow-xl pl-20 pr-10">

            <Link to="/Hjem" className="text-3xl text-left w-48 mt-2"><p className="">Graph Nesta</p></Link>

            <section className="text-base">

                    {show ?
                        (   
                            <section className="flex flex-col items-end" >
                            <div  className="mt-2 z-20 "> <Link to={""} onClick={onChange}><CloseIcon onClick={onChange} sx={{ fontSize: "2.5rem", cursor: "pointer"}}/></Link>
                            <div className="bg-menuBackground w-36 ml-[-6.5rem]  rounded-b mt-2 z-20">
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
                            </section>
                        ):
                       
                        (
                            <section className="flex flex-col items-end" >
                            <section className="mt-2 z-20 "> 
                            <Link to={""} onClick={onChange}><MenuIcon onClick={onChange}  sx={{ fontSize: "2.5rem", cursor: "pointer"}} /></Link>
                            </section>
                            </section>
                        )
                    }
            </section>
        </div>
    )
}

export default Header;