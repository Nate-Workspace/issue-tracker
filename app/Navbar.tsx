"use client";

import Link from "next/link";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  console.log(currentPath);
  return (
    <nav className="flex px-5 space-x-6 mb-4 items-center border-b h-14">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex px-4 space-x-14">
        {links.map((each) => (
          <li key={each.href}>
            <Link
              href={each.href}
              className={classNames({
                "text-zinc-500": each.href !== currentPath,
                "text-zinc-900": each.href == currentPath,
                "hover:text-zinc-800 transition-colors hover:cursor-pointer":
                  true,
              })}
            >
              {each.label}
            </Link>
          </li>
        ))}
      </ul>

      <Box>
        {status=== "authenticated" && (<Link href='/api/auth/signout'>Logout</Link>)}
        {status === "unauthenticated" && (<Link href='/api/auth/signin'>Login</Link>)}
      </Box>
    </nav>
  );
};

export default Navbar;
