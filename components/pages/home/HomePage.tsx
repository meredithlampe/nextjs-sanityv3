import { Header } from 'components/shared/Header'
import { Section } from 'components/sections'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import type { FullBleedImage, BlockText, HomePagePayload } from 'types'
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

          {/* Sections */}
          {sections && sections.length > 0 && (
            <div className="flex flex-col">
              {sections.map((section, key) => 
                <Section index={key} section={section} />
              )}
            </div>
          )}

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
