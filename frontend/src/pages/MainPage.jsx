import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Stack, 
  SimpleGrid, 
  Icon, 
  Flex,
  Badge,
  Link
} from '@chakra-ui/react';
import { FiShield, FiZap, FiTarget, FiArrowRight, FiCamera } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ title, text, icon, iconBg }) => (
  <Stack
    bg="#142347"
    p={8}
    rounded="3xl"
    border="1px solid"
    borderColor="whiteAlpha.100"
    transition="all 0.3s ease"
    _hover={{ 
      borderColor: "blue.500", 
      transform: "translateY(-5px)",
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" 
    }}
  >
    <Flex
      w={14}
      h={14}
      align="center"
      justify="center"
      rounded="2xl"
      bg={iconBg}
      color="white"
      mb={6}
      boxShadow={`0 8px 20px -5px ${iconBg}`}
    >
      <Icon as={icon} w={7} h={7} />
    </Flex>
    <Heading fontSize="xl" mb={3}>{title}</Heading>
    <Text color="gray.400" lineHeight="tall">{text}</Text>
  </Stack>
);

function RakooApp() {
  const navigate = useNavigate()
  return (
    <Box>
      <Container maxW="container.xl" py={6}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <Icon as={FiCamera} w={6} h={6} color="blue.400" />
            <Heading size="md" letterSpacing="tight">Rakoo</Heading>
          </Flex>
          <Button onClick={() => navigate("/login")} variant="outline" colorScheme="blue" rounded="full" px={6}>
            Log in
          </Button>
        </Flex>
      </Container>

      <Box position="relative" overflow="hidden">
        <Box 
          position="absolute" top="-10%" left="50%" transform="translateX(-50%)"
          w="800px" h="400px" bg="blue.900" opacity="0.2" filter="blur(100px)"
          zIndex="-1" rounded="full"
        />

        <Container maxW="container.lg" pt={{ base: 16, md: 24 }} pb={20} textAlign="center">
          <Stack spacing={8} align="center">
            <Badge 
              px={4} py={1.5} 
              rounded="full" 
              bg="blue.900" 
              color="blue.200" 
              border="1px solid" 
              borderColor="blue.500"
              fontSize="xs"
              letterSpacing="wide"
            >
              ✨ ADVANCED DETECTION TECHNOLOGY
            </Badge>

            <Heading 
              as="h1" 
              fontSize={{ base: "4xl", md: "7xl" }} 
              fontWeight="800"
              lineHeight="1.1"
            >
              Detect <Text as="span" color="blue.400">Deepfakes</Text> <br /> Instantly
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color="gray.400" maxW="2xl" mx="auto">
              Protect yourself from manipulated media. Our advanced technology 
              analyzes images to detect deepfakes with exceptional accuracy.
            </Text>

            <Button onClick={() => navigate("/login")}
              size="lg"
              bg="blue.600"
              color="white"
              px={10}
              py={8}
              rounded="2xl"
              fontSize="lg"
              rightIcon={<FiArrowRight />}
              _hover={{ bg: 'blue.500', transform: 'scale(1.02)' }}
              _active={{ bg: 'blue.700' }}
              boxShadow="0 10px 25px -5px rgba(49, 130, 206, 0.4)"
            >
              Try Now
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxW="container.xl" pb={24}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <FeatureCard
            icon={FiTarget}
            iconBg="cyan.500"
            title="High Accuracy"
            text="Our technology achieves 98.5% accuracy in detecting manipulated images."
          />
          <FeatureCard
            icon={FiZap}
            iconBg="blue.500"
            title="Lightning Fast"
            text="Get instant results in under 3 seconds with our optimized algorithms."
          />
          <FeatureCard
            icon={FiShield}
            iconBg="indigo.500"
            title="100% Secure"
            text="Your images are processed securely and never stored on our servers."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default RakooApp;