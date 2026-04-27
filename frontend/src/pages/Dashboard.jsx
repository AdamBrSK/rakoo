import React, { useState, useRef } from 'react';
import {
  Box, Flex, Container, Heading, Text, Button, Stack,
  Icon, Center, Avatar, Menu, MenuButton, MenuList, MenuItem,
  VStack
} from '@chakra-ui/react';
import { FiCamera, FiUploadCloud, FiTarget, FiZap, FiShield, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);    
  const fileInputRef = useRef(null);
  const navigate = useNavigate()

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setAnalysisResult(null); // Clear old results when new file selected
      console.log("Selected file:", file.name);
    }
  };

  const signOut = () => {
    localStorage.clear()
    navigate("/login")
  }

  // ← MOVED INSIDE component so it can access selectedFile
  const analyzeImage = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/analyze', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: formData
      });

      console.log(response)

      const result = await response.json();
      setAnalysisResult(result);

    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
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
                <MenuItem color="red.500" onClick={signOut}>Sign Out</MenuItem>
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
            {/* LEFT COLUMN - UPLOAD SECTION */}
            <Box flex={1} bg="white" p={10} rounded="3xl" shadow="xl">
              <Heading size="md" mb={8} color="blue.900">Upload Image</Heading>

              <Flex flexDir="column" align="center" justify="center" height="400px">
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

                <Button
                    colorScheme="blue"
                    size="lg"
                    rounded="xl"
                    px={10}
                    onClick={onButtonClick}
                >
                  {selectedFile ? "Change File" : "Choose File"}
                </Button>

                {/* NEW: ANALYZE BUTTON - appears when file is selected */}
                {selectedFile && (
                    <Button
                        mt={4}
                        colorScheme="purple"
                        size="lg"
                        rounded="xl"
                        px={10}
                        onClick={analyzeImage}
                        isLoading={isAnalyzing}
                        loadingText="Analyzing..."
                        leftIcon={<FiShield />}
                    >
                      🔍 Detect Deepfake
                    </Button>
                )}
              </Flex>
            </Box>

            {/* RIGHT COLUMN - RESULTS SECTION */}
            <Box flex={1} bg="white" p={10} rounded="3xl" shadow="xl" border="1px solid" borderColor="blackAlpha.100">
              <Heading size="md" mb={8} color="blue.900">Analysis Results</Heading>

              <Flex flexDir="column" align="center" justify="center" height="400px" textAlign="center">

                {/* SHOW RESULTS IF AVAILABLE */}
                {analysisResult ? (
                    <>
                      <Center w={24} h={24} bg={analysisResult.is_deepfake ? "red.50" : "green.50"} rounded="full" shadow="lg" mb={8}>
                        <Icon
                            as={analysisResult.is_deepfake ? FiAlertTriangle : FiCheckCircle}
                            w={12}
                            h={12}
                            color={analysisResult.is_deepfake ? "red.500" : "green.500"}
                        />
                      </Center>

                      <Heading size="lg" mb={2} color={analysisResult.is_deepfake ? "red.900" : "green.900"}>
                        {analysisResult.is_deepfake ? "⚠️ DEEPFAKE DETECTED!" : "✅ IMAGE APPEARS REAL"}
                      </Heading>

                      <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        Confidence: {(analysisResult.confidence * 100).toFixed(1)}%
                      </Text>

                      {/* Show filename that was analyzed */}
                      {analysisResult.filename && (
                          <Text fontSize="xs" color="gray.500" mt={4}>
                            Analyzed: {analysisResult.filename}
                          </Text>
                      )}
                    </>
                ) : (
                    // NO RESULTS YET - show placeholder
                    <>
                      <Center w={24} h={24} bg="blue.50" rounded="full" shadow="lg" mb={8}>
                        <Icon as={FiUploadCloud} w={12} h={12} color="blue.500" />
                      </Center>
                      <Heading size="md" mb={2} color="blue.900">No Results Yet</Heading>
                      <Text fontSize="sm" color="blue.700">
                        {selectedFile ? "Click 'Detect Deepfake' to analyze" : "Upload an image to start the analysis"}
                      </Text>
                    </>
                )}
              </Flex>
            </Box>
          </Flex>

        </Container>
      </Box>
  );
}