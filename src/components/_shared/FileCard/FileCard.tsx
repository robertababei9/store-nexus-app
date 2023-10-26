import { DocumentTypeIcon } from '../Icons/Icons';
import { getFileTypeColor } from 'src/utils/Utils';

type FileCardProps = {
    name: string;
    className?: string;
    onClick?: () => void
}

export default function FileCard({
    name,
    className = "",
    onClick = () => {}
}: FileCardProps) {

    // handlers
    const handleOnFileClick = () => {
        onClick();
    }

    // helpers
    const fileType = name.split(".").pop();

    return (
        <div 
            className={`w-[10rem] h-[10rem] flex flex-col justify-center items-center 
                bg-gray-100 rounded-md shadow-md transition
                hover:shadow-lg cursor-pointer hover:scale-105
                ${className}`}
            onClick={handleOnFileClick}

        >
            <div className={`relative w-16 flex justify-center items-center `}>
                <DocumentTypeIcon width={64} height={64} />
                <div className={`absolute -bottom-1 -left-1 rounded-md px-3 py-1 ${getFileTypeColor(fileType ?? "")}`}>
                    <p className='font-semibold text-white text-xs select-none'>{fileType}</p>
                </div>
            </div>
            <p className='mt-4 font-semibold text-md'>{name}</p>
        </div>
    )
}
