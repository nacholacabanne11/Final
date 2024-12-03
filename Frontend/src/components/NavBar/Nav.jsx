import { Box, Flex, Text, HStack, Link } from "@chakra-ui/react";

function NavBar() {
  return (
    <Box bg="teal.500" px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Text fontSize="xl" fontWeight="bold" color="white">
          Canchas Paddle
        </Text>

        {/* Links */}
        <HStack as="nav" gap={8}>
          <Link
            href="/Inicio"
            color="white"
            _hover={{ textDecoration: "underline", color: "teal.200" }}
          >
            Inicio
          </Link>
          <Link
            href="/Canchas"
            color="white"
            _hover={{ textDecoration: "underline", color: "teal.200" }}
          >
            Canchas
          </Link>
          <Link
            href="/Reservas"
            color="white"
            _hover={{ textDecoration: "underline", color: "teal.200" }}
          >
            Reservas
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}

export default NavBar;
