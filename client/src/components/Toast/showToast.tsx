// src/utils/toastNotifications.ts
import { toast } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

const showToast = (message: string, type: ToastType = "info") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      toast(message);
      break;
  }
};

export default showToast;
