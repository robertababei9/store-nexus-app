import { notification } from "antd";

type NotificationType = "error" | "warning" | "success" | "info";


export const openNotification = (
    type: NotificationType,
    message?: string, 
    description?: string
    ) => {
        if (type === "error") {
            notification.error({
                message: message ?? "Error",
                description: description ?? "Something went wrong. Please contact support"
            })
        }
        else if (type === "info") {
            notification.info({
                message: message,
                description: description
            })
        }
        else if (type === "warning") {
            notification.warning({
                message: message,
                description: description
            })
        }
        else if (type === "success") {
            notification.success({
                message: message,
                description: description
            })
        }
}