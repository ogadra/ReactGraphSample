import React, { useState, useEffect } from 'react'
import { Pref, Prefs } from '../pages/index'
import Graph from './graph'
import styles from './Checkbox.module.css'
import addData from './addData'

const Select: React.FC<Prefs> = (props) => {
    const [wrapColumns, setWrapColumns] = useState<React.CSSProperties>({
        gridTemplateColumns: `repeat(5, 1fr)`,
    }) // レスポンシブ用

    const [displayData, setDisplayData] = useState<Record<string, number[]>>()
    const wrap: React.CSSProperties = {
        display: 'grid',
        width: '100%',
        position: 'relative',
        marginTop: '10px',
    }

    useEffect(() => {
        // 画面幅が変更された場合、横に並べるグリッド項目数を変化させる
        function handleResize() {
            setWrapColumns({
                gridTemplateColumns:
                    'repeat(' +
                    String(Math.round(window.innerWidth / 120)) +
                    ', 1fr)',
            })
        }
        window.addEventListener('resize', handleResize)
        handleResize() // 初回読み込み時処理
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const prefId = Number(e.target.id)
        const prefName = String(e.target.value)
        if (e.target.checked) {
            await addData(prefId).then((prefData) => {
                if (prefData.length > 1) {
                    setDisplayData({ ...displayData, [prefName]: prefData })
                }
            })
            // チェックされたら追加
        } else {
            const newSetDisplayData = { ...displayData }
            delete newSetDisplayData[prefName]
            setDisplayData(newSetDisplayData)
            // 外されたら削除
        }
    }

    return (
        <div>
            <div style={Object.assign(wrap, wrapColumns)}>
                {props.result.map((pref: Pref) => {
                    return (
                        <label
                            style={{ margin: '5px 2px', userSelect: 'none' }}
                            key={pref.prefName}
                            className={`${styles.checkbox} ${styles.inputCheckbox}`}
                        >
                            <input
                                type="checkbox"
                                onChange={handleChange}
                                id={String(pref.prefCode)}
                                value={pref.prefName}
                            />
                            {pref.prefName}
                            <div className={styles.checkboxIndicator}></div>
                        </label>
                    )
                })}
            </div>
            <Graph displayData={displayData} />
        </div>
    )
}

export default Select
