import React from 'react'
import Content from '../block-content'

const BlockText = ({ data }) => {
  return (
    <section id="block-text">
      <div className="container">
        <Content blocks={data?.content} />
      </div>
    </section>
  )
}

export default BlockText
