import { groq } from 'next-sanity'
import { getClient } from './sanity.client';

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
export const pageImpl = groq`
    id,
    "type": _type,
    seo,
    _type,
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
`

const markDefLink = groq`
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
      "page":@.page->{
        ${pageImpl}
      }
    },
`

export const ptContent = groq`
  content[]{
    ...,
    markDefs[]{
      ...,
      ${markDefLink}
    }
  },
`

// Construct our content "sections" GROQ
export const sections =
  groq`
  _type,
  _type == 'blockText' => {
    content
  },
  _type == 'fullBleedImage' => {
    photo{
      ${imageMeta}
    },
    text{
        ${ptContent}
    }
  }
  `;

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

export const project = groq`
id,
"type": _type,
seo,
_type,
backgroundColor,
_id,
body,
overview,
title,
"slug": slug.current,
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${project}
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const link = groq`
    _type,
    type,
    url,
    page->{
      ${pageImpl}
    }
`

export const menuLink = groq`
    text,
    link {
      ${link}
    }
`

export const imageLink = groq`
    image{
      ${imageMeta}
    },
    link {
      ${link}
    }
`
// from color-input plugin
// https://www.sanity.io/plugins/color-input
export const color = groq`
  alpha,
  hex,
  hsl,
  hsv,
  rgb,
  _type,
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    menuItems[]{
      ${menuLink}
    },
    socialLinks[]{
      ${imageLink}
    },
    footerTextLeft[],
    footerTextRight[],
    ogImage,
    siteTitle
  }
`

// Fetch all dynamic docs
export async function getAllDocSlugs(doc) {
  const data = await getClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true && isDraft != true]{ "slug": slug.current }`
  )
  return data
}