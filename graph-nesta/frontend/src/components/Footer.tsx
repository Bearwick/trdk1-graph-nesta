import React from 'react';

function Footer() {
    const backToTopfunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // for safari, chrome, edge, osv.
    }

    return (
       <div className='footerbox bg-footer h-20 place-items-center grid grid-cols-3 bottom-0 absolute bottom-0 min-w-full' >
           <div>
            <button className={'toTopButton bg-buttonDark hover:bg-buttonHover text-white rounded-lg w-40 h-8'} onClick={backToTopfunction}>
                <p> Tilbake til toppen </p>
            </button>
           </div>
            <p className={'text-white'}> Laget av snille gutter fra NTNU ♥️ </p>
       </div>
    );
}

export default Footer;
