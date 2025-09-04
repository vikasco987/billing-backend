import ExpandableSection from "./ExpandableSection";

export default function DisplaySection({
  openSection,
  toggleSection,
}: {
  openSection: string | null;
  toggleSection: (s: string) => void;
}) {
  return (
    <ExpandableSection
      title="Product Display (Optional)"
      section="display"
      openSection={openSection}
      toggleSection={toggleSection}
    >
      <input
        type="text"
        name="displayCategory"
        placeholder="Display Category"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
      <input
        type="color"
        name="displayColor"
        className="w-full border rounded-lg px-4 py-2 h-12"
      />
    </ExpandableSection>
  );
}
