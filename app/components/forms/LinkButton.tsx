import { LinkButton as LinkButtonType } from "./forms.types";
import { Link } from "@remix-run/react";

/**
 * A link button component that is used to navigate to a different page
 * @param className - The class name of the link button
 * @param label - The label of the link button
 * @param to - The URL to navigate to
 * @returns 
 */
export default function LinkButton({ className, label, to }: LinkButtonType ) {
    const classes = `flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${className}`
    return <Link to={to} className={classes}>{label}</Link>
}   