"use client";

import React from "react";
import { useGroups } from "@/lib/group.queries";
import { Listbox, ListboxItem, Link, ListboxSection } from "@nextui-org/react";
import { useParams, usePathname } from "next/navigation";

function DashboardSideNav() {
  const { data: groups } = useGroups();

  const pathname = usePathname();
  const { groupId } = useParams<{ groupId: string }>();

  const navSections = React.useMemo(() => [
    {
      showDivider: true,
      routes: [
        {
          href: "/dashboard",
          label: "Dashboard",
          isActive: pathname === "/dashboard",
        },
      ],
    },
    {
      showDivider: false,
      title: "Groups",
      routes: (groups || [])?.map((group) => ({
        href: `/dashboard/group/${group.id}`,
        label: group.display_name,
        isActive: group.id === groupId,
      })),
    }
  ], [groupId, groups, pathname]);

  return (
    <Listbox
      as="nav"
      aria-label="Nav"
      className="max-w-40 border-r"
      items={navSections}
    >
      {navSections.map(({ showDivider, routes, title }, i) =>
        <ListboxSection key={`nav-section-${i}`} title={title} showDivider={showDivider}>
          {routes.map((route) =>
            <ListboxItem
              key={route.href}
              href={route.href}
              variant="flat"
              className={`border border-transparent ${route.isActive ? "bg-slate-200" : ""}`}
            >
              {route.label}
            </ListboxItem>
          )}
        </ListboxSection>
      )}
    </Listbox>
  );
}

export { DashboardSideNav };
