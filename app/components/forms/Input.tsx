import { FormInput } from "./forms.types";

/**
 * An input component that is used to input data into a form
 * @param className - The class name of the input
 * @param defaultValue - The default value of the input
 * @param label - The label of the input
 * @param name - The name of the input
 * @param type - The type of the input
 * @param placeholder - The placeholder of the input
 * @param required - Whether the input is required
 * @param autoComplete - The auto complete of the input
 * @returns 
 */
export default function Input({ className, defaultValue,label, name, type, placeholder, required, autoComplete }: FormInput) {
    const classes = `block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6 ${className}`
    return <div>
        <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
        {label}
        </label>
        <div className="mt-2">
        <input
            id={name}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            type={type}
            required={required}
            autoComplete={autoComplete}
            className={classes}
        />
        </div>
    </div>
}