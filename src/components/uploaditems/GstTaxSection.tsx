// import ExpandableSection from "./ExpandableSection";

// export default function GstTaxSection({
//   openSection,
//   toggleSection,
// }: {
//   openSection: string | null;
//   toggleSection: (s: string) => void;
// }) {
//   return (
//     <ExpandableSection
//       title="GST and Tax (Optional)"
//       section="gst"
//       openSection={openSection}
//       toggleSection={toggleSection}
//     >
//       <input
//         type="number"
//         name="gst"
//         placeholder="GST %"
//         className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//       />
//       <input
//         type="number"
//         name="otherTax"
//         placeholder="Other Tax %"
//         className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
//       />
//     </ExpandableSection>
//   );
// }



import ExpandableSection from "./ExpandableSection";

export default function GstTaxSection({
  openSection,
  toggleSection,
}: {
  openSection: string | null;
  toggleSection: (s: string) => void;
}) {
  return (
    <ExpandableSection
      title="GST and Tax (Optional)"
      section="gst"
      openSection={openSection}
      toggleSection={toggleSection}
    >
      <input
        type="number"
        name="gst"
        placeholder="GST %"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
      <input
        type="number"
        name="otherTax"
        placeholder="Other Tax %"
        className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500"
      />
    </ExpandableSection>
  );
}
