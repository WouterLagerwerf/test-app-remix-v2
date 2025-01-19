import { Link } from "@remix-run/react";
import { TaskListProps } from "~/data/tasks/tasks.types";

/**
 * A list of task components that are displayed in the dashboard
 * @param title - The title of the task list
 * @param tasks - The tasks to display
 * @returns 
 */
export default function TaskList({ title, tasks }: TaskListProps) {
    return (
        <div className="bg-gray-100 shadow-lg rounded-lg h-full w-full p-4">
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <ul className="space-y-2">
                    {tasks.tasks.map(task => (
                        <div className="bg-white w-full p-3 hover:bg-gray-200 rounded shadow">
                            <Link key={task.id} to={`/tasks/${task.id}`}>
                                <h2 className="font-semibold">{task.title}</h2>
                                <p>{task.description}</p>
                                <span className={`text-sm ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
                                    {task.completed ? 'Completed' : 'Pending'}
                                </span>
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}