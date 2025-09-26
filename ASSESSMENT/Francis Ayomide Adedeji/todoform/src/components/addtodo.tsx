import React, { useRef, useState } from "react";

type Props = {
    onAdd: (text: string) => void;
    placeholder?: string;
};

export default function AddTodo({ onAdd, placeholder = "Add New" }: Props) {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        onAdd(value.trim());
        setValue("");
        inputRef.current?.focus();
    };

    return (
        <form className="add-todo-form" onSubmit={submit}>
            <input
                className="add-input"
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className="btn" type="submit">Add</button>
        </form>
    );
}