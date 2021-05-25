import { Chart } from 'react-google-charts'
import React, { useEffect, useState } from 'react'

interface Props {
    prefData: Set<number>
}

let displayPrefName = new Set<number>()

const Graph: React.FC<Props> = (props) => {
    const graphStyle: React.CSSProperties = {
        width: '100%',
        height: '70vw',
        maxHeight: '600px',
        position: 'relative',
        display: 'inline-block',
    }
    const textStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        textAlign: 'center',
        color: 'gray',
        fontSize: '20px',
    }

    const data: any[][] = [...Array(47)].map((_, i) => [String(i + 1)])

    const year:any[] = [
        [
            { type: 'date', label: 'year' },
            new Date(1960, 1),
            new Date(1965, 1),
            new Date(1970, 1),
            new Date(1975, 1),
            new Date(1980, 1),
            new Date(1985, 1),
            new Date(1990, 1),
            new Date(1995, 1),
            new Date(2000, 1),
            new Date(2005, 1),
            new Date(2010, 1),
            new Date(2015, 1),
            new Date(2020, 1),
            new Date(2025, 1),
            new Date(2030, 1),
            new Date(2035, 1),
            new Date(2040, 1),
            new Date(2045, 1),
        ],
    ]

    //@ts-ignore
    const transpose = (a) => a[0].map((_, c) => a.map((r) => r[c])) // チャートに入れるために転置する関数

    const difference = (x: Set<number>, y: Set<number>) =>
        new Set([...x].filter((e) => !y.has(e)))

    const [displayData, setDisplayData] = useState(year)

    useEffect(() => {
        function reloadData() {
            const addedPref = difference(props.prefData, displayPrefName)
            if (addedPref) {
                addedPref.forEach(async (pref: number) => {
                    if (data[pref - 1].length == 1) {
                        const result = await fetch('./api/resas', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(pref),
                        })
                        const prefData = await result
                            .json()
                            .then(
                                (population) => population.result.data[0].data,
                            )
                        Array.prototype.push.apply(
                            data[pref - 1],
                            prefData.map((data: any) => data.value),
                        )
                    }

                    setDisplayData([...displayData, data[pref - 1]])
                })
            }
            const removedPref = difference(displayPrefName, props.prefData)
            if (removedPref) {
                removedPref.forEach((pref: number) => {
                    setDisplayData(
                        displayData.filter((data) => data[0] != pref),
                    )
                })
            }
            displayPrefName = new Set<number>([...props.prefData])
        }
        reloadData()
    }, [props])

    if (displayData.length > 1) {
        const tsDisplayData = transpose(displayData)
        return (
            <div style={graphStyle}>
                <Chart
                    width="100%"
                    height="100%"
                    chartType="LineChart"
                    loader={<div style={textStyle}>Loading Chart</div>}
                    data={tsDisplayData}
                    options={{
                        hAxis: {
                            title: '年',
                        },
                        vAxis: {
                            title: '人口',
                        },
                    }}
                />
            </div>
        )
    } else {
        return (
            <div style={graphStyle}>
                <div style={textStyle}>データが選択されていません</div>
            </div>
        )
    }
}

export default Graph
