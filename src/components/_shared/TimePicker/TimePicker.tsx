import { TimePicker as TimePickerAntd} from 'antd';

type TimePickerProps = {
    placeholder?: [string, string];
    className?: string;
}

export default function TimePicker({
    placeholder = ["Opening hour", "Closing hour"],
    className = ""
}: TimePickerProps) {
  return (
    <TimePickerAntd.RangePicker
        style={{fontSize: 24}}
        placeholder={placeholder}
        className={`py-4 w-full border-gray-400 hover:border-black ${className}`}
        showSecond={false}
    />
  )
}
