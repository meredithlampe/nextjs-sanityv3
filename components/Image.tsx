import React, { useEffect, useState } from 'react'
import NextImage from 'next/image'
import cx from 'classnames'
import sanityImage from '@sanity/image-url'
import { getClient } from 'lib/sanity.client'
import { ImageFormat } from '@sanity/image-url/lib/types/types'

const options = {
  dataset: process.env.SANITY_PROJECT_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
}

const sanityClient = getClient()
const imageBuilder = sanityImage(sanityClient)

export function buildSrc(image, { width, height, format, quality }: { image?: any, width?: number | null, height?: number | null, format?: ImageFormat | null, quality?: number | null} ) {
  let imgSrc = imageBuilder.image(image)

  if (width) {
    imgSrc = imgSrc.width(Math.round(width))
  }

  if (height) {
    imgSrc = imgSrc.height(Math.round(height))
  }

  if (format) {
    imgSrc = imgSrc.format(format)
  }

  if (quality) {
    imgSrc = imgSrc.quality(quality)
  }

  return imgSrc.fit('max').auto('format').url()
}

const Image = ({
  alt,
  src,
  width,
  height,
  sizes,
  fill = false,
  objectFit = 'cover',
  lazyBoundary = '100px',
  filter = 'none',
  priority = false,
  quality = 90,
  callback = () => {},
  ...props
} : {
  alt: string,
  src: any,
  sizes: string,
  width?: number | null,
  height?: number | null,
  fill?: boolean,
  objectFit?: string,
  lazyBoundary?: string,
  filter?: string,
  priority?: boolean,
  quality?: number,
  callback?: any,
}) => {
  // state of our image load (used for animation purposes)
  const [isLoaded, setIsLoaded] = useState(false)

  if (!src) return null

  // warn if there's no alt text provided
  // if (!alt && !src?.alt) console.warn('Image missing alt text: ', src)

  const isStatic = typeof src === 'string' ? true : false

  // calculate our image aspect ratio
  const imgAspectRatio =
    typeof width === 'number' && typeof height === 'number'
      ? (height / width) * 100
      : !isStatic
      ? 100 / (src?.customRatio || src?.aspectRatio)
      : null

  // calculate our image dimensions (if not "fill" layout)
  const imgWidth = !fill ? width ?? 2000 : null

  const imgHeight =
    !fill
      ? height ?? imgAspectRatio
        ? Math.round(imgWidth * imgAspectRatio) / 100
        : null
      : null

  // build our image URL
  const imgUrl = isStatic
    ? src
    : buildSrc(src, { width: imgWidth, height: imgHeight, quality })

  // calculate our image alt text
  const imgAlt = alt ?? src?.alt

  return (
    <div
      className={cx('block transition-opacity duration-500 ease-linear', {
        'opacity-0': !isLoaded,
      })}
      style={{ filter: filter }}
    >
      <NextImage
        alt={imgAlt}
        src={imgUrl}
        width={imgWidth ?? undefined}
        height={imgHeight ?? undefined}
        sizes={sizes}
        fill={fill}
        // layout={layout} deprecated
        // objectFit={objectFit} // deprecated
        // lazyBoundary={lazyBoundary} // deprecated
        priority={priority}
        onLoadingComplete={() => {
          callback(true)
          setIsLoaded(true)
        }}
        // {...loader} deprecated
        {...props}
      />
    </div>
  )
}

export default React.memo(Image)
