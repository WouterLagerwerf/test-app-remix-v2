import { FormButton } from "./forms.types";

/**
 * A button component that is used to submit a form
 * @param className - The class name of the button
 * @param label - The label of the button
 * @param type - The type of the button
 * @returns 
 */
export default function Button({ className, label, type }: FormButton) {
    const classes = `flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${className}`
    return <button type={type} className={classes}>{label}</button>
}   