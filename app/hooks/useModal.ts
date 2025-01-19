import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export function useModal() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState<any>(null)

    const openModal = (content: any) => {
        setModalContent(content)
        setIsOpen(true)
    }

    const closeModal = (redirect: string) => {
        setTimeout(() => {
            navigate(redirect)
        }, 200)

        setModalContent(null)
        setIsOpen(false)
    }
    
    return {
        isOpen,
        modalContent,
        openModal,
        closeModal,
    }
}