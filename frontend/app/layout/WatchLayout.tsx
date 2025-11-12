import { Outlet } from "react-router";
import { AppShell } from "@mantine/core";

export default function WatchAnimeLayout() {
  return (
    <AppShell>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
