"use client"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../(Kambaz)/store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  return (
    <Nav variant="pills" id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/Account/${link}`}
            active={pathname.endsWith(link.toLowerCase())}
            id={`wd-account-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              pathname === `/Account/${link}` ? "active" : "text-danger"
            }`}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}

      {currentUser && currentUser.role === "ADMIN" && (
        <NavLink as={Link} href={`/Account/Users`} active={pathname.endsWith('Users')}>
          Users
        </NavLink>
      )}
    </Nav>
  );
}