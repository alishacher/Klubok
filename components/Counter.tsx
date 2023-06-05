import React from "react";

const Counter = () => {
    return (
        <>
        <div className='counter-wrapper'>
            <button className='counter-wrapper__button'>-</button>
            <span className='counter-wrapper__text'>0</span>
            <button className='counter-wrapper__button'>+</button>
        </div>
            <style jsx>
            {`
                .counter-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                }
        
                .counter-wrapper__button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                    padding: 1rem 2rem;
                    
                    background: #ececec;
                    border-radius: 0.125rem;
                }
        
                counter-wrapper__text {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                    padding: 1rem 2rem;
                }
            `}
            </style>
        </>
    );
}

export default Counter;