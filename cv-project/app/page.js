import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: 'Welcome on my CV page'
}

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Home Page</h1>
      <Link href="/registration">Register</Link>
      <Link href="/login">Log in</Link>
    </main>
  )
}
