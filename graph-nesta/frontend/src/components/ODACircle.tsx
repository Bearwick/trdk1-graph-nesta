import React from 'react';

function ODACircle(props: { style: string, text: string }) {
     
    return (
       <div className={ props.style } >
            <div className="text-white">{props.text}</div>
        </div>
    );
}

export default ODACircle;