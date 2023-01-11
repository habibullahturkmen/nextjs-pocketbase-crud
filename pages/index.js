import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CRUD Task</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Navbar />

      <main className={styles.main}>
          <h1 className={styles.title}>
              CRUD Task built with <br/> <a href="https://nextjs.org">Next.js</a> and <a href="https://pocketbase.io">Pocketbase</a>
          </h1>
          <h6 className={styles.description}>You can register new users, login, add profile image 2x2, and change other user settings</h6>
      </main>

        <Footer />
    </div>
  )
}
