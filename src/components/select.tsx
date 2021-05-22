import React, {useState, useEffect} from 'react';
import { ServerSideProps } from 'src/pages';

const Select: React.FC = (props: ServerSideProps) => {
    const [wrapColumns, setWrapColumns] = useState({gridTemplateColumns: `repeat(5, 1fr)`});
    const wrap = {display: 'grid'}

    useEffect(() => {
        function handleResize() {
            //console.log(Math.round(5.5))
            //setWidth(window.innerWidth / 100));
            //console.log(window.innerWidth, width);
            setWrapColumns({gridTemplateColumns: "repeat(" + String(Math.round(window.innerWidth / 150)) + ", 1fr)"});            
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    },[]);

    const hoge = async () => {
        const response = await fetch('./api/resas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(1),
        })
        const data = await response.json().then(data => data);
        console.log(data);
    }
    const handleChange = (e) => {
        console.log(e.target.id);
    }

    return(
        <div style={Object.assign(wrap, wrapColumns)}>
            {props.prefs.map(
                (pref) => {
                    return(
                        <label style={{margin:"0"}} key={pref.prefName}>
                            <input type='checkbox' onChange={handleChange} id={pref.prefCode}/>
                            {pref.prefName}
                        </label>
                    );
                }
            )}
        </div>
    )
}

export default Select