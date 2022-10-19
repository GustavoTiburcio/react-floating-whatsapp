import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import url from '@rollup/plugin-url'

import { terser } from 'rollup-plugin-terser'
import packageJson from './package.json'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: 'src/index.tsx',
  plugins: [
    peerDepsExternal(),
    commonjs(),
    resolve(),
    postcss({
      plugins: [autoprefixer()]
    }),
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.mp3', '**/*.webp'],
      limit: 99000,
      destDir: 'dist'
    }),
    typescript({
      exclude: ['src/stories/**']
    }),
    terser()
  ],
  output: {
    file: packageJson.main,
    format: 'cjs'
  }
}

/**
 * Check for touch devices
 * @returns `boolean`
 */
function isTouchDevice() {
  return (
    (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) ||
    'ontouchstart' in window ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
  )
}
