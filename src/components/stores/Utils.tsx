import { Tag } from "antd"
import { StoreStatus, StoresStatusToStringMap } from "src/utils/Constants"

export const renderStoreStatusTag = (text: string) => {
    if (text == StoresStatusToStringMap[StoreStatus.Open])
        return <Tag color='#008000'>{text}</Tag>
    if (text == StoresStatusToStringMap[StoreStatus.Closed])
        return <Tag color="#FF0000">{text}</Tag>
    if (text == StoresStatusToStringMap[StoreStatus.TemporarilyClosed])
        return <Tag color="#FFA500">{text}</Tag>
    if (text == StoresStatusToStringMap[StoreStatus.PermanentlyClosed])
        return <Tag color="#8B0000">{text}</Tag>
    if (text == StoresStatusToStringMap[StoreStatus.UnderRenovation])
        return <Tag color="#d4b106">{text}</Tag>
    if (text == StoresStatusToStringMap[StoreStatus.ComingSoon])
        return <Tag color="#13c2c2">{text}</Tag>

    return <Tag color='#008000'>{text}</Tag>
}