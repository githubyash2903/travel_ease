import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";

export const showToast = {
  success: (msg: string, options?: ToastOptions) => toast.success(msg, options),
  error: (msg: string, options?: ToastOptions) => toast.error(msg, options),
  warning: (msg: string, options?: ToastOptions) => toast.warning(msg, options),
  info: (msg: string, options?: ToastOptions) => toast.info(msg, options),
};
export default showToast;