import { notification } from "antd";

type NotificationType = "error" | "warning" | "success" | "info";


export const openNotification = (
    type: NotificationType,
    message?: string, 
    description?: string,
    duration: number = 4.5
    ) => {
        if (type === "error") {
            notification.error({
                message: message ?? "Error",
                description: description ?? "Something went wrong. Please contact support",
                duration: duration
            })
        }
        else if (type === "info") {
            notification.info({
                message: message,
                description: description,
                duration: duration
            })
        }
        else if (type === "warning") {
            notification.warning({
                message: message,
                description: description,
                duration: duration
            })
        }
        else if (type === "success") {
            notification.success({
                message: message,
                description: description,
                duration: duration
            })
        }
}