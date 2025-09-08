interface InputProps {
  type?: string;
  placeholder: string;
}

export default function InputField({ type = "text", placeholder }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 border rounded-lg"
    />
  );
}
