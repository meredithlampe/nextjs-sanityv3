export function getHrefForLink(link) {
    let internalLink
    if (link?.page?._type === 'pageHome') {
      internalLink = '/'
    } else {
      internalLink = '/' + link?.page?.slug.current
    }
  
    return {
      external: link?.url,
      internal: internalLink,
    }[link?.type]
  }
  