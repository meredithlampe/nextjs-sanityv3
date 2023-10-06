import React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'

const BlockText = ({ data }) => {
  return (
    <section id="block-text">
      <div className="container">
        <CustomPortableText value={data?.content} />
      </div>
    </section>
  )
}

export default BlockText
