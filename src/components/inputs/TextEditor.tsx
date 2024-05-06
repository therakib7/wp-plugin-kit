/**
 * External dependencies.
 */

interface ITextEditor {
    id: string;
    value?: any;
    onChange?: (val: any) => void;
    placeholder?: string;
    height?: string;
}

export default function TextEditor({
    height = '200px',
    id,
    value,
    onChange,
    placeholder,
}: ITextEditor) {
    return (
        <>Text Area</>
    );
}
