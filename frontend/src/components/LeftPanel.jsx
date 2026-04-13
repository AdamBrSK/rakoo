import { FiCamera, FiShield, FiZap, FiTarget } from 'react-icons/fi';
import {
  Box, Flex, Stack, Heading, Text, Icon, Center
} from '@chakra-ui/react';

const FeatureItem = ({ icon, title, desc }) => (
  <Flex align="center" gap={4} p={4} bg="whiteAlpha.100" rounded="2xl" border="1px solid" borderColor="whiteAlpha.200">
    <Center w={10} h={10} bg="blue.400" rounded="lg">
      <Icon as={icon} color="white" />
    </Center>
    <Box>
      <Text fontWeight="bold" fontSize="sm">{title}</Text>
      <Text fontSize="xs" opacity={0.7}>{desc}</Text>
    </Box>
  </Flex>
);

const LeftPanel = () => (
  <Flex
    flex={1}
    bgGradient="linear(to-br, blue.600, blue.900)"
    p={12}
    color="white"
    flexDir="column"
    justify="center"
    display={{ base: 'none', lg: 'flex' }}
  >
    <Stack spacing={8} maxW="400px">
      <Flex align="center" gap={2} mb={4}>
        <Icon as={FiCamera} w={8} h={8} />
        <Heading size="lg">Rakoo</Heading>
      </Flex>
      
      <Box>
        <Heading size="md" mb={2}>Deepfake Detection Platform</Heading>
        <Text opacity={0.8}>Protect Reality. Detect Deception.</Text>
      </Box>

      <Stack spacing={6}>
        <FeatureItem icon={FiTarget} title="Advanced Detection" desc="Our system analyzes images and identifies manipulation signs." />
        <FeatureItem icon={FiZap} title="Lightning Fast Results" desc="Get analysis results within seconds of uploading." />
        <FeatureItem icon={FiShield} title="Secure & Private" desc="Your images are processed securely and never shared." />
      </Stack>
    </Stack>
  </Flex>
);

export default LeftPanel;