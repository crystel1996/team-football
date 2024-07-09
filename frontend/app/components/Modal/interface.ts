export interface ModalInterface {
    textConfirm: string;
    textCancel: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    title: string;
    content: string;
    message?: string;
}