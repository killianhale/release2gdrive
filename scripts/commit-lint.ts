#!/usr/bin/env node

import { execSync } from 'child_process';

import { scopes, types } from '../.cz-config.js';

console.log('🧐🧐 Validating git commit message 🧐🧐\n\n');
const gitMessage = execSync('git log -1 --no-merges').toString().trim();

const allowedTypes = types.map((type) => type.value);
const allowedScopes = scopes.map((scope) => scope.name);

const commitMsgRegex = `(${allowedTypes.join('|')})\\((${allowedScopes.join(
  '|'
  // eslint-disable-next-line no-useless-escape
)})\\):\\s(([a-z0-9:\-\s])+)`;

const matchCommit = new RegExp(commitMsgRegex, 'g').test(gitMessage);
const matchRevert = /Revert/gi.test(gitMessage);
const matchRelease = /Release/gi.test(gitMessage);
const exitCode = +!(matchRelease || matchRevert || matchCommit);

if (exitCode === 0) {
  console.log('Commit ACCEPTED 👍');
} else {
  console.log(
    'Oh no! Your commit message does not follow the commit message convention specified in the CONTRIBUTING.MD file. 😦 \n\n\n' +
      'Commit Message: \n' +
      '-------------------------------------------------------------------\n' +
      gitMessage +
      '\n-------------------------------------------------------------------\n'
  );
  console.log(
    'Convention: \n' +
      '-------------------------------------------------------------------\n' +
      '\ntype(scope): subject \n  \n body' +
      '\n-------------------------------------------------------------------\n'
  );
  console.log(`possible types: ${allowedTypes.join('|')}`);
  console.log(
    `possible scopes: ${allowedScopes.join('|')} (if unsure use "misc")`
  );
  console.log(
    '\nEXAMPLE: \n' + 'feat(dotnet): add a generator for grpc project type\n'
  );
}
process.exit(exitCode);
