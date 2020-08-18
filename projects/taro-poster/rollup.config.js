import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";

export default {
  input: 'src/main.js',
  // plugins: [
  //   typescript({
  //     exclude: "node_modules/**",
  //     typescript: require("typescript")
  //   }),
  //   sourceMaps()
  // ],
  output: [{
    file: 'dist/main.js',
    format: 'cjs',
    // sourcemap: true
  },
  {
    format: "es",
    file: "dist/bundle.esm.js",
    // sourcemap: true
  }]
};