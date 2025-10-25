import { AppShell, Box, Button, NavLink, Stack, Text } from "@mantine/core";
import { Link } from "react-router";

interface NavbarProps {
  opened: boolean;
  close: () => void;
  navItems: { label: string; href: string; }[];
}

export function Navbar({ opened, close, navItems }: NavbarProps) {
  NavLink
  return (
    <AppShell.Navbar p="md">
      <Stack gap="xs">
        <Text size="sm" fw={600} c="dimmed" mb="sm">
          MENU
        </Text>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            label={item.label}
            component={Link}
            to={item.href}
            onClick={close}
            style={{
              borderRadius: '8px',
            }}
          />
        ))}

        <Box mt="xl" pt="xl" style={{ borderTop: '1px solid #e9ecef' }}>
          <Stack gap="xs">
            <Button
              variant="light"
              fullWidth
            >
              Login
            </Button>
            <Button
              fullWidth
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Stack>
    </AppShell.Navbar>
  );
}