// /src/api/index.js
import { Platform } from 'react-native'
import axios from 'axios'

const PC_IP = '172.16.17.158'            // ← your machine’s LAN IP (same one you use for your axios BASE_URL)
export const HOST = Platform.OS === 'android'
  ? `http://${PC_IP}:3000`            // Android emulator + real Android devices
  : `http://${PC_IP}:3000`            // iOS simulator + real iOS devices

export const api = axios.create({
  baseURL: `${HOST}/api`
})

export default api
