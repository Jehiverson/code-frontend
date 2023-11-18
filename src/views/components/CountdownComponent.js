import React, { useState, useEffect, useRef } from 'react';

const CountdownComponent = ({ onTimeout, completeTime, restart = false, totalTime = 900, quizCompleted }) => {
    const [time, setTime] = useState(0); // 15 minutos en segundos
    // const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (onTimeout) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        // setRunning(false);
                        clearInterval(intervalRef.current);
                        completeTime(); // Llamamos a la función cuando el tiempo llega a cero
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [onTimeout]);

    useEffect(() => {
        setTime(totalTime)
    }, [totalTime])

    useEffect(() => {
        if (restart) {
            if (time < totalTime) {
                setTime(totalTime)
                clearInterval(intervalRef.current);
            }
        }
    }, [restart])

    return (
        <div><h4>{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</h4></div>
    );
};

export default CountdownComponent;
