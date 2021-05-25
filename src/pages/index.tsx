import { GetServerSideProps } from 'next'
import styles from '../styles/Home.module.css'
import Select from '../components/select'

export interface Pref {
    prefCode: number
    prefName: string
} //RESAS-APIで取得する都道府県情報

export interface Prefs {
    result: Pref[]
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await fetch(
        `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
        {
            headers: { 'X-API-KEY': process.env.RESAS_API },
        },
    )
    const jsonData = await response.json()
    return {
        props: jsonData,
    }
}

const Home: React.FC<Prefs> = (props) => {
    return (
        <>
            <div
                style={{
                    textAlign: 'center',
                    height: '5vh',
                    lineHeight: '5vh',
                    fontSize: 'min(20px, 3vh)',
                    background: '#1a73e8',
                    color: '#fafafa',
                    boxShadow: '0px 1px 10px 2px rgba(0,0,0,0.5)',
                }}
            >
                都道府県別の総人口推移グラフ
            </div>
            <div className={styles.container}>
                <Select result={props.result} />
            </div>
        </>
    )
}

export default Home
