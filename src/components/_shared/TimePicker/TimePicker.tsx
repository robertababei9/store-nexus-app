import { TimePicker as TimePickerAntd} from 'antd';
import { Dayjs } from 'dayjs';

const FORMAT = "HH:mm"

type TimePickerProps = {
    placeholder?: [string, string];
    className?: string;
    onChange?: (value: any) => void,
    value?: any // RangeValue<Dayjs>
}

export default function TimePicker({
    placeholder = ["Opening hour", "Closing hour"],
    className = "",
    onChange = () => {},
    value
}: TimePickerProps) {
  return (
    <TimePickerAntd.RangePicker
        style={{fontSize: 24}}
        placeholder={placeholder}
        className={`py-4 w-full border-gray-400 hover:border-black ${className}`}
        onChange={(timeRange: any) => {
          onChange(timeRange);
        }}
        value={value}
        showSecond={false}
        format={FORMAT}
    />
  )
}
