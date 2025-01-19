import { logout } from "~/data/auth/auth.server";
import { ActionFunctionArgs } from "@remix-run/node";

/**
 * The logout action, this is the action of the logout page
 * @param request - The request object
 * @returns 
 */
export async function action({ request }: ActionFunctionArgs) {
    return logout(request);
}