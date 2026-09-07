import { execSync } from 'node:child_process'

const forbidden = [
  'VITE_PRO_BUILD',
  'PRO_OVERLAY_PATH',
  'ENABLE_PRO',
  'VELXIO_INSTALL_STM32',
  'VELXIO_LICENSE_KEY',
]

for (const name of forbidden) {
  if (process.env[name]) {
    console.error(`ERROR: ${name} must not be set: ${process.env[name]}`)
    process.exit(1)
  }
}

console.log('========================================')
console.log(' Velxio STRICT OSS frontend build')
console.log('========================================')
console.log('Pro overlay: DISABLED')
console.log('@pro: __pro_stub__')
console.log('')

execSync(
  'npm run generate:component-svgs && npm run generate:sitemap && npx vite build --config vite.oss.config.ts && node scripts/prerender-seo.mjs',
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      VITE_PRO_BUILD: '',
      PRO_OVERLAY_PATH: '',
      VITE_OSS_BUILD: 'true',
    },
  }
)
