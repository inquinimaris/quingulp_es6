import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
    {
        input: 'dev/assets/js/lazysizes.js',
        output: {
            file: 'dev/assets/js/lazysizes.bundle.js',
            format: 'iife',
            sourcemap: true,
        },
        plugins: [resolve(), commonjs()],
    },
    {
        input: 'dev/assets/js/main.js',
        output: {
            file: './dev/assets/js/main.bundle.js',
            format: 'iife',
            sourcemap: true,
        },
        plugins: [resolve(), commonjs()]
    }
];