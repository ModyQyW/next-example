const { eslint } = require('@modyqyw/fabric');

module.exports = {
  ...eslint.reactPrettier,
  extends: ['plugin:@next/next/recommended', ...eslint.reactPrettier.extends],
};
