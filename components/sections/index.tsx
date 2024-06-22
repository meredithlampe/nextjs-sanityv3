import ImageBox from 'components/shared/ImageBox'
import type { BlockText as BlockTextType, FullBleedImage, HomePagePayload } from 'types'

import BlockText from './block-text'

export const Section = ({ index, section }) => {
    switch(section._type) {
      case 'blockText':
        const blockTextContent = section.content as BlockTextType
        if (blockTextContent.content) {
          return (
            <BlockText key={index} data={blockTextContent} />
          )
        }
      case 'fullBleedImage':
        const fullBleedImage = section as FullBleedImage
        return (
          <div key={index}>
            <ImageBox image={fullBleedImage.image} classesWrapper="h-[50vh] md:h-[70vh]" />
          </div>)
  }
  return null;
}
