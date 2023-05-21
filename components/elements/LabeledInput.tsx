import React from 'react';

interface LabeledInputProps {
  label: string;
  placeholder: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export default function LabeledInput(props: LabeledInputProps) {
  return (
    <label className="flex flex-col w-full">
      <span className="text-lg">{props.label}</span>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className="w-full p-2 rounded-md text-neutral-800 placeholder:text-neutral-600 placeholder:text-opacity-50"
      />
    </label>
  );
}
