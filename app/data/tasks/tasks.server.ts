import prisma from "~/utils/database/prisma";
import { PrismaError } from "~/utils/database/prisma.classes";
import { PrismaErrorMessages } from "./tasks.enums";
import { NewTaskFormData, UpdateTaskFormData, PaginatedTasks, Task } from "./tasks.types";

/**
 * Get paginated Tasks from the database
 * @param page - The page number to get
 * @param pageSize - The number of tasks to get per page
 * @returns An array of tasks
 */
export async function getPaginatedTasks(page: number, pageSize: number, status: string): Promise<PaginatedTasks> {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                completed: status === 'open' ? false : true
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                author: true,
                contributors: true,
            },
        })
        const total = await prisma.task.count()
        return {
            page,
            firstPage: 1,
            lastPage: Math.ceil(total / pageSize),
            total,
            tasks
        }
    } catch (error) {
        throw new PrismaError(PrismaErrorMessages.FAILED_PAGINATED_TASKS)
    }
}

/**
 * Create a new task in the database
 * @param task - The task to create
 * @returns The created task
 */
export async function createTask(task: NewTaskFormData): Promise<Task> {
    try {
        const newTask = await prisma.task.create({
            data: task
        })

        return await findTaskById(newTask.id)
    } catch (error) {
        throw new PrismaError(PrismaErrorMessages.FAILED_CREATING_TASK)
    }
}

/**
 * Get a task by its id
 * @param id - The id of the task to get
 * @returns The task
 */
export async function getTaskById(id: string): Promise<Task> {
    return await findTaskById(id)
}


/**
 * Update a task in the database
 * @param task - The task to update
 * @returns The updated task
 */
export async function updateTask(task: UpdateTaskFormData   ): Promise<Task> {
    try {
        const updatedTask = await prisma.task.update({
            where: { id: task.id },
            data: {
                title: task.title,
                description: task.description,
                completed: task.completed,
            }
        })
        return await findTaskById(updatedTask.id)
    } catch (error) {
        throw new PrismaError(PrismaErrorMessages.FAILED_UPDATING_TASK)
    }
}

/**
 * Find a task by its id
 * @param id - The id of the task to find
 * @returns The task
 */
export async function findTaskById(id: string): Promise<Task> {
    try {
        const task = await prisma.task.findUnique({ where: { id }, include: { author: true, contributors: true } })
        if (! task) {
            throw new PrismaError(PrismaErrorMessages.FAILED_FINDING_TASK)
        }
        return task
    } catch (error) {
        throw new PrismaError(PrismaErrorMessages.FAILED_FINDING_TASK)
    }
}

/**
 * Delete a task from the database
 * @param id - The id of the task to delete
 */
export async function deleteTask(id: string): Promise<void> {
    try {
        await prisma.task.delete({ where: { id } })
    } catch (error) {
        throw new PrismaError(PrismaErrorMessages.FAILED_DELETING_TASK)
    }
}

/**
 * Validate the inputs for creating a task
 * @param title - The title of the task
 * @param description - The description of the task
 * @param authorId - The id of the author of the task
 * @returns The errors
 */
export async function validateCreateTaskInputs(title: string, description: string, authorId: string): Promise<{ [key: string]: string }> {
    const errors: { [key: string]: string } = {}
    if (!title) errors.title = "Title is required"
    if (!description) errors.description = "Description is required"
    if (!authorId) errors.authorId = "Author is required"
    return errors
}

/**
 * Validate the inputs for updating a task
 * @param title - The title of the task
 * @param description - The description of the task
 * @param authorId - The id of the author of the task
 * @returns The errors
 */
export async function validateUpdateTaskInputs(title: string, description: string, completed: boolean): Promise<{ [key: string]: string }> {
    const errors: { [key: string]: string } = {}
    if (!title) errors.title = "Title is required"
    if (!description) errors.description = "Description is required"
    if (completed === undefined) errors.completed = "Completed is required"
    return errors
}