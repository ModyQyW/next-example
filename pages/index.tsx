import type { NextPage } from 'next';
import { memo } from 'react';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { Container } from '@mui/material';

const Home: NextPage = memo(() => (
  <Container
    maxWidth={false}
    disableGutters
    sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
  >
    <main className="flex flex-auto flex-col items-center justify-center">
      <h1 className="m-0 text-[4rem] text-center">
        Welcome to{' '}
        <a
          className="text-[#0070f3] no-underline hover:underline focus:underline active:underline"
          href="https://nextjs.org"
        >
          Next.js!
        </a>
      </h1>

      <p className="text-center my-16 text-[1.5rem] leading-normal">
        Get started by editing{' '}
        <code className="p-3 font-mono text-[1.1rem] bg-[#fafafa] rounded">pages/index.tsx</code>
      </p>

      <div className="flex flex-wrap items-center justify-center max-w-[800px]">
        <a href="https://nextjs.org/docs" className={styles.card}>
          <h2>Documentation &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://nextjs.org/learn" className={styles.card}>
          <h2>Learn &rarr;</h2>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
          <h2>Examples &rarr;</h2>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h2>Deploy &rarr;</h2>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </a>
      </div>
    </main>

    <footer className="flex flex-none items-center justify-center py-4 border-0 border-t border-solid border-[#eaeaea]">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-grow items-center justify-center"
      >
        Powered by{' '}
        <span className="h-[1em] ml-2">
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </Container>
));

export default Home;
