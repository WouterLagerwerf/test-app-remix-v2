// Remix
import {Form, useLoaderData, useActionData, redirect } from '@remix-run/react'
import { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { useEffect } from 'react'

// Components
import Button from '~/components/forms/Button'
import SecondaryButton from '~/components/forms/SecondaryButton'
import Input from '~/components/forms/Input'
import Textarea from '~/components/forms/Textarea'
import Modal from '~/components/modals/modal'
import Checkbox from '~/components/forms/Checkbox'

// Hooks
import { useModal } from '~/hooks/useModal'

// Data
import { getTaskById, updateTask } from '~/data/tasks/tasks.server' 
import { validateUpdateTaskInputs } from '~/data/tasks/tasks.server'

// Types
import { Task, UpdateTaskValidationErrors } from '~/data/tasks/tasks.types'

/**
 * The update form of a task
 * @returns 
 */
export default function UpdateTask() {
  const task = useLoaderData<Task>()
  const { isOpen, modalContent, openModal, closeModal } = useModal()

  const errors = useActionData<UpdateTaskValidationErrors>()

  useEffect(() => {
    openModal(task)
  }, [])

  return (
    <Modal 
        title={`Inspect Task ${modalContent?.title}`} 
        subtitle="Update or modify the task details here."
        open={isOpen}
        onClose={() => closeModal('/tasks')}
        >
            <Form action={`/tasks/${task.id}`} method="post" className="mt-5 space-y-4 sm:mt-6">

            <Input type="text" label="Title" name="title" placeholder="Title" required={true} defaultValue={task.title} autoComplete="off" />
            {
                errors?.title && <p className="text-red-500 text-xs">{errors.title}</p>
            }
            <Textarea label="Description" name="description" placeholder="Description" required={true} defaultValue={task.description} autoComplete="off" />
            {
                errors?.description && <p className="text-red-500 text-xs">{errors.description}</p>
            }
            
            <Checkbox label="Completed" name="completed" checked={task.completed} />
            {
                errors?.completed && <p className="text-red-500 text-xs">{errors.completed}</p>
            }

            <div className="flex my-2 justify-between space-x-2">
                <Button type="submit" label="Update Task" />
                <SecondaryButton type="button" label="Cancel" onClick={() => closeModal('/tasks')} />
            </div>
        </Form>
    </Modal>
  )
}

export function ErrorBoundary() {
    return <div>Error</div>
}

export async function loader({ params }: LoaderFunctionArgs) {
    const task = await getTaskById(params.id as string)

    if (! task) {
        throw new Error('Task not found')
    }

    return task
}

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData()
    const title = formData.get('title')
    const description = formData.get('description')
    const completed = formData.get('completed') === 'on'
    const errors = validateUpdateTaskInputs(title as string, description as string, completed);

    if (Object.keys(errors).length > 0) {
        return errors;
    }
    try {
        await updateTask({ 
            id: params.id as string, 
            title: title as string, 
            description: description as string, 
            completed: completed ? true : false
        });
        return redirect(`/tasks`)
    } catch (error: any) {
        return { generic: error.message };
    }    
}