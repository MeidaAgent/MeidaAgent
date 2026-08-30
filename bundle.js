const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function bundle() {
  console.log('Building project in standalone mode...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Preparing standalone folder...');
  const standaloneDir = path.join(__dirname, '.next', 'standalone');
  
  if (!fs.existsSync(standaloneDir)) {
    console.error('Error: Standalone directory not found!');
    return;
  }

  console.log('Copying static assets...');
  fs.copySync(path.join(__dirname, 'public'), path.join(standaloneDir, 'public'));
  fs.copySync(path.join(__dirname, '.next', 'static'), path.join(standaloneDir, '.next', 'static'));
  fs.copySync(path.join(__dirname, '.env.local'), path.join(standaloneDir, '.env.local'));

  console.log('\n=========================================');
  console.log('✅ BUNDLE SELESAI!');
  console.log('=========================================');
  console.log('FOLDER YANG HARUS DI-UPLOAD KE CPANEL:');
  console.log('➡ .next/standalone');
  console.log('-----------------------------------------');
  console.log('Silakan jadikan ZIP semua isi di dalam folder "standalone" tersebut,');
  console.log('lalu upload dan Extract di folder meida.cloud di cPanel Anda.');
  console.log('Di cPanel "Setup Node.js App", arahkan Application Startup File ke: server.js');
}

bundle();
