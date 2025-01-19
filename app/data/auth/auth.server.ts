import { LoginFormData, LoginValidationErrors, RegisterFormData, RegisterValidationErrors, User } from "./auth.types";
import { AuthErrorMessages } from "./auth.enums";
import { PrismaError } from "~/utils/database/prisma.classes";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import prisma from "~/utils/database/prisma";
import { scryptSync } from "crypto";
import { randomBytes } from "crypto";

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: 'session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [process.env.SESSION_SECRET!],
        maxAge: 60 * 60 * 24 * 30,
    }
})

/**
 * Login a user
 * @param data - The login form data
 * @returns The redirect response
 */
export async function login({email, password}: LoginFormData): Promise<Response> {
    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new PrismaError(AuthErrorMessages.FAILED_INVALID_CREDENTIALS)
    }

    const isPasswordValid = verifyPassword(password, user.password);

    if (!isPasswordValid) {
        throw new PrismaError(AuthErrorMessages.FAILED_INVALID_CREDENTIALS)
    }

    return createUserSession(user.id, '/tasks');
}

/**
 * Register a new user
 * @param data - The register form data
 * @returns The registered user
 */
export async function register({email, password, confirmPassword}: RegisterFormData): Promise<Response> {
    email = email.trim().toLowerCase();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (password !== confirmPassword) {
        throw new Error(AuthErrorMessages.FAILED_INVALID_CREDENTIALS)
    }

    if (await findUserByEmail(email)) {
        throw new Error(AuthErrorMessages.FAILED_INVALID_CREDENTIALS)
    }

    const hash = hashPassword(password);
    const user = await prisma.user.create({ data: { email, password: hash } });
    return createUserSession(user.id, '/tasks');
}

/**
 * Get a user session
 * @param request - The request object
 * @returns The user session
 */
export async function getUserSession(request: Request): Promise<string | null> {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'))
    const userId = session.get('userId')
    if (!userId) {
        return null
    }
    return userId
}

/**
 * Logout a user
 * @param request - The request object
 * @returns The redirect response
 */
export async function logout(request: Request): Promise<Response> {
    return await destroyUserSession(request)
}

/**
 * Validate the login inputs
 * @param email - The email of the user
 * @param password - The password of the user
 * @returns The error if any
 */
export function validateLoginInputs(email: string, password: string): LoginValidationErrors {
   let errors: LoginValidationErrors = {};

   if (!isValidEmail(email)) {
    errors.email = 'Invalid email address';
   }

   if (password.length < 8) {
    errors.password = 'Password must be at least 6 characters long';
   }

   return errors;
}

/**
 * Validate the register inputs
 * @param email - The email of the user
 * @param password - The password of the user
 * @param confirmPassword - The confirm password of the user
 * @returns The error if any
 */
export function validateRegisterInputs(email: string, password: string, confirmPassword: string): RegisterValidationErrors {
    let errors: RegisterValidationErrors = {};

    if (!isValidEmail(email)) {
        errors.email = 'Invalid email address';
    }

    if (password.length < 8) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}

/**
 * Check if a user is logged in 
 * @param request - The request object
 * @returns True if the user is logged in, false otherwise
 */
export async function RequiresUserToBeLoggedIn(request: Request): Promise<Response | null> {
    const userId = await getUserSession(request);
    if (!userId) {
        return redirect('/login');
    }
    return null;
}

/**
 * Validate the email
 * @param email - The email of the user
 * @returns The error if any
 */
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/**
 * Create a user session
 * @param userId - The id of the user to create a session for
 * @param redirectTo - The URL to redirect to after creating the session
 * @returns The redirect response
 */
async function createUserSession(userId: string, redirectTo: string): Promise<Response> {
    const session = await sessionStorage.getSession()
    session.set('userId', userId)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session)
        }
    })
}

/**
 * Destroy a user session
 * @param request - The request object
 * @returns The redirect response
 */
async function destroyUserSession(request: Request): Promise<Response> {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'))
    return redirect('/login', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session)
        }
    })
}

/**
 * Find a user by email
 * @param email - The email of the user to find
 * @returns The user
 */
async function findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } })
}

/**
 * Function to hash a password with a generated salt
 * @param password - The password to hash
 * @returns The hashed password
 */
function hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

/**
 * Function to verify a password against a stored hash
 * @param password - The password to verify
 * @param storedHash - The stored hash to verify against
 * @returns True if the password is valid, false otherwise
 */
function verifyPassword(password: string, storedHash: string): boolean {
    const [salt, hash] = storedHash.split(':');
    const newHash = scryptSync(password, salt, 64).toString('hex');
    return newHash === hash;
}
