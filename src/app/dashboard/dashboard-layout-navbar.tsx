"use client";

import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent
} from "@nextui-org/react";
import { logout } from "./actions";

function DashboardNavbar() {

  const onLogout = React.useCallback(async () => {
    await logout();
  }, []);
  
  return (
    <Navbar
      isBordered
      isBlurred={false}
      maxWidth="full"
      classNames={{
        base: "h-[60px]"
      }}
    >
      <NavbarBrand className="font-bold text-2xl">CHORG</NavbarBrand>
      <NavbarContent justify="end">
        <Button
          size="sm"
          radius="sm"
          variant="light"
          className="text-sm"
          onPress={onLogout}
        >
          Logout
        </Button>
      </NavbarContent>
    </Navbar>
  )
}

export { DashboardNavbar };
