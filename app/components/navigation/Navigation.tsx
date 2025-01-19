import { Form } from "@remix-run/react";
import { NavigationItem } from "./navigation.types";
import NavLink from "./NavLink";

const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
]

/**
 * A navigation component that is used to display the navigation bar
 * @param userSession - The user session
 * @returns 
 */
export default function Navigation({ userSession }: { userSession: number | null }) {
    return <header className="sticky inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex max-w-6xl my-6 *:mx-auto items-center justify-between">
            <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                    <NavLink key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                        {item.name}
                    </NavLink>
                ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {
                    userSession ? (
                        <Form method="post" action="/logout">
                            <button type="submit" className="text-sm/6 font-semibold text-gray-900">
                                Log out <span aria-hidden="true">&rarr;</span>
                            </button>
                        </Form>
                    ) : (
                        <NavLink href="/login" className="text-sm/6 font-semibold text-gray-900">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </NavLink>
                    )
                }
            </div>
        </nav>
    </header>
}