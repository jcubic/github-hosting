import { Suspense } from 'react';

import styles from "./page.module.css";

import Gallery from '@/components/Gallery';
import UploadForm from '@/components/UploadForm';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>FreeCodeCamp - GitHub image hosting</h1>
      <Suspense fallback={<p>loading...</p>}>
        <Gallery />
      </Suspense>
      <h2>Upload form</h2>
      <UploadForm/>
    </main>
  );
}
