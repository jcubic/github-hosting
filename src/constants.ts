export const git_path = '.git-repo';

export const author = {
  name: 'Jakub T. Jankiewicz',
  email: 'jcubic@onet.pl',
} as const;

export const extensions = [
  '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif'
] as const;

type ImageExtension = (typeof extensions)[number];

export type ImageFilename = `${string}${ImageExtension}`;

export const extension_re = new RegExp('^.*(' + extensions.map(ext => {
  return ext.replace(/\./, '\\.');
}).join('|') + ')$', 'i');

export const mimes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
  'image/webp',
  'image/avif'
] as const;
