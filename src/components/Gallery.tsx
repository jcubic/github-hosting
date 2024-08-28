'use server';
import Image from 'next/image';
import { get_images } from '@/git';
import styles from './Gallery.module.css';

export default async function Gallery() {
  const images = await get_images();
  return (
    <ul className={styles.gallery}>
      {images.map(file => {
        const url = `https://cdn.jsdelivr.net/gh/jcubic/images-demo/${file}`;
        return (
          <li key={file}>
            <a href={url}>
              <Image src={url} alt="image" fill />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
