// import ExpandableSection from "./ExpandableSection";

// export default function InventorySection({
//   openSection,
//   toggleSection,
// }: {
//   openSection: string | null;
//   toggleSection: (s: string) => void;
// }) {
//   return (
//     <ExpandableSection
//       title="Inventory Details (Optional)"
//       section="inventory"
//       openSection={openSection}
//       toggleSection={toggleSection}
//     >
//       <input
//         type="number"
//         name="openingStock"
//         placeholder="Opening Stock"
//         className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//       />
//       <input
//         type="number"
//         name="reorderLevel"
//         placeholder="Reorder Level"
//         className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//       />
//     </ExpandableSection>
//   );
// }




import ExpandableSection from "./ExpandableSection";

export default function InventorySection({
  openSection,
  toggleSection,
}: {
  openSection: string | null;
  toggleSection: (s: string) => void;
}) {
  return (
    <ExpandableSection
      title="Inventory Details (Optional)"
      section="inventory"
      openSection={openSection}
      toggleSection={toggleSection}
    >
      <input
        type="number"
        name="openingStock"
        placeholder="Opening Stock"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
      <input
        type="number"
        name="currentStock"
        placeholder="Current Stock"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
      <input
        type="number"
        name="reorderLevel"
        placeholder="Reorder Level"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
    </ExpandableSection>
  );
}
