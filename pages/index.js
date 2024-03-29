import Head from 'next/head';
import Image from 'next/image';
import DataTable from '../components/Table';
import styles from '../styles/Home.module.css';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Rental App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="shortcut icon" href="/Mi-logo.svg" type="image/x-icon" />
      </Head>

      <main >
        <DataTable />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://portfolio-mahmoodulislam.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{' '}
          <span className={styles.logo}>
            <Image src="/Mi-logo.svg" alt="Mahmood-Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
