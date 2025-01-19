type FormInput = {
    className?: string;
    label: string;
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
    defaultValue?: string;
    autoComplete: string;
}

type LinkButton = {
    className?: string;
    label: string;
    to: string;
}

type FormButton = {
    className?: string;
    label: string;
    type?: 'button' | 'submit' | 'reset';
}


type FormSecondaryButton = {
    className?: string;
    label: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

type FormTextarea = {
    className?: string;
    label: string;
    name: string;
    placeholder: string;
    required: boolean;
    autoComplete: string;
    defaultValue?: string;
}

type CheckboxProps = {  
    label: string;
    name: string;
    checked: boolean;
}

export type { FormInput, FormButton, LinkButton, FormSecondaryButton, FormTextarea, CheckboxProps }