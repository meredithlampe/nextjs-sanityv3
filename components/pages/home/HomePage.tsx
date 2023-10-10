import { ProjectListItem } from 'components/pages/home/ProjectListItem'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import HomePageHead from './HomePageHead'

export interface HomePageProps {
  settings: SettingsPayload
  page: HomePagePayload
  preview?: boolean
  loading?: boolean
}

export function HomePage({ page, settings, preview, loading }: HomePageProps) {
  const { overview, sections, title = 'Personal website' } = page ?? {}

  return (
    <>
      <HomePageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div className="space-y-20">
          {/* Header */}
          {title && <Header centered title={title} description={overview} />}
          {/* Showcase projects */}
          {sections && sections.length > 0 && (
            <div className="flex flex-col">
              {sections.map((section, key) => {
                switch(section._type) {
                  case 'blockText':
                    if (section.content?.content) {
                    return (
                      <div key={key}>
                        <CustomPortableText
                          paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
                          value={section.content.content}
                        />
                      </div>
                    )
                    }
                }
              })}
            </div>
          )}

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
