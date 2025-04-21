import { useUserStore } from "../store/user";
import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const CreatePage = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    image: "",
  });

	// Save to database
	const toast = useToast();
	const {createUser} = useUserStore();
	const handleAddUser = async () => {
		// console.log(newUser)
		const {success, message} = await createUser(newUser)

		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true
			})
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true
			})

			setNewUser({ name: "", email: "", image: "" })
		}


		// console.log(success)
		// console.log(message)
	}

  return (
    <Container maxW={"container.sm"}>
      <VStack
				spacing={8}
			>
				<Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
					Create New User
				</Heading>

				<Box
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					p={6}
					rounded={"lg"}
					shadow={"md"}
				>
					<VStack spacing={4}>
						<Input
							placeholder="Name"
							name='name'
							value={newUser.name}
							onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
						/>
						<Input
							placeholder="Email"
							name='email'
							value={newUser.email}
							onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
						/>
						<Input
							placeholder="Image URL"
							name='image'
							value={newUser.image}
							onChange={(e) => setNewUser({ ...newUser, image: e.target.value })}
						/>

						<Button
							colorScheme="blue"
							onClick={handleAddUser}
							w={'full'}
						>
							Submit
						</Button>

					</VStack>
				</Box>
			</VStack>
    </Container>
  );
};

export default CreatePage;
