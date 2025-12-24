import { authClient } from "../axios";

export const fetchContactMessages = () =>
  authClient.get("/admin/contact-messages");

export const fetchContactMessage = (id: string) =>
  authClient.get(`/admin/contact-messages/${id}`);
