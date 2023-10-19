//pages/sitemap.xml.js
import { getAllDocSlugs } from "lib/sanity.queries"

// Example of adding another type to the sitemap:
// ${allDirectoryPageSlugs.map((pageSlug) => {
//   return `
//       <url>
//        <loc>https://domain-name.com/directory/${pageSlug.slug}</loc>
//       </url>
//    `
// })}

function generateSiteMap(
  allPageSlugs,
//   allDirectoryPageSlugs, Example of adding another type
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://domain-name.com</loc>
     </url>
     ${allPageSlugs.map((pageSlug) => {
       return `
            <url>
                <loc>https://domain-name.com${pageSlug.slug}</loc>
            </url>
         `
     })}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const allPageSlugs = await getAllDocSlugs('page')
//   const allDirectoryPageSlugs = await getAllDocSlugs('directory')

  const sitemap = generateSiteMap(
    allPageSlugs,
    // allDirectoryPageSlugs, // Example
  )

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap