"use client";

import Link from "next/link";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import {Skeleton} from '@/app/components'

const Navbar = () => {
  
  return (
    <nav className="px-5 mb-4 border-b py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <NavLinks/>
          </Flex>

          <AuthStatus/>
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus= ()=>{
    const { status, data: session } = useSession();

    if(status=== "loading") return <Skeleton width="3rem"/>

    if(status === "unauthenticated")
        return <Link href="/api/auth/signin">Login</Link>

    return <Box>
        <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
            />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
  </Box>
}

const NavLinks= ()=>{
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
      ];
      const currentPath = usePathname();
    return <ul className="flex px-4 space-x-14">
    {links.map((each) => (
      <li key={each.href}>
        <Link
          href={each.href}
          className={classNames({
            'nav-link': true,
            "!text-zinc-900": each.href === currentPath,
          })}
        >
          {each.label}
        </Link>
      </li>
    ))}
  </ul>
}

export default Navbar;
