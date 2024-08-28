import Image from 'next/image';

import styles from "./page.module.css";
import { get_images } from '@/git';

export default async function Home() {
  const images = await get_images();
  return (
    <main className={styles.main}>
      <h1>FreeCodeCamp - GitHub image hosting</h1>
      <ul className={styles.gallery}>
        {images.map(file => {
          const url = `https://cdn.jsdelivr.net/gh/jcubic/images-demo/${file}`;
          return (
            <li key={file}>
              <span>
                <Image src={url} alt="image" fill />
              </span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
