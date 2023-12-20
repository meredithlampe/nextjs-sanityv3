import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface MenuItem {
  text: string,
  link: Link
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

export interface BlockText {
  _type: string
  content?: PortableTextBlock[]
}

export interface FullBleedImage {
  _type: string
  image?: Image
}

export interface Section {
  _type: string
  content?: BlockText | FullBleedImage
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  sections?: Section[]
  title?: string
}

export interface PagePayload {
  sections?: Section[]
  overview?: PortableTextBlock[]
  name?: string
  title?: string
  slug?: string
}

export interface Slug {
  current: string
}

export interface Page {
  name?: string
  title?: string
  slug?: Slug
  _type: string
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: Array<TextLink>
  ogImage?: Image
}

export interface Link {
  _type: string
  url?: string
  page: PagePayload
  type: string
}

export interface TextLink {
  _type: string
  text: string
  link: Link
}