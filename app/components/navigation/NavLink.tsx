import { NavLinkProps } from "./navigation.types";

/**
 * A navigation link component that is used to navigate to a different page
 * @param href - The URL to navigate to
 * @param children - The children of the navigation link
 * @param className - The class name of the navigation link
 * @returns 
 */
export default function NavLink({ href, children, className }: NavLinkProps) {
    return <a href={href} className={className}>{children}</a>
}