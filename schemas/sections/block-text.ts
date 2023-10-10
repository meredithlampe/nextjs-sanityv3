import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'blockText',
  title: 'Block Text',
  type: 'document',
  icon: DocumentIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      type: 'customPortableText',
      name: 'content',
      title: 'Content',
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content}) {
      return {
        subtitle: content?.content[0]?.children[0]?.text ?? "No content",
        title: 'Block Text'
      }
    },
  },
})
