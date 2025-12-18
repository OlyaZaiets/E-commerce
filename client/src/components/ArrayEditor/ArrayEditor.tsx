import './ArrayEditor.scss';

interface Props {
  label: string;
  values: string[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (values: string[]) => void;
}

export const ArrayEditor = ({
  label,
  values,
  placeholder,
  disabled,
  onChange,
}: Props) => {
  const handleAdd = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) return;

    onChange([...values, trimmed]);
  };

  const handleRemove = (value: string) => {
    onChange(values.filter(v => v !== value));
  };

  return (
    <div className='array-editor'>
      <label>{label}</label>

      <input
        type='text'
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />

      <ul className='array-editor__list'>
        {values.map((value) => (
          <li key={value} className='array-editor__item'>
            <span>{value}</span>
            <button
              type='button'
              onClick={() => handleRemove(value)}
              disabled={disabled}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
