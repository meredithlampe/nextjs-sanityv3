import { DocumentIcon, ImageIcon } from '@sanity/icons'
import sanityCustomImage from 'lib/sanity.custom-image'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'fullBleedImage',
  title: 'Full Bleed Image',
  type: 'document',
  icon: DocumentIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField(sanityCustomImage()),
  ],
  preview: {
    select: {
        image: 'image',
        caption: 'image.caption',
    },
    prepare({ image, caption }) {
      return {
        asset: image,
        subtitle: caption,
        title: 'Full Bleed Image'
      }
    },
  },
})
