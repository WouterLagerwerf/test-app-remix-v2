import { User } from "../auth/auth.types";

type NewTaskFormData = {
    title: string,
    description: string,
    authorId: string,   
}

type PaginatedTasks = {
    page: number,
    firstPage: number,
    lastPage: number,
    total: number, 
    tasks: Task[]
}

type Task = {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date,
    authorId: string,
    author: User,
    contributors: User[]
}

type UpdateTaskFormData = {
    id: string,
    title?: string,
    description?: string,
    completed?: boolean,
}

type TaskValidationErrors = {
    title?: string,
    description?: string,
    authorId?: string,
}

type UpdateTaskValidationErrors = {
    title?: string,
    description?: string,
    completed?: string,
}

interface TaskListProps {
    title: string;
    tasks: PaginatedTasks;
}

export type { NewTaskFormData, UpdateTaskFormData, Task, PaginatedTasks, TaskValidationErrors, UpdateTaskValidationErrors, TaskListProps }