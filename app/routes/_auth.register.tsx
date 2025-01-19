import { Form, Link } from "@remix-run/react";
import Input from "~/components/forms/Input";
import Button from "~/components/forms/Button";
import { RegisterValidationErrors } from "~/data/auth/auth.types";
import { useActionData } from "@remix-run/react";
import { validateRegisterInputs, register } from "~/data/auth/auth.server";
import { ActionFunctionArgs } from "@remix-run/node";

/**
 * The register module displayed on /register, this is the form of the page
 * @returns 
 */
export default function Register() {
    const errors = useActionData<RegisterValidationErrors>();
    return <>
            <div>
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10">
              <div>
                <Form method="POST" className="space-y-6">
                  {
                    errors?.generic && (
                      <div className="bg-red-400 border border-red-500 text-red-100 p-4 rounded">
                        {errors.generic}
                      </div>
                    )
                }
                    <Input label="Email address" name="email" type="email" placeholder="Email address" required autoComplete="email" />
                    {
                      errors?.email && <p className="text-red-500 text-xs">{errors.email}</p>
                    }
                    <Input label="Password" name="password" type="password" placeholder="Password" required autoComplete="current-password" />
                    {
                      errors?.password && <p className="text-red-500 text-xs">{errors.password}</p>
                    }
                    <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm Password" required autoComplete="current-password" />
                    {
                      errors?.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                    }

                    <div>
                        <Button label="Sign in" type="submit" />
                    </div>
                </Form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm/6 font-medium">
                    <span className="bg-white px-6 text-gray-900">Or</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <Link
                    to="/login"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    Sign in to your account
                  </Link>
                </div>
              </div>
            </div>
    </>;
}

/**
 * Validate the inputs and return the error if any
 * @param request 
 * @returns 
 */
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const errors = validateRegisterInputs(email as string, password as string, confirmPassword as string);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        return await register({ email: email as string, password: password as string, confirmPassword: confirmPassword as string });
    } catch (error: any) {
        return { generic: error.message};
    }
}