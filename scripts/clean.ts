import _ from 'underscore';
import { sync as globSync } from 'glob';
import { rmSync } from 'fs';

const globs = [
  'node_modules/',
  'build/',
  'dist/',
  'coverage/',
  'tmp/',
  'src/**/*.js',
  'src/**/*.js.map',
];

_.each(globs, (glob) => {
  const files = globSync(glob, {});

  _.each(files, (file) => {
    console.log(`🗑 Deleting ${file}...`);

    rmSync(file, { recursive: true });
  });
});

console.log('\nDone! 🎉');
