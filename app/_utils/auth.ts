import CryptoJS from "crypto-js"

export function encrypt(data: any, SECRET_KEY: string) {
  data = CryptoJS.AES.encrypt(data, SECRET_KEY)

  data = data.toString()

  return data
}
export function decrypt(data: any, SECRET_KEY: string) {
  data = CryptoJS.AES.decrypt(data, SECRET_KEY)

  data = data.toString(CryptoJS.enc.Utf8)

  return data
}
