import CryptoJS from 'crypto-js';

// Function to generate a random encryption key
export const generateEncryptionKey = () => {
    return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex); // Generate a 256-bit (32-byte) key
};

// Generate master key during initialization
export const masterKey = "c407570e5a339048cd1dd2ecc82134b110e9ae00bd6c0d7def98b85453c52270";

// Function to encrypt a message
export const encryptMessage = (message, key) => {
    return CryptoJS.AES.encrypt(message, key).toString();
};

//Function to decrypt a message
export const decryptMessage = (encryptedMessage, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
};


// import { NativeModules } from 'react-native';
// const { Aes } = NativeModules;

// // Example using expo-random for Expo managed apps
// import * as Crypto from 'expo-crypto';

// const generateRandomBytes = async (byteCount) => {
//     const randomBytes = await Crypto.getRandomBytesAsync(byteCount);
//     return Buffer.from(randomBytes).toString('hex');
// };

// let key;
// let iv;

// const initializeCrypto = async () => {
//     key = await generateRandomBytes(32); // Generates a 256-bit key
//     iv = await generateRandomBytes(16);  // Generates a 128-bit IV
// };

// export const encryptMessage = async (message) => {
//     if (!key || !iv) await initializeCrypto();
//     try {
//         const encrypted = await Aes.encrypt(message, key, iv);
//         return encrypted.toString();
//     } catch (error) {
//         console.error("Encryption error:", error);
//         return null; // Handle errors or rethrow as needed
//     }
// };

// export const decryptMessage = async (encryptedMessage) => {
//     if (!key || !iv) await initializeCrypto();
//     try {
//         const decrypted = await Aes.decrypt(encryptedMessage, key, iv);
//         return decrypted;
//     } catch (error) {
//         console.error("Decryption error:", error);
//         return null; // Handle errors or rethrow as needed
//     }
// };
