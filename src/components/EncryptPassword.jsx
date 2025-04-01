import CryptoJS from "crypto-js";

export const EncryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
};
