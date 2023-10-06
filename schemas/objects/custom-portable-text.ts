import { defineArrayMember, defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'customPortableText',
  title: 'Custom Portable Text',
  type: 'object',
  fields: [
    defineField({
        type: 'array',
        name: 'content',
        title: 'Content',
        of: [
            // Paragraphs
            defineArrayMember({
                type: 'block',
                marks: {
                    annotations: [
                    {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                        {
                            name: 'href',
                            type: 'url',
                            title: 'Url',
                        },
                        ],
                    },
                    ],
                },
                styles: [],
            }),
            defineArrayMember({
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
            })
    ],
}),
  ]
})