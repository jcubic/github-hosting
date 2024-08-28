'use server';
import fs from 'fs';
import path from 'path';

import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';
import { revalidateTag } from 'next/cache';

import {z} from 'zod';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const pfs = fs.promises;

const git_path = '.git-repo';

const author = {
  name: 'Jakub T. Jankiewicz',
  email: 'jcubic@onet.pl',
};

function init_repo() {
  if (!fs.existsSync(git_path)) {
    return git.clone({
      fs,
      http,
      dir: git_path,
      url: 'https://github.com/jcubic/images-demo.git',
      depth: 1
    });
  }
}

function update_repo() {
  return git.pull({
    fs,
    http,
    author,
    fastForwardOnly: true,
    dir: git_path,
    singleBranch: true
  });
}

export const get_images = nextCache(cache(async function get_images() {
  await init_repo();
  await update_repo();
  return git.listFiles({ fs, dir: git_path });
}), [], {
  tags: ['read']
});

export async function upload(form: FormData) {
  const payload = Object.fromEntries(form.entries());
  const uploadSchema = z.object({
    image: z.instanceof(File),
    message: z.string().min(1, 'Message cannot be empty'),
    filename: z.string().regex(/^.*\.[^.]+$/, 'Invalid filename format')
  });

  const { filename, message, image } = uploadSchema.parse(payload);

  await init_repo();
  await update_repo();

  const fullname = path.join(process.cwd(), git_path, filename);

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (fs.existsSync(fullname)) {
    throw new Error('file already exists');
  }

  await pfs.writeFile(fullname, buffer);

  await git.add({ fs, dir: git_path, filepath: filename });
  await git.commit({
    fs,
    dir: git_path,
    author,
    message
  });

  await git.push({
    fs,
    http,
    dir: git_path,
    onAuth: () => ({ username: process.env.GITHUB_TOKEN })
  });
  revalidateTag('read');
}
