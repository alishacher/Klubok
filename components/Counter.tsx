import React, {useState} from "react";

const Counter = (props) => {
    const {counterInit} = props;
    const [counter, setCounter] = useState<number>(counterInit);

    const handleReset = () => {
        setCounter(counterInit);
    }

    const handleAdd = () => {
        setCounter(prevState => ++prevState);
    }

    const handleRemove = () => {
        if (counter > 0) {
            setCounter(prevState => --prevState);
        }
    }

    return (
        <>
        <div className='counter-wrapper'>
            <button
                className='counter-wrapper__button'
                onClick={handleRemove}
            >-</button>
            <button
                className='counter-wrapper__reset'
                onClick={handleReset}
            >{counter}</button>
            <button
                className='counter-wrapper__button'
                onClick={handleAdd}
            >+</button>
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
                    border: 0;
                    border-radius: 0.125rem;
                }
        
                counter-wrapper__reset {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                    padding: 1rem 2rem;
                    
                    background: transparent;
                    border: 0;
                }
            `}
            </style>
        </>
    );
}

export default Counter;