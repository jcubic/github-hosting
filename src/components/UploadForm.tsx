'use client';
import { useRef } from 'react';

import styles from './UploadForm.module.css';
import { upload } from '@/git';
import UploadButton from '@/components/UploadButton';

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function uploadAction(formData: FormData) {
    formRef.current?.reset();
    await upload(formData);
  }

  return (
    <div className={styles.form}>
      <form action={uploadAction} ref={formRef}>
        <div className={styles.form_row}>
          <label htmlFor="message">message</label>
          <input id="message" name="message" />
        </div>
        <div className={styles.form_row}>
          <label htmlFor="filename">filename</label>
          <input id="filename" name="filename" />
        </div>
        <div className={styles.form_row}>
          <label htmlFor="image">image</label>
          <input id="image" name="image" type="file" accept=".jpg,.jpeg,.png,.gif,.svg,.webp,.avif" />
        </div>
        <div className={styles.form_row}>
          <UploadButton />
        </div>
      </form>
    </div>
  );
}
