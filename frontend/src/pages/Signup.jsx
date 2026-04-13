import React, { useState } from 'react';
import {
  Box, Flex, Stack, Heading, Text, Input, Button, 
  Checkbox, Link, useToast
} from '@chakra-ui/react';
import LeftPanel from '../components/LeftPanel';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const toast = useToast();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            toast({ title: "Heslá sa nezhodujú", status: "error", duration: 3000 });
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast({ title: "Účet vytvorený!", status: "success" });
                navigate('/login');
            } else {
                toast({ title: "Chyba", description: data.error || data.msg, status: "error" });
            }
        } catch (error) {
            console.error(error);
            toast({ title: "Chyba spojenia", status: "error" });
        }
    };

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
              <Flex gap={3}>
                <Box flex={1}>
                    <Text fontSize="xs" fontWeight="bold" mb={1} color="black">First Name</Text>
                    <Input 
                        placeholder="John" 
                        bg="gray.50" 
                        border="none" 
                        color="black"
                        _placeholder={{ color: 'gray.500' }}
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    />
                </Box>
                <Box flex={1}>
                    <Text fontSize="xs" fontWeight="bold" mb={1} color="black">Last Name</Text>
                    <Input 
                        placeholder="Doe" 
                        bg="gray.50" 
                        border="none" 
                        color="black"
                        _placeholder={{ color: 'gray.500' }}
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    />
                </Box>
              </Flex>

              <Box>
                <Text fontSize="xs" fontWeight="bold" mb={1} color="black">Email</Text>
                <Input 
                    placeholder="your@email.com" 
                    bg="gray.50" 
                    border="none" 
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </Box>

              <Box>
                <Text fontSize="xs" fontWeight="bold" mb={1} color="black">Password</Text>
                <Input 
                    type="password" 
                    placeholder="••••••••" 
                    bg="gray.50" 
                    border="none" 
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </Box>

              <Box>
                <Text fontSize="xs" fontWeight="bold" mb={1} color="black">Confirm Password</Text>
                <Input 
                    type="password" 
                    placeholder="••••••••" 
                    bg="gray.50" 
                    border="none" 
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </Box>
            </Stack>

            <Checkbox colorScheme="blue" size="sm" defaultChecked>
              <Text fontSize="xs" color="black">I agree to the <Link color="blue.500">Terms of Service</Link></Text>
            </Checkbox>

            <Button onClick={handleRegister} size="lg" colorScheme="blue" w="full" rounded="xl" py={6}>
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