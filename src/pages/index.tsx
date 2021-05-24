import { GetServerSideProps } from 'next'
import styles from '../styles/Home.module.css'
import Select from '../components/select'

export interface Prefs {
    prefCode: string
    prefName: string
}

interface ServerSideProps {
    message: null
    result: Prefs[]
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

const Home: React.FC<ServerSideProps> = (result) => {
    return (
        <div className={styles.container}>
            <Select prefs={result.result} />
        </div>
    )
}

export default Home
