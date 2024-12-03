import { Box, Text, Collapsible, Flex } from "@chakra-ui/react";

const CollapsibleLazyMounted = () => (
  <Flex justify="center" align="center" minH="100vh" bg="gray.50" p="4">
    <Box ml="4" mt="4" w="100%" maxW="1500px">
      <Box border="1px solid black" borderRadius="md" mb="4" p="4">
        <Collapsible.Root Duracion>
          <Collapsible.Trigger
            paddingY="3"
            borderBottom="2px solid black"
            _hover={{ bg: "gray.200" }}
            _focus={{ outline: "none" }}
          >
            <Text fontWeight="bold" color="black">
              Duración de reserva
            </Text>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box padding="4" bg="white" boxShadow="md" borderRadius="md">
              <Text color="black">
                La duración del alquiler de la cancha es de un mínimo de 1 hora
                y máximo de 3 horas.
              </Text>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Box>

      <Box border="1px solid black" borderRadius="md" mb="4" p="4">
        <Collapsible.Root Precio>
          <Collapsible.Trigger
            paddingY="3"
            borderBottom="2px solid black"
            _hover={{ bg: "gray.200" }}
            _focus={{ outline: "none" }}
          >
            <Text fontWeight="bold" color="black">
              ¿Cuánto cuesta?
            </Text>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box padding="4" bg="white" boxShadow="md" borderRadius="md">
              <Text color="black">
                El costo varía dependiendo del tamaño de la cancha y del tipo de
                servicio que se le ofrezca. También depende de la cantidad de
                personas que vayan a estar en la cancha.
              </Text>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Box>

      <Box border="1px solid black" borderRadius="md" mb="4" p="4">
        <Collapsible.Root CantidadPersonas>
          <Collapsible.Trigger
            paddingY="3"
            borderBottom="2px solid black"
            _hover={{ bg: "gray.200" }}
            _focus={{ outline: "none" }}
          >
            <Text fontWeight="bold" color="black">
              ¿De hasta cuántas personas puede estar en la cancha?
            </Text>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box padding="4" bg="white" boxShadow="md" borderRadius="md">
              <Text color="black">
                Se puede estar en la cancha hasta 12 personas dependiendo de la
                cancha. En canchas más chicas se pueden estar hasta 8 personas.
              </Text>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Box>

      <Box border="1px solid black" borderRadius="md" mb="4" p="4">
        <Collapsible.Root Cancelacion>
          <Collapsible.Trigger
            paddingY="3"
            borderBottom="2px solid black"
            _hover={{ bg: "gray.200" }}
            _focus={{ outline: "none" }}
          >
            <Text fontWeight="bold" color="black">
              ¿Se puede cancelar una reserva?
            </Text>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box padding="4" bg="white" boxShadow="md" borderRadius="md">
              <Text color="black">
                Se puede cancelar, sin embargo, se cobra un 20% de la cantidad
                de la reserva. Y esta debe ser cancelada 24 horas antes del
                turno.
              </Text>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Box>
    </Box>
  </Flex>
);

export default CollapsibleLazyMounted;
