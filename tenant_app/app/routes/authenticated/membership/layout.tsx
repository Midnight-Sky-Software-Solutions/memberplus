import { Link, Outlet, useLocation } from "react-router";

const menuItems = (location: string): { label: string, href: string, id: string, active: boolean }[] => [
  {
    id: "Summary",
    label: "Summary",
    href: "/membership",
    active: location === '/membership'
  },
  {
    id: "Levels",
    label: "Levels",
    href: "/membership/levels",
    active: location.startsWith("/membership/levels")
  }
]

export default function Membership() {
  const { pathname: location } = useLocation();

  return (
    <>
      <div className="w-full p-tabmenu p-component">
        <ul className="p-tabmenu-nav p-reset" role="menubar" data-pc-section="menu">
          {menuItems(location).map(mi => (
            <TabMenuItem {...mi} />
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
}

function TabMenuItem({
  label,
  href,
  id,
  active
}: {
  label: string,
  href: string,
  id: string,
  active: boolean
}) {
  return (
    <li id={id} className={`p-tabmenuitem ${active ? 'p-highlight' : ''}`} role="presentation" data-p-highlight="false" data-p-disabled="false" data-pc-section="menuitem">
      <Link to={href} role="menuitem" aria-label="Summary" tabIndex={-1} className="p-menuitem-link" data-pc-section="action">
        <span className="p-menuitem-text" data-pc-section="label">{label}</span>
      </Link>
    </li>
  );
}
