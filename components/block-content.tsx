import React from 'react'
import cx from 'classnames'
import { getHrefForLink } from 'lib/next.helpers'
import { PortableText } from '@portabletext/react'

const Content = ({ blocks, className }) => {
  if (!blocks) return null

  return (
    <PortableText
      renderContainerOnSingleChild
      className={cx('rc', className)}
      value={blocks}
      components={{
        block: {},
        marks: {
          link: ({ children, value }) => {
            return <a href={getHrefForLink(value)}>{children}</a>
          },
        },
        types: {
          photo: ({ value }) => {
            return (
              <div
                style={{ width: value.width ? `${value.width}px` : '100%' }}
                className={`my-[80px] col-span-6`}
              >
                <Image src={value} />
              </div>
            )
          },
        },
      }}
    />
  )
}

export default Content
