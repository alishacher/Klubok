import React, {useEffect, useState} from "react";
import styles from '@/styles/Layout.module.scss';

const Counter = (props) => {
    const { counterInit, postID } = props;
    const [counter, setCounter] = useState<number>(counterInit);

    const handleReset = () => {
        setCounter(0);
    }

    const handleAdd = () => {
        setCounter(prevState => ++prevState);
    }

    const handleRemove = () => {
        if (counter > 0) {
            setCounter(prevState => --prevState);
        }
    }

    const updateCounterData = async () => {
        try {
            console.log(counter);
            const body = { counter: counter };
            await fetch(`/api/counter/${postID}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        updateCounterData();
    }, [counter]);

    return (
        <div className={styles.counter_wrapper}>
            <div className={styles.counter_controls}>
                <button
                    className='counter-wrapper__button'
                    onClick={handleRemove}
                    disabled={!counter}
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
        </div>
    );
}

export default Counter;
