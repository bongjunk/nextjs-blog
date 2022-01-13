import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import styles from '../components/layout.module.css'
import Link from 'next/link'


export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Hi, my name is bongjun !]</p>
        <p>
          (This is a sample website - you'll be building a site like this on {' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <div className={styles.backToHome}>
            <Link href="./posts/first-post">
                <a>← Back to FirstPost</a>
            </Link>
        </div>
      </section>
    </Layout>
  );
}