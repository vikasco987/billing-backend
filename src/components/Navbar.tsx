// // components/Navbar.tsx
// "use client";

// import Link from "next/link";
// import { UserButton, useUser } from "@clerk/nextjs";

// export default function Navbar() {
//   const { user } = useUser();

//   return (
//     <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-4 shadow-md">
//       {/* Left Side - Logo */}
//       <div className="text-xl font-bold">
//         <Link href="/">MyApp</Link>
//       </div>

//       {/* Right Side */}
//       <div className="flex items-center gap-4">
//         {!user && (
//           <>
//             <Link href="/sign-in" className="hover:underline">
//               Sign In
//             </Link>
//             <Link href="/sign-up" className="hover:underline">
//               Sign Up
//             </Link>
//           </>
//         )}

//         {user && (
//           <div className="flex items-center gap-3">
//             <span>
//               {user.fullName || user.primaryEmailAddress?.emailAddress}
//             </span>
//             <span className="text-sm text-gray-400">
//               Role: {user.publicMetadata.role || "User"}
//             </span>
//             <UserButton afterSignOutUrl="/" />
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }













// components/Navbar.tsx
"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-4 shadow-md">
      {/* Left Side - Logo */}
      <div className="text-xl font-bold">
        <Link href="/">MyApp</Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link href="/sign-in" className="hover:underline">
              Sign In
            </Link>
            <Link href="/sign-up" className="hover:underline">
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <span>
              {user.fullName || user.primaryEmailAddress?.emailAddress}
            </span>
            <span className="text-sm text-gray-400">
              Role: {String(user?.publicMetadata?.role || "User")}
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </nav>
  );
}
