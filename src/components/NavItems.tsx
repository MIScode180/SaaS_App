"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Learing Liabrary", href: "/liabrary"},
  { label: "My Progress", href: "/my-profile" },
];

export default function NavItems() {
  const pathName = usePathname();
  return (
    <>
      <nav className="flex items-center gap-4">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              pathName === href
                ? "text-primary"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
