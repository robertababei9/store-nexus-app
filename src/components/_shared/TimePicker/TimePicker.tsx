import { TimePicker as TimePickerAntd} from 'antd';
import { Dayjs } from 'dayjs';

const FORMAT = "HH:mm"

type TimePickerProps = {
    placeholder?: [string, string];
    className?: string;
    onChange?: (value: any) => void
}

export default function TimePicker({
    placeholder = ["Opening hour", "Closing hour"],
    className = "",
    onChange = () => {}
}: TimePickerProps) {
  return (
    <TimePickerAntd.RangePicker
        style={{fontSize: 24}}
        placeholder={placeholder}
        className={`py-4 w-full border-gray-400 hover:border-black ${className}`}
        onChange={(timeRange: any) => {
          console.log("TimePicker = ", timeRange);
          // console.log("[0]", time[0].format("HH:mm"));
          // console.log("[1]", time[1].format("HH:mm"));
          onChange(timeRange);
        }}
        showSecond={false}
        format={FORMAT}
    />
  )
}
