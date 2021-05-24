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
    const data: any[][] = [...Array(47)].map((_, i) => [String(i + 1)])

    const year = [
        [
            'year',
            1960,
            1965,
            1970,
            1975,
            1980,
            1985,
            1990,
            1995,
            2000,
            2005,
            2010,
            2015,
            2020,
            2025,
            2030,
            2035,
            2040,
            2045,
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
                    loader={<div>Loading Chart</div>}
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
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translateY(-50%) translateX(-50%)',
                    }}
                >
                    データが選択されていません
                </div>
            </div>
        )
    }
}

export default Graph
