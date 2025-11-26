// "use client";

// interface InputProps {
//   type?: string;
//   placeholder: string;
//   value: string;
//   onChange: (value: string) => void;
//   label?: string;
// }

// export default function InputField({
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   label,
// }: InputProps) {
//   return (
//     <div className="flex flex-col space-y-2 bg-white p-4 rounded-xl shadow-sm">
//       {label && (
//         <label className="text-sm font-semibold text-gray-800">
//           {label}
//         </label>
//       )}
//       <input
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
//       />
//     </div>
//   );
// }















"use client";

interface InputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function InputField({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
}: InputProps) {
  return (
    <div className="flex flex-col space-y-2 bg-white p-4 rounded-xl shadow-sm">
      {label && (
        <label className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
      />
    </div>
  );
}
