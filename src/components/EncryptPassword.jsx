import CryptoJS from "crypto-js";

export const EncryptPassword = (password) => {
    const secretKey = import.meta.env.VITE_SECRET_KEY;
    return CryptoJS.AES.encrypt(password, secretKey).toString();
};
