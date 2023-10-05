import { Minus } from 'phosphor-react'

import {
  BodyLarge,
  BodySmall,
  Header1,
  Header2,
  Header3,
  Button
} from '../components/block-renders'

import customImage from './custom-image'
import HR from '../components/hr'

export default ({
  type,
  add = {},
  remove = {},
  characterLimit = null,
  ...props
} = {}) => {
  // find our matched type, and return it's settings
  const typeSettings = {
    simple: {
      remove: {
        styles: ['h1', 'h1mock', 'h2', 'h2mock', 'h3', 'h3mock'],
        lists: ['bullet', 'number'],
        blocks: ['photo', 'horizontalRule']
      }
    }
  }[type]

  // construct our styles array, incorporating both the type-specific and custom-supplied additions/removals
  const styles = [
    { title: 'Body (regular)', value: 'normal' },
    {
      title: 'Body (large)',
      value: 'bodyLarge',
      blockEditor: {
        render: BodyLarge
      }
    },
    {
      title: 'Body (small)',
      value: 'bodySmall',
      blockEditor: {
        render: BodySmall
      }
    },
    {
      title: 'Headline (H1: once per page)',
      value: 'h1',
      blockEditor: {
        render: Header1
      }
    },
    {
      title: 'Headline (style only)',
      value: 'h1mock',
      blockEditor: {
        render: Header1
      }
    },
    {
      title: 'Subhead (H2)',
      value: 'h2',
      blockEditor: {
        render: Header2
      }
    },
    {
      title: 'Subhead (style only)',
      value: 'h2mock',
      blockEditor: {
        render: Header2
      }
    },
    {
      title: 'Label (H3)',
      value: 'h3',
      blockEditor: {
        render: Header3
      }
    },
    {
      title: 'Label (style-only)',
      value: 'h3mock',
      blockEditor: {
        render: Header3
      }
    },
    ...(typeSettings?.add?.styles || []),
    ...(add?.styles || [])
  ].filter(
    item =>
      !(remove?.styles || []).includes(item.value) &&
      !(typeSettings?.remove?.styles || []).includes(item.value)
  )

  // construct our lists array, incorporating both the type-specific and custom-supplied additions/removals
  const lists = [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Number', value: 'number' },
    ...(typeSettings?.add?.lists || []),
    ...(add?.lists || [])
  ].filter(
    item =>
      !(remove?.lists || []).includes(item.value) &&
      !(typeSettings?.remove?.lists || []).includes(item.value)
  )

  // construct our marks object, incorporating both the type-specific and custom-supplied additions/removals
  const marks = {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      ...(typeSettings?.add?.marks?.decorators || []),
      ...(add?.marks?.decorators || [])
    ].filter(
      item =>
        !(remove?.marks?.decorators || []).includes(item.value) &&
        !(typeSettings?.remove?.marks?.decorators || []).includes(item.value)
    ),
    annotations: [
      {
        title: 'Link',
        name: 'link',
        type: 'object',
        blockEditor: {
          render: Button
        },
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
            to: [{ type: 'page' }, { type: 'pageHome' }],
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
          {
            title: 'Style as Button?',
            name: 'isButton',
            type: 'boolean',
            initialValue: false
          },
          {
            name: 'styles',
            type: 'object',
            fields: [
              {
                title: 'Button Style',
                name: 'style',
                type: 'string',
                options: {
                  list: [
                    { title: 'Default', value: 'btn' },
                    { title: 'Primary', value: 'btn is-primary' },
                    { title: 'Text', value: 'btn is-text' }
                  ],
                  layout: 'radio'
                }
              }
            ],
            hidden: ({ parent }) => !parent.isButton
          }
        ]
      },
      ...(typeSettings?.add?.marks?.annotations || []),
      ...(add?.marks?.annotations || [])
    ].filter(
      item =>
        !(remove?.marks?.annotations || []).includes(item.name) &&
        !(typeSettings?.remove?.marks?.annotations || []).includes(item.name)
    )
  }

  // construct our additional blocks, incorporating both the type-specific and custom-supplied additions/removals
  const blocks = [
    customImage({ hasDisplayOptions: true }),
    {
      title: 'Horizontal Rule',
      name: 'horizontalRule',
      type: 'object',
      icon: Minus,
      fields: [
        {
          type: 'string',
          name: 'horizontalRule',
          inputComponent: HR
        }
      ],
      preview: {
        prepare() {
          return {
            title: 'Horizontal Rule'
          }
        }
      }
    },
    ...(typeSettings?.add?.blocks || []),
    ...(add?.blocks || [])
  ].filter(
    item =>
      !(remove?.blocks || []).includes(item.name) &&
      !(typeSettings?.remove?.blocks || []).includes(item.name)
  )

  return {
    title: 'Portable Text',
    name: 'portableText',
    type: 'array',
    validation: characterLimit
      ? Rule => {
          return Rule.custom(field => {
            if (!field) return true

            const totalCharacterCount = field
              .map(child => {
                return child.children
                  .map(grandchild => {
                    return grandchild.text.length
                  })
                  .reduce((a, b) => a + b, 0)
              })
              .reduce((a, b) => a + b, 0)
            return totalCharacterCount <= characterLimit
              ? true
              : 'This field is over the character limit'
          }).warning(
            `This field is over the ${characterLimit} character limit and may be truncated`
          )
        }
      : null,
    of: [
      {
        title: 'Block',
        type: 'block',
        styles,
        lists,
        marks
      },
      ...blocks
    ],
    ...props
  }
}
