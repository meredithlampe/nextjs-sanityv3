'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// import {FaCar} from 'react-icons/fa'
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(
      // Define structure of project folder and pages folder
      // https://www.sanity.io/docs/structure-builder-introduction
      {
        name: 'site-content',
        title: 'Site Content',
        structure: (S) => 
          S.list()
            .title('Site Content')
            .items([
              S.listItem()
                .id('home')
                .schemaType('home')
                .title('Home')
                .child(
                  S.editor()
                    .id('home')
                    .title('Home')
                    .schemaType('home')
                    .documentId('home')
                ),
              S.divider(),
              S.documentTypeListItem('project').title(
                'Projects',
              ),
              S.documentTypeListItem('page').title(
                'Pages',
              ),
              S.divider(),
              S.listItem()
                .id('settings')
                .schemaType('settings')
                .title('Settings')
                .child(
                  S.editor()
                    .id('settings')
                    .title('Settings')
                    .schemaType('settings')
                    .documentId('settings')
                ),
          ])
      }
    ),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})

// const title =
//   process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
//   'Next.js / Sanity v3'

// export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [
//   home.name,
//   page.name,
//   project.name,
// ]
// const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
//   page.name,
//   project.name,
// ] satisfies typeof PREVIEWABLE_DOCUMENT_TYPES
// // Used to generate URLs for drafts and live previews
// export const PREVIEW_BASE_URL = '/api/draft'
// export const HIDDEN_DOCUMENT_TYPES: string[] = [
//   'blockText',
//   'fullBleedImage',
// ]

// export const iframeOptions = {
//   url: defineUrlResolver({
//     base: PREVIEW_BASE_URL,
//     requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
//   }),
//   urlSecretId: previewSecretId,
//   reload: { button: true },
// } satisfies IframeOptions

//   plugins: [
//     deskTool({
//       structure: pageStructure([home, settings]),
//       // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
//       // You can add any React component to `S.view.component` and it will be rendered in the pane
//       // and have access to content in the form in real-time.
//       // It's part of the Studio's “Structure Builder API” and is documented here:
//       // https://www.sanity.io/docs/structure-builder-reference
//       defaultDocumentNode: (S, { schemaType }) => {
//         if ((PREVIEWABLE_DOCUMENT_TYPES as string[]).includes(schemaType)) {
//           return S.document().views([
//             // Default form view
//             S.view.form(),
//             // Preview
//             S.view.component(Iframe).options(iframeOptions).title('Preview'),
//           ])
//         }

//         return null
//       },
//     }),
//     // Configures the global "new document" button, and document actions, to suit the Settings document singleton
//     singletonPlugin([home.name, settings.name]),
//     // Add the "Open preview" action
//     previewUrl({
//       base: PREVIEW_BASE_URL,
//       requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
//       urlSecretId: previewSecretId,
//       matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
//     }),
//     // Add an image asset source for Unsplash
//     unsplashImageAsset(),
//     // Vision lets you query your content with GROQ in the studio
//     // https://www.sanity.io/docs/the-vision-plugin
//     visionTool({ defaultApiVersion: apiVersion }),
//     vercelDeployTool(),
//   ],
// })