import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'fullBleedImage',
  title: 'Full Bleed Image',
  type: 'document',
  icon: DocumentIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
        type: 'image',
        icon: ImageIcon,
        name: 'image',
        title: 'Image',
        options: {
        hotspot: true,
        },
        preview: {
        select: {
            imageUrl: 'asset.url',
            title: 'caption',
        },
        },
        fields: [
        defineField({
            title: 'Caption',
            name: 'caption',
            type: 'string',
        }),
        defineField({
            name: 'alt',
            type: 'string',
            title: 'Alt text',
            description:
            'Alternative text for screenreaders. Falls back on caption if not set',
        }),
        ],
    }),
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
