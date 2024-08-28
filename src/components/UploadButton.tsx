'use client';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

export default function UploadButton() {
  const { pending } = useFormStatus();

  return (
    <button>
      {pending ? 'Submitting...' : 'Upload'}
    </button>
  );
}
