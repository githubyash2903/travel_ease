import { authClient } from "./axios";


export const sendMessage = (data: any) => authClient.post('/user/contact', data)