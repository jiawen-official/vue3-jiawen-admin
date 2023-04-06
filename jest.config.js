const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  // 在每个测试之间自动清除 mock 调用和实例
  clearMocks: true,
  //设置输出报告,收集测试覆盖率
  collectCoverage: true,
  //测试覆盖率报告输出目录
  coverageDirectory: 'tests/coverage',
  // 指示应使用哪个提供程序来检测覆盖范围的代码。允许的值为 babel（默认）或 v8。
  coverageProvider: 'v8',
  // 测试的文件类型
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // 别名设置
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // 测试文件
  testMatch: ['<rootDir>/tests/**/*.spec.ts?(x)'],
  // 转化方式
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.(t|j)sx?$': 'ts-jest'
  }
};
