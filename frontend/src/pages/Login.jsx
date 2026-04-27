import React, { useState } from 'react';
import {
  Box, Flex, Stack, Heading, Text, Input, Button, 
  InputGroup, InputLeftElement, InputRightElement, Link, useToast
} from '@chakra-ui/react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import LeftPanel from '../components/LeftPanel';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const toast = useToast();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                
                toast({ title: "Successfully logged in", status: "success", duration: 2000 });
                
                navigate('/dashboard');
            } else {
                toast({ 
                    title: "Login error",
                    description: data.msg || "Invalid data",
                    status: "error" 
                });
            }
        } catch (error) {
            console.error(error);
            toast({ title: "Server doesnt respond", status: "error" });
        } finally {
            setIsLoading(false);
        }
    };

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
                <Text fontSize="sm" fontWeight="bold" mb={2} color="black">Email</Text>
                <InputGroup>
                  <InputLeftElement children={<FiMail color="gray" />} />
                  <Input 
                    placeholder="your.email@example.com" 
                    bg="gray.50" 
                    border="none" 
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Box>

              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="bold" color="black">Password</Text>
                  <Link color="blue.500" fontSize="xs" fontWeight="bold">Forgot password?</Link>
                </Flex>
                <InputGroup>
                  <InputLeftElement children={<FiLock color="gray" />} />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    bg="gray.50" 
                    border="none" 
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="3rem">
                    <Button h="1.75rem" size="sm" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FiEyeOff color="gray" /> : <FiEye color="gray" />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Stack>

            <Button 
                onClick={handleLogin} 
                isLoading={isLoading}
                size="lg" 
                colorScheme="blue" 
                w="full" 
                rounded="xl" 
                py={7}
            >
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