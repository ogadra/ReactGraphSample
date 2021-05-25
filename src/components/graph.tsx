import { Chart } from 'react-google-charts'
import React, { useEffect, useState } from 'react'
import { Pref } from '../pages/index'

interface Props {
    prefData: Set<Pref>
}

let displayPrefName = new Set<Pref>()

const Graph: React.FC<Props> = (props) => {
    const graphStyle: React.CSSProperties = {
        //グラフ表示領域の親要素に適用
        width: '100%',
        height: '70vw',
        maxHeight: '600px',
        position: 'relative',
        display: 'inline-block',
    }
    const textStyle: React.CSSProperties = {
        //グラフ代替のテキスト要素に適用
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        textAlign: 'center',
        color: 'gray',
        fontSize: '20px',
    }

    const data: any[][] = [...Array(47)].map((_, i) => [String(i + 1)]) // 都道府県毎の人口データ

    const year: any[] = [
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

    const difference = (x: Set<Pref>, y: Set<Pref>) =>
        new Set([...x].filter((e) => !y.has(e)))

    const [displayData, setDisplayData] = useState(year) // グラフにセットする配列

    useEffect(() => {
        function reloadData() {
            const addedPref = difference(props.prefData, displayPrefName) // 追加する県
            if (addedPref) {
                addedPref.forEach(async (pref: Pref) => {
                    if (data[pref.prefCode - 1].length == 1) {
                        // もしデータが無ければ新規取得する
                        const result = await fetch('./api/resas', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(pref.prefCode),
                        })
                        const prefData = await result
                            .json()
                            .then(
                                (population) => population.result.data[0].data,
                            )
                        data[pref.prefCode - 1] = [pref.prefName].concat(
                            prefData.map((data: any) => data.value),
                        ) // [県名, data1, data2 ... dataN]の形にする
                    }

                    setDisplayData([...displayData, data[pref.prefCode - 1]])
                })
            }
            const removedPref = difference(displayPrefName, props.prefData) // 削除する県
            if (removedPref) {
                removedPref.forEach((pref: Pref) => {
                    setDisplayData(
                        displayData.filter((data) => data[0] != pref.prefName),
                    )
                })
            }
            displayPrefName = new Set<Pref>([...props.prefData])
        }
        reloadData()
    }, [props])

    if (displayData.length > 1) {
        // 県が選択されている場合
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
                        animation: {
                            startup: true,
                            easing: 'in',
                            duration: 100,
                        },
                    }}
                />
            </div>
        )
    } else {
        // 県が選択されていない場合
        return (
            <div style={graphStyle}>
                <div style={textStyle}>データが選択されていません</div>
            </div>
        )
    }
}

export default Graph
