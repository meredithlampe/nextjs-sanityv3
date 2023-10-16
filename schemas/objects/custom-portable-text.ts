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
                        fields: [
                            {
                                title: 'Link Type',
                                name: 'type',
                                type: 'string',
                                options: {
                                    list: [
                                    { title: 'Internal Page', value: 'internal' },
                                    { title: 'External URL', value: 'external' }
                                    ]
                                },
                                initialValue: 'internal',
                                validation: Rule => Rule.required()
                            },
                            {
                                title: 'Page',
                                name: 'page',
                                type: 'reference',
                                to: [{ type: 'page' }],
                                options: {
                                    disableNew: true
                                },
                                hidden: ({ parent }) => parent.type !== 'internal'
                            },
                            {
                                title: 'URL',
                                name: 'url',
                                type: 'url',
                                validation: Rule =>
                                    Rule.uri({
                                    scheme: ['http', 'https', 'mailto', 'tel']
                                    }),
                                hidden: ({ parent }) => parent.type !== 'external'
                            },
                        ]
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