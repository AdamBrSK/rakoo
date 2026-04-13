import React from 'react';
import {
  Box, Flex, Stack, Heading, Text, Input, Button, 
  InputGroup, InputLeftElement, InputRightElement, Link
} from '@chakra-ui/react';
import { FiMail, FiLock, FiEye } from 'react-icons/fi';
import LeftPanel from '../components/LeftPanel';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
  return (
    <Flex minH="100vh" bg="gray.50">
      <LeftPanel />
      
      <Flex flex={1} align="center" justify="center" p={8}>
        <Box w="full" maxW="450px" bg="white" p={10} rounded="3xl" shadow="2xl">
          <Stack spacing={6}>
            <Box>
              <Heading size="lg" color="blue.900">Welcome Back</Heading>
              <Text color="gray.500" mt={2}>Sign in to your account</Text>
            </Box>

            <Stack spacing={4}>
              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2} color="gray.700">Email</Text>
                <InputGroup>
                  <InputLeftElement children={<FiMail color="gray" />} />
                  <Input placeholder="your.email@example.com" bg="gray.50" border="none" _focus={{ bg: 'white', border: '1px solid', borderColor: 'blue.400' }} />
                </InputGroup>
              </Box>

              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">Password</Text>
                  <Link color="blue.500" fontSize="xs" fontWeight="bold">Forgot password?</Link>
                </Flex>
                <InputGroup>
                  <InputLeftElement children={<FiLock color="gray" />} />
                  <Input type="password" placeholder="••••••••" bg="gray.50" border="none" />
                  <InputRightElement children={<FiEye color="gray" />} />
                </InputGroup>
              </Box>
            </Stack>

            <Button size="lg" colorScheme="blue" w="full" rounded="xl" py={7}>
              Sign In
            </Button>

            <Text textAlign="center" color="gray.500" fontSize="sm">
              Don't have an account? <Link onClick={() => navigate("/signup")} color="blue.500" fontWeight="bold">Sign up</Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}