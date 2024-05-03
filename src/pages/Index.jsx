import { useState } from "react";
import { Box, Button, Container, Heading, Input, Text, VStack, Image, Spinner, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { client } from "lib/crud";

const Index = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const toast = useToast();

  const handleSearch = async () => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Username can't be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const data = await client.get(`tiktok:${username}`);
    if (data) {
      setUserInfo(data[0]?.value);
    } else {
      toast({
        title: "Not Found",
        description: "User not found in the database",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setUserInfo(null);
    }
    setLoading(false);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={5}>
        <Heading as="h1" size="xl">
          TikTok Profile Analyzer
        </Heading>
        <Text>Enter a TikTok username to retrieve user data.</Text>
        <Box w="100%">
          <Input placeholder="Enter TikTok username" value={username} onChange={(e) => setUsername(e.target.value)} size="lg" />
          <Button leftIcon={<FaSearch />} colorScheme="teal" onClick={handleSearch} isLoading={loading} mt={4} w="100%">
            Search
          </Button>
        </Box>
        {userInfo && (
          <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h2" size="md">
              User Information
            </Heading>
            <Text>
              <strong>Username:</strong> {userInfo.username}
            </Text>
            <Text>
              <strong>Followers:</strong> {userInfo.followers}
            </Text>
            <Text>
              <strong>Likes:</strong> {userInfo.likes}
            </Text>
            {userInfo.profilePic && <Image src={userInfo.profilePic} alt="Profile Picture" boxSize="100px" borderRadius="full" objectFit="cover" />}
          </Box>
        )}
        {loading && <Spinner />}
      </VStack>
    </Container>
  );
};

export default Index;
