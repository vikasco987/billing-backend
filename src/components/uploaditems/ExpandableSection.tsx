import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExpandableSection({
  title,
  section,
  openSection,
  toggleSection,
  children,
}: {
  title: string;
  section: string;
  openSection: string | null;
  toggleSection: (s: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => toggleSection(section)}
        className="flex justify-between w-full border border-purple-300 rounded-lg px-4 py-3 text-purple-700 font-medium hover:bg-purple-50 transition bg-gray-50"
      >
        {title}
        {openSection === section ? <ChevronUp /> : <ChevronDown />}
      </button>
      {openSection === section && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}
