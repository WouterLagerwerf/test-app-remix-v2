type ModalProps = {
    title: string;
    subtitle: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export type { ModalProps }