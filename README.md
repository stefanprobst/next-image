# next-image

Adds a Webpack loader for importing `.jpg` and `.png` images to the Next.js
config.

## How to use

First, add the loader to the Next.js configuration in `next.config.js`:

```js
const withImages = require('@stefanprobst/next-image')()

const nextConfig = {
  /** ... */
}

module.exports = withImages(nextConfig)
```

In your components, images can then be imported:

```tsx
import Logo from '@/assets/icons/logo.png'

export default function Page() {
  return (
    <h1>
      <img src={Logo} alt="Logo" /> How cool!
    </h1>
  )
}
```

## Options

This package uses [`url-loader`](https://github.com/webpack-contrib/url-loader),
which can be configured with the
[`limit` option](https://github.com/webpack-contrib/url-loader#limit).

```js
const createImagePlugin = require('@stefanprobst/next-image')

const withImages = createImagePlugin({
  limit: 8192,
})

const nextConfig = {
  /** ... */
}

module.exports = withImages(nextConfig)
```

## Typescript

To make typescript understand `.jpg` and `.png` imports, add the following to
`next-env.d.ts`:

```ts
/// <reference types="@stefanprobst/next-image" />
```

## SVG images

For importing `.svg` images, use
[`@stefanprobst/next-svg`](https://github.com/stefanprobst/next-svg)
