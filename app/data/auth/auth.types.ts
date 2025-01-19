type User = {
    id: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

type LoginFormData = {
    email: string,
    password: string,
}

type RegisterFormData = {
    email: string,
    password: string,
    confirmPassword: string,
}

type LoginValidationErrors = {
    email?: string,
    password?: string,
    generic?: string,
}

type RegisterValidationErrors = {
    email?: string,
    password?: string,
    confirmPassword?: string,
    generic?: string,
}

export type { User, LoginFormData, RegisterFormData, LoginValidationErrors, RegisterValidationErrors }
