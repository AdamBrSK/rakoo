import React, { useState, useRef } from 'react';
import {
  Box, Flex, Container, Heading, Text, Button, Stack, 
  Icon, Center, Avatar, Menu, MenuButton, MenuList, MenuItem,
  VStack
} from '@chakra-ui/react';
import { FiCamera, FiUploadCloud, FiTarget, FiZap, FiShield, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

const StatCard = ({ icon, label, value, bg, color }) => (
  <Flex align="center" gap={4} p={6} bg={bg} rounded="2xl" border="1px solid" borderColor="blackAlpha.100" shadow="lg" minW="220px">
    <Center w={14} h={14} bg="whiteAlpha.900" rounded="full">
      <Icon as={icon} w={7} h={7} color={color} />
    </Center>
    <Box>
      <Heading size="md">{label}</Heading>
      <Text fontSize="sm" opacity={0.8}>{value}</Text>
    </Box>
  </Flex>
);

export default function Dashboard() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Sem sa uloží súbor
  const fileInputRef = useRef(null);

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  // Funkcia, ktorá spracuje vybraný súbor
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      console.log("Vybraný súbor:", file.name);
      // Tu môžeš spustiť analýzu...
    }
  };

  return (
    <Box minH="100vh" bg="blue.50" color="blue.950">
      
      <Box bg="white" px={8} py={4} shadow="sm">
        <Flex align="center" justify="space-between" maxW="container.2xl" mx="auto">
          <Flex align="center" gap={2}>
            <Icon as={FiCamera} w={7} h={7} color="blue.500" />
            <Heading size="lg" color="blue.950">Rakoo</Heading>
          </Flex>
          
          <Menu>
            <MenuButton as={Button} rounded="full" variant="ghost" p={1}>
              <Flex align="center" gap={3}>
                <Avatar size="sm" bg="blue.100" color="blue.600" />
                <Text fontSize="sm" fontWeight="semibold" color="blue.950">My Account</Text>
              </Flex>
            </MenuButton>
            <MenuList border="none" shadow="lg" rounded="xl">
              <MenuItem>Profile Settings</MenuItem>
              <MenuItem>Usage History</MenuItem>
              <MenuItem color="red.500">Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      <Container maxW="container.2xl" py={12} position="relative">
        
        <Box 
          position="absolute" top="10%" left="50%" transform="translateX(-50%)"
          w="600px" h="300px" bg="blue.100" opacity="0.4" filter="blur(80px)"
          zIndex="0" rounded="full"
        />

        <VStack spacing={6} textAlign="center" mb={16} zIndex={1} position="relative">
          <Flex 
            align="center" gap={2} px={6} py={2} 
            rounded="full" bg="blue.100" color="blue.700" 
            border="1px solid" borderColor="blue.200" fontSize="sm" fontWeight="bold"
          >
            <Icon as={FiTarget} />
            Advanced Detection Technology
          </Flex>
          
          <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="800" color="blue.900">
            Deepfake Detection
          </Heading>
          
          <Text fontSize="lg" color="blue.700" maxW="3xl">
            Upload an image and discover if it's real or AI-generated with advanced machine learning
          </Text>
        </VStack>

        <Flex direction={{ base: "column", xl: "row" }} gap={10} mb={12}>
          <Box flex={1} bg="white" p={10} rounded="3xl" shadow="xl">
      <Heading size="md" mb={8} color="blue.900">Upload Image</Heading>
      
      <Flex flexDir="column" align="center" justify="center" height="400px">
        {/* SKRYTÝ INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />

        <Center w={24} h={24} bg="blue.50" rounded="2xl" shadow="md" mb={6}>
          <Icon as={FiUploadCloud} w={12} h={12} color="blue.500" />
        </Center>
        
        <Heading size="md" mb={2}>
          {selectedFile ? "File Ready" : "Drag & Drop"}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={6}>
          {selectedFile ? selectedFile.name : "Upload a photo for analysis"}
        </Text>
        
        {/* TLAČIDLO TERAZ VOLÁ FUNKCIU */}
        <Button 
          colorScheme="blue" 
          size="lg" 
          rounded="xl" 
          px={10}
          onClick={onButtonClick}
        >
          {selectedFile ? "Change File" : "Choose File"}
        </Button>
      </Flex>
    </Box>

          <Box flex={1} bg="white" p={10} rounded="3xl" shadow="xl" border="1px solid" borderColor="blackAlpha.100">
            <Heading size="md" mb={8} color="blue.900">Analysis Results</Heading>
            
            <Flex flexDir="column" align="center" justify="center" height="400px" textAlign="center">
              <Center w={24} h={24} bg="red.50" rounded="full" shadow="lg" mb={8}>
                <Icon as={FiAlertTriangle} w={12} h={12} color="red.500" />
              </Center>
              <Heading size="md" mb={2} color="red.900">No Results Yet</Heading>
              <Text fontSize="sm" color="red.700">Upload an image to start the analysis</Text>
            </Flex>
          </Box>
        </Flex>

      </Container>
    </Box>
  );
}