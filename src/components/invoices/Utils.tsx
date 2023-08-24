import { Tag } from "antd"
import { InvoiceStatus, InvoiceStatusToStringMap } from "src/utils/Constants"

export const renderInvoiceStatusTag = (text: string) => {
    if (text == InvoiceStatusToStringMap[InvoiceStatus.Sent])
        return <Tag color='#d4b106'>{text}</Tag>
    if (text == InvoiceStatusToStringMap[InvoiceStatus.Overdue])
        return <Tag color='#FF0000'>{text}</Tag>
    if (text == InvoiceStatusToStringMap[InvoiceStatus.Paid])
        return <Tag color='#008000'>{text}</Tag>

    return <></>
}