import React from 'react';
import {
  Box, Flex, Stack, Heading, Text, Input, Button, 
  Checkbox, Link
} from '@chakra-ui/react';
import LeftPanel from '../components/LeftPanel';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
  return (
    <Flex minH="100vh" bg="gray.50">
      <LeftPanel />
      
      <Flex flex={1} align="center" justify="center" p={8}>
        <Box w="full" maxW="450px" bg="white" p={10} rounded="3xl" shadow="2xl">
          <Stack spacing={5}>
            <Box>
              <Heading size="lg" color="blue.900">Create Account</Heading>
              <Text color="gray.500" mt={1}>Start detecting deepfake images</Text>
            </Box>

            <Stack spacing={3}>
              <Box>
                <Text fontSize="xs" fontWeight="bold" mb={1}>Full Name</Text>
                <Input placeholder="John Doe" bg="gray.50" border="none" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight="bold" mb={1}>Email</Text>
                <Input placeholder="your.email@example.com" bg="gray.50" border="none" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight="bold" mb={1}>Password</Text>
                <Input type="password" placeholder="••••••••" bg="gray.50" border="none" />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight="bold" mb={1}>Confirm Password</Text>
                <Input type="password" placeholder="••••••••" bg="gray.50" border="none" />
              </Box>
            </Stack>

            <Checkbox colorScheme="blue" size="sm">
              <Text fontSize="xs">I agree to the <Link color="blue.500">Terms of Service</Link> and <Link color="blue.500">Privacy Policy</Link></Text>
            </Checkbox>

            <Button size="lg" colorScheme="blue" w="full" rounded="xl" py={6}>
              Create Account
            </Button>

            <Text textAlign="center" color="gray.500" fontSize="sm">
              Already have an account? <Link onClick={() => navigate("/login")} color="blue.500" fontWeight="bold">Sign in</Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}