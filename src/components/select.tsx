import React, { useState, useEffect } from 'react'
import { Prefs } from '../pages/index'
import Graph from './graph'
import styles from './Checkbox.module.css'

interface Props {
    prefs: Prefs[]
}

const Select: React.FC<Props> = (props) => {
    const [wrapColumns, setWrapColumns] = useState<React.CSSProperties>({
        gridTemplateColumns: `repeat(5, 1fr)`,
    }) // レスポンシブ用
    const [prefData, setPrefData] = useState(new Set<number>([]))
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const prefid = Number(e.target.id)
        if (e.target.checked) {
            setPrefData((prefData) => new Set(prefData.add(prefid))) // チェックされたら追加
        } else {
            prefData.delete(prefid)
            setPrefData(
                (prefData) =>
                    new Set<number>(
                        [...prefData].filter((id: number) => id !== prefid),
                    ),
            ) // チェックを外されたら削除
        }
    }

    return (
        <div>
            <div style={Object.assign(wrap, wrapColumns)}>
                {props.prefs.map((pref) => {
                    return (
                        <label
                            style={{ margin: '5px 2px', userSelect: 'none' }}
                            key={pref.prefName}
                            className={`${styles.checkbox} ${styles.inputCheckbox}`}
                        >
                            <input
                                type="checkbox"
                                onChange={handleChange}
                                id={pref.prefCode}
                            />
                            {pref.prefName}
                            <div className={styles.checkboxIndicator}></div>
                        </label>
                    )
                })}
            </div>
            <Graph prefData={prefData} />
        </div>
    )
}

export default Select
