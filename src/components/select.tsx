import React from 'react';

const Select: React.FC = () => {
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

    return(
        <ul>
            <li onClick={hoge}>hogefuga</li>
        </ul>
    )
}

export default Select