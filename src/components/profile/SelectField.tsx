interface SelectFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SelectField({ label, value, onChange }: SelectFieldProps) {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
      >
        <option value="">Select Business Type</option>
        <option value="food">Food / Restaurant / Hotel</option>
        <option value="retail">Retail / Shop</option>
        <option value="service">Service</option>
        <option value="wholesale">Wholesale</option>
        <option value="manufacturing">Manufacturing</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
}
