'use client';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
	const [value, setValue] = useState({
		phone: '',
		otp: '',
	});
	const [user, setUser] = useState(null);
	const [isPhoneVerify, setIsPhoneVerify] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		phoneAuth(value.phone)
			.then((res) => {
				setUser(res.userId);
				setIsPhoneVerify(true);
			})
			.catch((e) => {
				alert('Error getting phone session!', e);
			});
	};

	const handleValidatePhone = (e) => {
		e.preventDefault();
		validateSMS(user, value.otp)
			.then((res) => {
				alert(
					`User successfully verified using for user with ID ${res.userId}, country Code ${res.countryCode}, and expires on ${res.expire}`
				);
			})
			.catch((e) => {
				alert('Error validating session!', e);
			});
	};

	return (
		<div className='w-screen h-screen bg-white'>
			<Head>
				<title>Appwrite + Telesign </title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='py-4 px-4 lg:py-10 lg:px-10 w-full'>
				<div className='flex justify-center mb-8'>
					<h1 className='text-2xl font-medium text-gray-700'>
						Appwrite + Telesign
					</h1>
				</div>
				<section className='flex justify-center'>
					{isPhoneVerify ? (
						<div className='px-4 py-2 border rounded-lg w-full lg:w-2/4'>
							<div className='border-b h-8 mb-4'>
								<h3 className='text-gray-700'>
									Verify phone number
								</h3>
							</div>
							<form onSubmit={handleSubmit}>
								<fieldset>
									<label className='text-sm text-gray-400 mb-4 block'>
										OTP
									</label>
									<input
										name='otp'
										className='border w-full rounded-sm mb-6 p-2'
										required
										value={value.otp}
										onChange={handleChange}
										type='tel'
									/>
								</fieldset>
								<button
									className='text-sm text-white px-8 py-2 rounded-sm bg-blue-600 hover:bg-blue-700'
									disabled={isLoading}
								>
									Validate OTP
								</button>
							</form>
						</div>
					) : (
						<div className='px-4 py-2 border rounded-lg w-full lg:w-2/4'>
							<div className='border-b h-8 mb-4'>
								<h3 className='text-gray-700'>Send SMS</h3>
							</div>
							<form onSubmit={handleSubmit}>
								<fieldset>
									<label className='text-sm text-gray-400 mb-4 block'>
										Phone number
									</label>
									<input
										name='phone'
										className='border w-full rounded-sm mb-6 p-2'
										required
										value={value.phone}
										onChange={handleChange}
										type='tel'
									/>
								</fieldset>
								<button
									className='text-sm text-white px-8 py-2 rounded-sm bg-blue-600 hover:bg-blue-700'
									disabled={isLoading}
								>
									Submit
								</button>
							</form>
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
