import { AppShell, Box, Burger, Button, Flex, Group, Text } from '@mantine/core'
import { Search, Bell, ChevronDown } from 'lucide-react'

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
  navItems: { label: string, href: string }[]
}

export function Header({ opened, toggle, navItems }: HeaderProps) {
  return (
    <AppShell.Header>
      <Group h="100%" px="xl" justify="flex-start">
        {/* Logo */}
        <Group>
          <Box style={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #667eea 0%,  #764ba2 100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            AS
          </Box>
          <Text size="xl" fw={700} pb="2px" className="logo-text" c="red">
            Anime Streaming
          </Text>
        </Group>

        {/* Desktop Navigation */}
        <Group gap="xs" visibleFrom="md">
          <Flex gap="xs" align="center" justify="flex-start">
            {navItems.map((item) => (
              <Button
                key={item.label}
                component="a"
                variant="subtle"
                href={item.href}
              >
                {item.label}
              </Button>
            ))}
          </Flex>
        </Group>

        {/* Right Side Actions */}
        <Group gap="sm" ml="auto">
          <Button variant="subtle" visibleFrom="md">
            Login
          </Button>
          <Button
            visibleFrom="md"
          >
            Sign Up
          </Button>

          {/* Mobile Menu Toggle */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Group>
      </Group>
    </AppShell.Header>
  )
}