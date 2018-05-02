// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';

export default {
  input: 'index.js',
  // format: 'umd',
  output: {
    file: 'build/iHam.js',
    format: 'umd',
    name: 'iHam'
  },
  moduleContext: {
    'node_modules/sax/lib/sax.js': 'window'
  },
  plugins: [
    scss({
      output: 'build/iHam.css'
    }),

    globals(),

    nodeResolve({
      // module: true
      jsnext: true,
      main: true
    }),

    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: [
        'node_modules/**',
      ],  // Default: undefined
      // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
      // these values can also be regular expressions
      // include: /node_modules/

      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      // preferBuiltins: false,  // Default: true

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      // extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false,  // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: true,  // Default: true

      // explicitly specify unresolvable named exports
      // (see below for more details)
      // namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined
      namedExports: {
        // 'js-orthoxml-hogvis': 'utils'
        // 'tnt.tree': ['tree']
      },

      // sometimes you have to leave require statements
      // unconverted. Pass an array containing the IDs
      // or a `id => boolean` function. Only use this
      // option if you know what you're doing!
      ignore: [ 'conditional-runtime-dependency' ]
    }),

    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),

  ]
};
