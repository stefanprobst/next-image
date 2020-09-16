module.exports = (pluginOptions = {}) => (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(jpg|png)$/,
        issuer: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: pluginOptions.limit || 8192,
              fallback: require.resolve('next/dist/compiled/file-loader'),
              publicPath: '/_next/',
              /**
               * in server-side compilation phase, `outputPath` defaults to
               * `.next/server`, but images should be emitted
               * to `.next/static/images`
               */
              outputPath: options.isServer ? '../' : undefined,
              name: 'static/images/[name].[contenthash].[ext]',
              /**
               * don't emit images twice
               *
               * images are emitted in the server-side compilation phase, not the
               * client-side compilation phase, to support `require` and
               * `require.context` in `getStaticProps`. note that
               * `require.context` currently does not work with `issuer` because
               * of https://github.com/webpack/webpack/issues/9309
               */
              emitFile: options.isServer,
            },
          },
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  }
}
