import { useState, useEffect } from 'react';

function Clock(props){

    const [date, setDate] = useState(new Date());

    useEffect(()=>{
        let timerID = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return ()=>{ // clean up step (runs before the component is "unmounted")
            clearInterval(timerID); 
        };
       
    }, []); // having an empty array ensures that this effect only runs after the component is first rendered

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {date.toLocaleTimeString()}.</h2>
        </div>
    );
}

export default Clock;