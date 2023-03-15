const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../../back-end/sample/src/main/resources/static",  // D:\workspace\back-end\sample\src\main\resources\static
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true, //  cross-origin 허용
      }
    }
  }
})
