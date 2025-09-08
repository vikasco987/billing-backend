"use client";
import ProfileImage from "./ProfileImage";
import InputField from "./InputField";
import SelectField from "./SelectField";
import FileUpload from "./FileUpload";

export default function ProfileForm() {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
      {/* Profile Image */}
      <ProfileImage />

      <h2 className="text-lg font-bold text-center">Bill Book</h2>

      <form className="space-y-4">
        <SelectField />

        <InputField placeholder="Business Name" />
        <InputField placeholder="Business Tag Line" />
        <InputField placeholder="Contact Person Name" />
        <InputField placeholder="Contact Person Phone" />
        <InputField type="email" placeholder="Contact Person Email" />

        <button type="button" className="w-full p-3 border rounded-lg text-left">
          Business Details
        </button>
        <button type="button" className="w-full p-3 border rounded-lg text-left">
          Bank Details (Accept Online Payments)
        </button>

        <InputField placeholder="UPI" />
        <InputField placeholder="Google Review Link / URL" />
        <InputField placeholder="Custom Fields" />

        <FileUpload label="Signature" />
        <FileUpload label="Lucky Image" />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
