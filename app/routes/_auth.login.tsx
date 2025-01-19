import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import Input from "~/components/forms/Input";
import { validateLoginInputs } from "~/data/auth/auth.server";
import { login } from "~/data/auth/auth.server";
import { LoginValidationErrors } from "~/data/auth/auth.types";
import { useActionData } from "@remix-run/react";

/**
 * The login module displayed on /login, this is the form of the page
 * @returns 
 */
export default function Login() {
    const errors = useActionData<LoginValidationErrors>();
    return <>
            <div>
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10">
              <div>
                <Form method="POST" action="/login" className="space-y-6">
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

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Sign In
                    </button>
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
                    to="/register"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    Create an account
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

    const errors = validateLoginInputs(email as string, password as string);

    if (Object.keys(errors).length > 0) {
        return errors;
    }
    try {
        return await login({ email: email as string, password: password as string });
    } catch (error: any) {
        return { generic: error.message};
    }
}