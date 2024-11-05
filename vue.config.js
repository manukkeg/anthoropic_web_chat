/*const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
*/

const { defineConfig } = require('@vue/cli-service');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`, // Changed to template literal with backticks

        changeOrigin: true,
      },
    },
  },
});