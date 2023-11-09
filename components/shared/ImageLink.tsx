const ImageLink = ({ imageLink }) => {
  return (
    <Link
      href={getHrefForLink(imageLink.link)}
      external={imageLink.link.type === 'external'}
      className="no-hover-fade w-full"
    >
        <Image
          src={imageLink.image}
          alt={imageLink.link.title}
          sizes={''}
          objectFit="contain"
          width={1000}
        />
    </Link>
  )
}

function getHrefForLink(link) {
  return {
    external: link?.url,
    internal: link?.page?.id === 'pageHome' ? '/' : link?.page?.slug,
  }[link?.type]
}
export default ImageLink
