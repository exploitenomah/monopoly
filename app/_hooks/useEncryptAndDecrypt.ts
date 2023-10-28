import CryptoJS from "crypto-js"

export default function useEncryptAndDecrypt(SECRET_KEY: string) {
  return {
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY)

      data = data.toString()

      return data
    },
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY)

      data = data.toString(CryptoJS.enc.Utf8)

      return data
    },
  }
}
