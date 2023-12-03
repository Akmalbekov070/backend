import { Box, Button, Heading, Input, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Login() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const toast = useToast();
	const router = useRouter();

	const postData = () => {
		fetch('http://localhost:5000/signup', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					toast({ title: 'error', status: 'error', duration: 3000 });
				} else {
					toast({ title: 'success', status: 'succces', duration: 3000 });
					router.push('/page');
				}
			});
	};
	return (
		<Box w={'full'} display={'flex'} justifyContent={'center'} pt={'220'}>
			<Box w={'30%'}>
				<Input type='text' placeholder='name' my={3} value={name} onChange={e => setName(e.target.value)} />
				<Input type='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
				<Input type='password' placeholder='password' my={3} value={password} onChange={e => setPassword(e.target.value)} />
				<Box>
					<Button onClick={() => postData()}>sign in</Button>
				</Box>
			</Box>
		</Box>
	);
}
