import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Select from '../components/select'
import { GetServerSideProps } from 'next'

interface Prefs{
  prefCode: number;
  prefName: string;
}

export interface ServerSideProps{
  message: null;
  result: Prefs[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  
  const response = await fetch(`https://opendata.resas-portal.go.jp/api/v1/prefectures`, {
    headers: {'X-API-KEY': process.env.RESAS_API}
  });
  const jsonData = await response.json();
  return {
    props: jsonData,
  };
}

const Home: React.FC = (result: ServerSideProps) => {

  return (
    <div className={styles.container}>
      <Select prefs={result.result}/>
    </div>
  )
}

export default Home