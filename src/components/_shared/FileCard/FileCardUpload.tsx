import { AiOutlineUpload } from 'react-icons/ai';
import { HashLoader } from 'react-spinners';

type FileCardUploadProps = {
    className?: string;
    uploading?: boolean;
}

export default function FileCardUpload({
    className = "",
    uploading = false
}: FileCardUploadProps) {

    // handlers
    const handleOnFileClick = () => {
        // onClick();
    }

    // helpers


    return (
        <div 
            className={`w-[10rem] h-[10rem] flex flex-col justify-center items-center 
                bg-gray-100 rounded-lg shadow-lg transition text-gray-600
                hover:shadow-xl cursor-pointer hover:scale-105
                border-4 border-white
                ${className}`}
            onClick={handleOnFileClick}

        >
            {
                uploading ? (
                    <HashLoader color="#3657F8" loading size={45} />
                ) : (
                    <AiOutlineUpload size={42} />
                )
            }
        </div>
    )
}
