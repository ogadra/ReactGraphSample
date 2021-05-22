import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Select from '../components/select'

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
          <Select/>
        </div>
    )
}

export default Home