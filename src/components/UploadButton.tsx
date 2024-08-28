'use client';
import { useFormStatus } from 'react-dom';

export default function UploadButton() {
  const { pending } = useFormStatus();

  return (
    <button>
      {pending ? 'Submitting...' : 'Upload'}
    </button>
  );
}
