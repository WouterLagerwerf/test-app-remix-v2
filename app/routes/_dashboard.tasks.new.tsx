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

// Hooks
import { useModal } from '~/hooks/useModal'

// Data
import { getUserSession } from '~/data/auth/auth.server' 
import { createTask, validateCreateTaskInputs } from '~/data/tasks/tasks.server'

// Types
import { TaskValidationErrors } from '~/data/tasks/tasks.types'

/**
 * The create form of a task
 * @returns 
 */
export default function NewTask() {
  const userId = useLoaderData<string>()
  const errors = useActionData<TaskValidationErrors>()
  const { isOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    openModal(null)
  }, [])

  return (
    <Modal 
        title="New Task" 
        subtitle="Please fill in the details for your new task."
        open={isOpen}
        onClose={() => closeModal('/tasks')}
        >
            <Form action="/tasks/new" method="post" className="mt-5 space-y-4 sm:mt-6">

            <Input type="text" label="Title" name="title" placeholder="Title" required={true} autoComplete="off" />
            {
                errors?.title && <p className="text-red-500 text-xs">{errors.title}</p>
            }
            <Textarea label="Description" name="description" placeholder="Description" required={true} autoComplete="off" />
            {
                errors?.description && <p className="text-red-500 text-xs">{errors.description}</p>
            }
            <input type="hidden" name="authorId" value={userId} />
            {
                errors?.authorId && <p className="text-red-500 text-xs">{errors.authorId}</p>
            }

            <div className="flex my-2 justify-between space-x-2">
                <Button type="submit" label="Create Task" />
                <SecondaryButton type="button" label="Cancel" onClick={() => closeModal('/tasks')} />
            </div>
        </Form>
    </Modal>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
    return <div>Error</div>
}

export async function loader({ request }: LoaderFunctionArgs) {
    return await getUserSession(request)
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const title = formData.get('title')
    const description = formData.get('description')
    const authorId = formData.get('authorId')

    const errors = validateCreateTaskInputs(title as string, description as string, authorId as string);

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        const task = await createTask({ title: title as string, description: description as string, authorId: authorId as string });
        return redirect(`/tasks/${task.id}`)
    } catch (error: any) {
        return { generic: error.message};
    }    
}