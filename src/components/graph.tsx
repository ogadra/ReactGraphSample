import Chart from 'react-google-charts';
import React, { useEffect, useState } from 'react';

interface Population{
    year: number;
    value: number;
}
interface Data{
    label: string;
    data: Population[];
}

const Graph: React.FC = (props: number[]) => {
    const [data, setData] = useState<Data[]>(Array(47));
    // const fetchData = async(id) => {
    //     var responce = await fetch('./api/resas', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(id),
    //     })
    //     const prefData = await response.json().then(population => population);
    //     //setData(...data, {id}:data.result.data[0]);
    //     console.log(prefData);
    // }

    useEffect(() => {
        function fetchData(){
            props.prefData.map(async(pref) => {
                console.log(pref);
                const result = await fetch('./api/resas', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(pref),
                })
                const prefData = await result.json().then(population => population);

                data[pref-1] = prefData.result.data[0]
                setData(data);
            })

        //     const result = await fetch('./api/resas', {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify(1),
        //     })
        //     const prefData = await result.json().then(population => population);
        //     console.log(prefData);
        }
        fetchData();
        console.log(data);
    },[props])
    
    return(
        <div>
            <Chart width={400} height={300} chartType="ColumnChart" loader={<div>Loading Chart</div>} data={[
                    ['City', '2010 Population', '2000 Population'],
                    ['New York City, NY', 8175000, 8008000],
                    ['Los Angeles, CA', 3792000, 3694000],
                    ['Chicago, IL', 2695000, 2896000],
                    ['Houston, TX', 2099000, 1953000],
                    ['Philadelphia, PA', 1526000, 1517000],
                ]}
    options={{
      title: 'Population of Largest U.S. Cities',
      chartArea: { width: '30%' },
      hAxis: {
        title: 'Total Population',
        minValue: 0,
      },
      vAxis: {
        title: 'City',
      },
    }}
    legendToggle
  />
  
        </div>
    )
}

export default Graph