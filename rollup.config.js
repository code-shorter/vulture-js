import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js', // Entry point of the library
    output: [
        {
            file: 'dist/vulture.esm.js',
            format: 'esm', // ES Module format (for import)
        },
        {
            file: 'dist/vulture.cjs.js',
            format: 'cjs', // CommonJS format (for require)
        },
        {
            file: 'dist/vulture.min.js',
            format: 'umd', // UMD format (for browsers)
            name: 'vulture',
            sourcemap: false,
            plugins: [terser()] // Minify the UMD build
        }
    ],
    plugins: [
        resolve(), // Resolve node_modules
        commonjs(), // Convert CommonJS modules to ES6
    ]
};