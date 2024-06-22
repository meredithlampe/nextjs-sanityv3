import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { MenuItem } from 'types'

interface NavbarProps {
  menuItems?: MenuItem[]
}

function MenuLink(props: {menuItem: MenuItem}) {
  const menuItem = props.menuItem
  const href =
    menuItem.link.type === 'internal'
      ? resolveHref(menuItem?.link.page?.type, menuItem?.link?.page.slug)
      : menuItem.link.url
  if (!href) {
    return null
  }
  return (
    <Link href={href}>
      {menuItem.text}
    </Link>
  )
}

export function Navbar({ menuItems }: NavbarProps) {
  return (
    <div className="sticky top-0 z-10">
      {menuItems &&
        menuItems.map((menuItem, key) => <div key={key}><MenuLink menuItem={menuItem} /></div>)}
    </div>
  )
}
