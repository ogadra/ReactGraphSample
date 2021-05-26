import { Chart } from 'react-google-charts'
import React from 'react'

interface Props {
    displayData: Record<string, number[]> | undefined
}

const Graph: React.FC<Props> = (props) => {
    const graphStyle: React.CSSProperties = {
        //グラフ表示領域の親要素に適用
        width: '100%',
        height: '80vw',
        maxHeight: '700px',
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

    //@ts-ignore
    const transpose = (a) => a[0].map((_, c) => a.map((r) => r[c])) // チャートに入れるために転置する関数

    const displayData: Record<string, number[]> | undefined = props.displayData

    if (displayData != null && Object.keys(displayData).length >= 1) {
        // 県が選択されている場合
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
        const displayDataArray: any[] = []
        Object.keys(displayData).map(function (prefId) {
            displayDataArray.push([prefId, ...displayData[prefId]])
        })

        const displayDataWithAxis = year.concat(displayDataArray)
        const tsDisplayData = transpose(displayDataWithAxis)

        return (
            <div style={graphStyle} data-testid="graphArea">
                <Chart
                    height={'100%'}
                    width={'100%'}
                    chartType="LineChart"
                    loader={<div style={textStyle}>ロード中</div>}
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
                        chartArea:{
                            width:'50%',
                            
                        }
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
