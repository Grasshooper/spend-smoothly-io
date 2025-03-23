
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if babel-preset-expo is installed
try {
  require.resolve('babel-preset-expo');
} catch (e) {
  console.log('Installing babel-preset-expo...');
  execSync('npm install babel-preset-expo --save-dev', { stdio: 'inherit' });
}

// Run expo start
console.log('Starting Expo development server...');
execSync('npx expo start', { stdio: 'inherit' });
