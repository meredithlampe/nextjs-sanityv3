import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  title: 'Link',
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
      to: [{ type: 'page' }, { type: 'home'}],
      options: {
        disableNew: true
      },
      hidden: ({ parent }) => parent?.type !== 'internal'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        }),
      hidden: ({ parent }) => parent?.type !== 'external'
    },
  ],
  preview: {
    select: {
      url: 'url',
      page: 'page.slug.current',
    },
    prepare({ url, page }) {
      return {
        title: 'Link',
        subtitle: url ? url : page
      }
    }
  }
})