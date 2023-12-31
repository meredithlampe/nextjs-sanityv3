/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, previewSecretId, projectId } from 'lib/sanity.api'
import { pageStructure, singletonPlugin } from 'plugins/settings'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {
  defineUrlResolver,
  Iframe,
  IframeOptions,
} from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'
import page from 'schemas/documents/page'
import project from 'schemas/documents/project'
import duration from 'schemas/objects/duration'
import milestone from 'schemas/objects/milestone'
import link from 'schemas/objects/link'
import timeline from 'schemas/objects/timeline'
import customPortableText from 'schemas/objects/custom-portable-text'
import home from 'schemas/singletons/home'
import settings from 'schemas/singletons/settings'

// sections
import blockText from 'schemas/sections/block-text'
import fullBleedImage from 'schemas/sections/full-bleed-image'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Next.js / Sanity v3'

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [
  home.name,
  page.name,
  project.name,
]
const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
  page.name,
  project.name,
] satisfies typeof PREVIEWABLE_DOCUMENT_TYPES
// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = '/api/draft'
export const HIDDEN_DOCUMENT_TYPES: string[] = [
  'blockText',
  'fullBleedImage',
]

export const iframeOptions = {
  url: defineUrlResolver({
    base: PREVIEW_BASE_URL,
    requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
  }),
  urlSecretId: previewSecretId,
  reload: { button: true },
} satisfies IframeOptions

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      duration,
      page,
      project,
      // Objects
      milestone,
      timeline,
      customPortableText,
      link,
      // Sections
      blockText,
      fullBleedImage,
    ],
  },
  plugins: [
    deskTool({
      structure: pageStructure([home, settings]),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        if ((PREVIEWABLE_DOCUMENT_TYPES as string[]).includes(schemaType)) {
          return S.document().views([
            // Default form view
            S.view.form(),
            // Preview
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ])
        }

        return null
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add the "Open preview" action
    previewUrl({
      base: PREVIEW_BASE_URL,
      requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
      urlSecretId: previewSecretId,
      matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    vercelDeployTool(),
  ],
})
