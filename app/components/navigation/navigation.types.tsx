type NavigationItem = {
    name: string;
    href: string;
}

type NavLinkProps = {
    href: string;
    className?: string;
    children: React.ReactNode;
}

export type { NavigationItem, NavLinkProps };