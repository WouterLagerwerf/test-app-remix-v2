import { CheckboxProps } from './forms.types'

/**
 * A checkbox component that is used to select a task
 * @param label - The label of the checkbox
 * @param name - The name of the checkbox
 * @param checked - Whether the checkbox is checked
 * @returns 
 */
export default function Checkbox({ label, name, checked, }: CheckboxProps) {
    const classes = "block text-sm/6 font-medium text-gray-900";
    return <div>
        <label htmlFor={name} className={classes}>
            <input type="checkbox" name={name} defaultChecked={checked} className="mr-2"/>
            {label}
        </label>
    </div>
}