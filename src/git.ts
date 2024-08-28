'use server';
import fs from 'fs';
import path from 'path';

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

export async function get_images() {
  await init_repo();
  await update_repo();
  return git.listFiles({ fs, dir: git_path });
}
