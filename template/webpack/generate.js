const fs = require('fs');
const path = require('path');

function checkEnv(envConfigPath) {
  try {
    fs.accessSync(envConfigPath, fs.constants.F_OK);
  } catch (err) {
    // 生成webpack配置
    fs.writeFileSync(
      envConfigPath,
      `
/**
* ${process.env.NODE_ENV}环境
* 在生产环境基础上进行配置
* 时间: ${new Date()}
*/
const { merge } = require('webpack-merge');
const production = require('./env.production');
      
module.exports = merge(production, {
  // webpack配置...
});
    `,
    );

    // browserslistrc加入相应配置
    const data = fs.readFileSync(path.resolve('.browserslistrc'));
    const lines = data.toString().split('\n');
    if (!lines.includes(`[${process.env.NODE_ENV}]`)) {
      fs.appendFileSync(
        path.resolve('.browserslistrc'),
        `
# 时间: ${new Date()}
[${process.env.NODE_ENV}]
last 10 versions
    `,
      );
    }
    console.log('生成环境信息成功');
    console.log('环境配置文件:', envConfigPath);
    console.log(
      '默认配置与production相同，如果有不同配置，请修改配置文件后重新运行打包命令。',
    );
    process.exit();
  }
}

module.exports = { checkEnv };
