import GitRepo from 'git-repository';
import child from 'child_process';
import fs from 'fs';

const exec = (command, args, options) => new Promise((resolve, reject) => {
  let out = '';
  let err = '';
  const p = child.spawn(command, args, options);
  p.stdout.on('data', data => out += data);
  p.stderr.on('data', data => err += data);
  p.on('error', reject);
  p.on('close', (code) => resolve([code, out.trim(), err.trim()]));
});

async function hasRef(repository, ref) {
  const opts = { cwd: 'dist' };
  const [code, , err] = await exec('git', ['ls-remote', repository, ref, '--exit-code'], opts);
  if (code === 2) {
    return false;
  } else if (code === 0) {
    return true;
  }
  throw new Error(err);
}

async function checkout(branch) {
  //console.log('checkout branch ' + branch);
  const opts = { cwd: 'dist' };
  const [code, , err] = await exec('git', ['checkout', branch], opts);
  if (code === 2) {
    return false;
  } else if (code === 0) {
    return true;
  }
  throw new Error(err);
}

function branch() {
  if (process.env.NODE_ENV === 'production') {
    return 'master';
  }
  if (process.env.NODE_ENV === 'uat') {
    return 'uat';
  }
  return 'acceptance';
}

function environment() {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
  if (process.env.NODE_ENV === 'uat') {
    return 'uat'
  }
  // if (process.env.NODE_ENV === 'development') {
  //   return 'development'
  // }
  return 'acceptance';
}

const remote = {
  name: 'JohnBlog-deploy',
  url: 'git@github.com:wssjq198913/JohnBlog-deploy.git',
  branch: branch(),
};

function run(cmd) {
  return new Promise((resolve, reject) => {
    console.log(`Running ${cmd} before pushing to deploy repo`);
    child.exec(`npm run ${cmd}`, (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      }
      resolve(stdout);
    });
  });
}

async function push(msg) {
  const commitMessage = msg || 'Update';
  console.log('PUSH: *** START ***');
  console.log(`Starting to push to deploy repo: ${process.env.NODE_ENV}`);
  console.log('Remote name:', remote.name);
  console.log('Remote branch:', remote.branch);
  await run('clean');
  const buildDir = 'dist';
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }
  const repo = await GitRepo.open(buildDir, { init: true });
  try {
    await repo.setRemote(remote.name, remote.url);
    if (await hasRef(remote.url, remote.branch)) {
      await repo.fetch(remote.name);
      await checkout(remote.branch);
    }

    await run(`build:${environment()}`);
    await repo.add('--all .');
    await repo.commit(commitMessage);
    await repo.push(remote.name, remote.branch, { force: true });
  } catch (e) {
    console.error('!!!! error in fetch files from repo', e);
  }
  console.log('PUSH: *** END ***');
}

push('*** Pushing to ' + remote.branch + ' ***');