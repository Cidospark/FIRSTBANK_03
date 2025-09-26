

export default function TodoInput({ onChange }: { onChange: (value: string) => void }) {
  return (
    <div className="todo-input">
      <input
        placeholder="Add New"
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            onChange((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
          }
        }}
      />
    </div>
  );
}
