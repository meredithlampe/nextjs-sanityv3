import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { MenuItem } from 'types'

interface NavbarProps {
  menuItems?: MenuItem[]
}

function MenuLink(props) {
  const menuItem = props.menuItem
  const href =
      menuItem?.link.type === 'internal'
        ? resolveHref(menuItem?.link?.page?._type, menuItem?.link?.page.slug)
        : menuItem?.link.url
  if (!href) {
    return null
  }
  return (
    <Link className={`text-lg hover:text-black md:text-xl`} href={href}>
      {menuItem.text}
    </Link>
  )
}

export function Navbar({ menuItems }: NavbarProps) {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32">
      {menuItems &&
        menuItems.map((menuItem, key) => <MenuLink menuItem={menuItem} />)}
    </div>
  )
}
