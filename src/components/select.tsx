import React, {useState, useEffect} from 'react';
import { ServerSideProps } from 'src/pages';
import Graph from './graph';

const Select: React.FC = (props: ServerSideProps) => {
    const [wrapColumns, setWrapColumns] = useState({gridTemplateColumns: `repeat(5, 1fr)`});
    const wrap = {display: 'grid'}

    useEffect(() => {
        function handleResize() {
            setWrapColumns({gridTemplateColumns: "repeat(" + String(Math.round(window.innerWidth / 140)) + ", 1fr)"});            
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    },[]);

    const handleChange = async(e) => {
        const response = await fetch('./api/resas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.target.id),
        })
        const data = await response.json().then(data => data);
        console.log(data);
    }

    return(
        <div>
            <div style={Object.assign(wrap, wrapColumns)}>
                {props.prefs.map(
                    (pref) => {
                        return(
                            <label style={{margin:"5px 20px"}} key={pref.prefName}>
                                <input type='checkbox' onChange={handleChange} id={pref.prefCode}/>
                                {pref.prefName}
                            </label>
                        );
                    }
                )}
            </div>
            <Graph/>
        </div>
    )
}

export default Select