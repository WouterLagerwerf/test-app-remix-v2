import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import { ModalProps } from './modal.types'

/**
 * A modal component that is used to display a modal
 * @param title - The title of the modal
 * @param subtitle - The subtitle of the modal
 * @param open - Whether the modal is open
 * @param onClose - The function to call when the modal is closed
 * @param children - The children of the modal
 * @returns 
 */
const Modal: React.FC<ModalProps> = ({ title, subtitle, open, onClose, children }) => {
    if (!open) return null;

    return <Dialog open={open} onClose={onClose} className="relative z-10">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-500 data-[leave]:duration-500 data-[enter]:ease-out data-[leave]:ease-in"
    />

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <DialogPanel
          transition
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-400 data-[leave]:duration-400 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
        >
          <div>
            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
              {title}
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {subtitle}
              </p>
            </div>
          </div>
          {children}
        </DialogPanel>
      </div>
    </div>
  </Dialog>
}

export default Modal;

