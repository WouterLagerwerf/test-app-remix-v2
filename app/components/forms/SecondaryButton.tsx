import { FormSecondaryButton } from "./forms.types";

/**
 * A secondary button component that is used to submit a form
 * @param className - The class name of the button
 * @param label - The label of the button
 * @param type - The type of the button
 * @param onClick - The function to call when the button is clicked
 * @returns 
 */
export default function SecondaryButton({ className, label, type, onClick }: FormSecondaryButton) {
    const classes = `flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${className}`
    return <button type={type} className={classes} onClick={onClick}>{label}</button>
}   