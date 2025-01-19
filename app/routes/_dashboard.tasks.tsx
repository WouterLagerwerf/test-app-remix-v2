import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import TaskList from "~/components/dashboard/TaskList";
import LinkButton from "~/components/forms/LinkButton";
import { getPaginatedTasks } from "~/data/tasks/tasks.server";
import { PaginatedTasks } from "~/data/tasks/tasks.types";

/**
 * The dashboard layout, this is the layout of the dashboard pages
 * @returns 
 */
export default function Dashboard() {
    const {openTasks, completedTasks} = useLoaderData<{openTasks: PaginatedTasks, completedTasks: PaginatedTasks}>()

    return <div className="h-[90vh]">
        <Outlet />
        <div className="flex my-2 justify-between">
            <h1 className="text-2xl font-bold">Open Tasks</h1>
            <LinkButton label="New task" to="/tasks/new" className="bg-gradient-to-r from-green-400 to-blue-500 w-40"/>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TaskList title="Open Tasks" tasks={openTasks}/>
            <TaskList title="Completed Tasks" tasks={completedTasks}/>
        </div>
    </div>
}

/**
 * The loader for the dashboard tasks page
 * @param params - The parameters of the page
 * @returns 
 */
export async function loader({  params }: LoaderFunctionArgs) {
    const page = parseInt(params.page || '1')
    const openTasks = await getPaginatedTasks(page, 10, 'open');
    const completedTasks = await getPaginatedTasks(page, 10, 'completed');
    return { openTasks, completedTasks };
}