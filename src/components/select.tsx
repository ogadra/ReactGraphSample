import React, {useState, useEffect} from 'react';
import { ServerSideProps } from 'src/pages';
import Graph from './graph';

const Select: React.FC = (props: ServerSideProps) => {
    const [wrapColumns, setWrapColumns] = useState({gridTemplateColumns: `repeat(5, 1fr)`}); // レスポンシブ用
    const [prefData, setPrefData] = useState<number[]>([]);
    const wrap = {display: 'grid'}

    useEffect(() => {
        // 画面幅が変更された場合、横に並べるグリッド項目数を変化させる
        function handleResize() {
            setWrapColumns({gridTemplateColumns: "repeat(" + String(Math.round(window.innerWidth / 140)) + ", 1fr)"});            
        }
        window.addEventListener('resize', handleResize);
        handleResize(); // 初回読み込み時処理
        return () => window.removeEventListener('resize', handleResize);
    },[]);

    const handleChange = (e) => {
        if (e.target.checked){
            // チェックされたら追加
            setPrefData([...prefData, e.target.id]);
        } else {
            setPrefData(prefData.filter(id=> id != e.target.id)); // チェックを外されたら削除
        }
    }

    return(
        <div style={{marginTop: '250px'}}>
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
            <Graph prefData={prefData}/>
        </div>
    )
}

export default Select