module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js'
    ],

    tests: [
      'test/**/*[sS]pec.js'
    ],

    testFramework: 'jasmine',

    delays: {
      run: 500
    }
  };
};