import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  useToast,
  Spinner,
} from "@chakra-ui/react";

const AuthView = ({ onLogin, onSignup, loading }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "login") {
      onLogin(email, password);
    } else {
      onSignup(email, password);
    }
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.50" p={4}>
      <Box bg="white" p={8} rounded="xl" shadow="md" maxW="md" w="full" borderTop="4px" borderColor="indigo.600">
        {/* Header */}
        <VStack spacing={3} mb={6} align="center">
          <Box w={10} h={10} bg="indigo.600" rounded="full" display="flex" alignItems="center" justifyContent="center" color="white" fontWeight="bold" fontSize="xl">
            F
          </Box>
          <Heading size="lg" color="gray.800">
            luxor
          </Heading>
        </VStack>

        {/* Tabs */}
        <HStack justify="center" mb={6} spacing={4}>
          <Button variant={activeTab === "login" ? "solid" : "ghost"} colorScheme="indigo" onClick={() => setActiveTab("login")}>
            Login
          </Button>
          <Button variant={activeTab === "signup" ? "solid" : "ghost"} colorScheme="indigo" onClick={() => setActiveTab("signup")}>
            Sign Up
          </Button>
        </HStack>

        <Text textAlign="center" color="gray.600" fontSize="sm" mb={6}>
          {activeTab === "login" ? "Sign in to continue" : "Create your account"}
        </Text>

        {/* Form */}
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" focusBorderColor="indigo.500" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" focusBorderColor="indigo.500" />
          </FormControl>

          <Button type="submit" colorScheme="indigo" w="full" isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : activeTab === "login" ? "Sign In" : "Sign Up"}
          </Button>
        </VStack>

        {/* Tab Switch Link */}
        <Divider my={4} />
        <Text textAlign="center" fontSize="sm" color="indigo.600" cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}>
          {activeTab === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </Text>
      </Box>
    </Box>
  );
};

export default AuthView;
