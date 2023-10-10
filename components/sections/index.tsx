import { CustomPortableText } from 'components/shared/CustomPortableText'
import type { FullBleedImage, BlockText, HomePagePayload } from 'types'
import ImageBox from 'components/shared/ImageBox'

export const Section = ({ index, section }) => {
    switch(section._type) {
      case 'blockText':
        const blockTextContent = section.content as BlockText
        if (blockTextContent.content) {
          return (
            <div key={index}>
              <CustomPortableText
                paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
                value={blockTextContent.content}
              />
            </div>
          )
        }
      case 'fullBleedImage':
        const fullBleedImage = section.image as FullBleedImage
        return (
          <div key={index}>
            <ImageBox image={fullBleedImage} classesWrapper="h-[50vh] md:h-[70vh]" />
          </div>)
  }
  return null;
}
