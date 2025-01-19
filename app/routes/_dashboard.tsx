import { LoaderFunctionArgs } from "@remix-run/node";
import { RequiresUserToBeLoggedIn } from "~/data/auth/auth.server";
import { Outlet } from "@remix-run/react";

/**
 * The dashboard layout, this is the layout of the dashboard pages
 * @returns 
 */
export default function Dashboard() {
    return <div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                style={{
                    clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-500 to-blue-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="max-w-6xl my-4 mx-auto">
                <Outlet />
            </div>
        </div>
}

/**
 * The loader for the dashboard page
 * @param request - The request object
 * @returns 
 */
export async function loader({ request }: LoaderFunctionArgs) {
    return RequiresUserToBeLoggedIn(request);
}