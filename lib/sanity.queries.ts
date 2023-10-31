import { groq } from 'next-sanity'
import { getClient } from './sanity.client';

// Construct our content "sections" GROQ
export const sections =
  groq`
  _type,
  _type == 'blockText' => {
    content
  },
  _type == 'fullBleedImage' => {
    image
  }
  `;
    // Construct our "image meta" GROQ
  export const imageMeta = groq`
    "alt": coalesce(alt, asset->altText),
    asset,
    crop,
    customRatio,
    clipPath,
    hotspot,
    "id": asset->assetId,
    "type": asset->mimeType,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
    "lqip": asset->metadata.lqip
  `

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    footer,
    overview,
    sections[]{
      ${sections}
    },
    title,
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      text,
      link {
        _type,
        type,
        url,
        page->{
          _type,
          slug
        }
      }
    },
    ogImage,
  }
`

// Fetch all dynamic docs
export async function getAllDocSlugs(doc) {
  const data = await getClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true && isDraft != true]{ "slug": slug.current }`
  )
  return data
}