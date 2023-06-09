interface LabeledInputProps {
  label: string;
  placeholder: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  autoComplete?: 'on' | 'off';

  onClick?: () => void;
}

export default function LabeledInput({
  autoComplete = 'off',
  ...props
}: LabeledInputProps) {
  return (
    <label className="flex w-full flex-col">
      <span className="text-lg">{props.label}</span>
      <input
        onClick={props.onClick}
        autoComplete={autoComplete}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className="w-full rounded-md p-2 text-neutral-800 placeholder:text-neutral-600 placeholder:text-opacity-50"
      />
    </label>
  );
}
