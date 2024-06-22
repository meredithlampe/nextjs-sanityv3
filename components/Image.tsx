import React, { useEffect, useState } from 'react'
import NextImage from 'next/image'
import cx from 'classnames'
import sanityImage from '@sanity/image-url'
import { getClient } from 'lib/sanity.client'
import { ImageFormat } from '@sanity/image-url/lib/types/types'
import { ImagePayload } from 'types'

const options = {
  dataset: process.env.SANITY_PROJECT_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
}

const sanityClient = getClient()
const imageBuilder = sanityImage(sanityClient)

export function buildSrc(
  image,
  {
    width,
    height,
    format,
    quality,
  }: {
    image?: any
    width?: number | string | null
    height?: number | string | null
    format?: ImageFormat | null
    quality?: number | null
  },
) {
  let imgSrc = imageBuilder.image(image)

  if (width && typeof width === 'number') {
    imgSrc = imgSrc.width(Math.round(width))
  }

  if (height && typeof height === 'number') {
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
  objectPosition = 'right',
  lazyBoundary = '100px',
  filter = 'none',
  priority = false,
  quality = 90,
  callback = () => {},
  className = '',
  ...props
}: ImagePayload) => {
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
  const imgWidth = !fill ? (typeof width === 'number' ? width : 2000) : null

  const imgHeight = !fill
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
      className={cx(
        `${
          src.dropShadow ? 'drop-shadow' : ''
        } h-full relative object-${objectFit} object-${objectPosition} flex items-center`,
        {
          'opacity-0': !isLoaded,
        },
      )}
      // style={{ filter: filter }}
    >
      <NextImage
        className={`object-${objectPosition} object-${objectFit} ${className}`}
        alt={imgAlt}
        src={imgUrl}
        width={imgWidth ?? undefined}
        height={imgHeight ?? undefined}
        sizes={sizes}
        fill={fill}
        priority={priority}
        onLoadingComplete={() => {
          callback(true)
          setIsLoaded(true)
        }}
        {...props}
      />
    </div>
  )
}

export default React.memo(Image)
