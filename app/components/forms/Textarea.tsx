import { FormTextarea } from "./forms.types";

/**
 * A textarea component that is used to input data into a form
 * @param className - The class name of the textarea
 * @param defaultValue - The default value of the textarea
 * @param label - The label of the textarea
 * @param name - The name of the textarea
 * @param placeholder - The placeholder of the textarea
 * @param required - Whether the textarea is required
 * @param autoComplete - The auto complete of the textarea
 * @returns 
 */
export default function Textarea({ className, defaultValue, label, name, placeholder, required, autoComplete }: FormTextarea) {
    const classes = `block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6 ${className}`
    return <div>
        <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
        {label}
        </label>
        <div className="mt-2">
            <textarea
                defaultValue={defaultValue}
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                className={classes}
            />
        </div>
    </div>
}