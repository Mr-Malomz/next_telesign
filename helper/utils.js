import { Client, Account } from 'appwrite';

//create client
const client = new Client();
client.setEndpoint('http://localhost/v1').setProject('REPLACE WITH PROJECT ID');

//create account
const account = new Account(client);

//authenticate user with phone number
export const phoneAuth = (phone) => {
	return account.createPhoneSession('unique()', phone);
};

//validate phone session
export const validateSMS = (userID, secret) => {
	return account.updatePhoneSession(userID, secret);
};
