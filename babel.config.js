module.exports = function (api) {
  api.cache(true);

  const config = {
    presets: ["babel-preset-expo"],
  };

  return config;
};
