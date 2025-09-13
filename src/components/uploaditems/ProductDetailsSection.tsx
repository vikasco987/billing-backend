// import ExpandableSection from "./ExpandableSection";

// export default function ProductDetailsSection({
//   openSection,
//   toggleSection,
// }: {
//   openSection: string | null;
//   toggleSection: (s: string) => void;
// }) {
//   return (
//     <ExpandableSection
//       title="Product Details (Optional)"
//       section="details"
//       openSection={openSection}
//       toggleSection={toggleSection}
//     >
//       <input
//         type="text"
//         name="brand"
//         placeholder="Brand"
//         className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//       />
//       <input
//         type="text"
//         name="model"
//         placeholder="Model/Size/Color"
//         className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//       />
//       <textarea
//         name="description"
//         placeholder="Description"
//         className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//       />
//     </ExpandableSection>
//   );
// }


import ExpandableSection from "./ExpandableSection";

export default function ProductDetailsSection({
  openSection,
  toggleSection,
}: {
  openSection: string | null;
  toggleSection: (s: string) => void;
}) {
  return (
    <ExpandableSection
      title="Product Details (Optional)"
      section="details"
      openSection={openSection}
      toggleSection={toggleSection}
    >
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
      <input
        type="text"
        name="size"
        placeholder="Size"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
    </ExpandableSection>
  );
}
