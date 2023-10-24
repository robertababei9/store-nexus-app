import { useState, useEffect, useRef } from 'react'
import FileCard from 'src/components/_shared/FileCard/FileCard';
import { SwipeableDrawer } from '@mui/material';
import { DocumentTypeIcon } from 'src/components/_shared/Icons/Icons';
import { getFileTypeColor } from 'src/utils/Utils';
import { Button, LoadingWrapper } from 'src/components/_shared';
import { AiOutlineClose } from 'react-icons/ai';
import FileCardUpload from 'src/components/_shared/FileCard/FileCardUpload';
import { Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { ApiResponseModel } from 'src/types/_shared';
import { FileType, UploadFileType } from 'src/types/store';
import { useParams } from 'react-router-dom';
import { openNotification } from 'src/utils/Notification';



export default function FilesAndDocuments() {

    // refs
    const containerRef = useRef(null);

    // params
    const params = useParams();

    // states
    const [filesData, setFilesData] = useState<FileType[]>([]);
    const [filesLoading, setFilesLoading] = useState<boolean>(true);
    const [rightInfoOpen, setRightInfoOpen] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
    const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

    // effects
    useEffect(() => {
        if (params.id) {
            fetchStoreFiles(params.id);
        }
    }, []);

    // handlers
    const handleOpenFileDetails = (file: FileType) => {
        // console.log(containerRef.current);
        setSelectedFile(file);
        handleOpenDrawer();
    }

    const handleOpenDrawer = () => {
        setRightInfoOpen(true);
    }

    const handleCloseDrawer = () => {
        setRightInfoOpen(false);
    }
      
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log("on file change -> info: ", info);
        if (info.file.status === 'uploading') {
            setIsFileUploading(true);
            return true;
        }

        if (info.file.status === "done") {
            openNotification("success", "Success", "The file was successfully uploaded");

            const data = info.file.response.Data;
            setFilesData(prev => [...prev, data])
        }

        if (info.file.status === "error") {
            openNotification("error", "Error", "Something went wrong uploading the file");
        }

        setIsFileUploading(false);
    };

    // helpers
    const fetchStoreFiles = async (storeId: string) => {
        try {
            const BASE_URL = getDefaultApiUrl();
            const result = await axios.get<ApiResponseModel>(`${BASE_URL}/api/stores/GetAllFiles/${storeId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (result.data) {
                const { Data } = result.data;

                setFilesData(Data);
                console.log("DATA ====== ", Data);
            }
        }
        catch (err: any) {
            console.log(err);
            openNotification("error");
        }
        finally {
            setFilesLoading(false);
        }
    } 


    return (
        <LoadingWrapper loading={filesLoading}>
            <div ref={containerRef} className='w-full flex flex-wrap justify-start items-start px-2 py-4'>
                <Upload
                    showUploadList={false}
                    onChange={handleChange}
                    name='Upload'
                    action={`${getDefaultApiUrl()}/api/stores/upload/${params.id ?? ""}`}
                    data={(file: UploadFile<any>) => ({
                        data: file
                    })}
                    headers={{
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }}
                >
                    <FileCardUpload className='m-3' uploading={isFileUploading}/>
                </Upload>
                
                
                {
                    filesData.map((file: FileType, index: number) => {
                        return (
                            <FileCard
                                key={file.Name + index}
                                name={file.Name} 
                                fileType={file.fileType || "pdf"} 
                                className='m-3'
                                onClick={() => handleOpenFileDetails(file)}
                            />
                        )
                    })
                }

                <SwipeableDrawer
                    sx={{
                        width: 300
                    }}
                    container={containerRef.current}
                    anchor="right"
                    open={rightInfoOpen}
                    onClose={handleCloseDrawer}
                    onOpen={handleOpenDrawer}
                    swipeAreaWidth={56}
                    disableSwipeToOpen={true}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        style: {
                            width: 350
                        }
                    }}
                >
                    <div className='w-full h-full flex flex-col items-center px-8 my-12'>
                        <div className='w-full flex justify-end items-center px-3 sm:px-6 pb-6'>
                            <button onClick={handleCloseDrawer}>
                                <AiOutlineClose size={32} className='text-gray-500'/>
                            </button>
                        </div>
                        <div className='h-60 w-60 flex justify-center items-center bg-gray-100 rounded-md shadow-md'>
                            <div className='relative w-30 h-30 flex justify-center items-center'>
                                <DocumentTypeIcon width={64} height={64} />
                                <div className={`absolute -bottom-1 -left-1 rounded-md px-3 py-1 ${getFileTypeColor(selectedFile?.fileType ?? "")}`}>
                                    <p className='font-semibold text-white text-sm select-none'>{selectedFile?.fileType}</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex flex-col items-start mt-8'>
                            <p className='font-semibold text-2xl'>{selectedFile?.Name}</p>
                            <p className='text-base font-medium mt-6'>Informations</p>
                            <div className='w-full h-[1px] bg-gray-200 my-4'/>
                            <div className='w-full flex justify-between items-center'>
                                <p className='text-gray-500'>Created By</p>
                                <p className=''>{selectedFile?.CreatedBy}</p>
                            </div>

                            <div className='w-full h-[1px] bg-gray-200 my-4'/>
                            <div className='w-full flex justify-between items-center'>
                                <p className='text-gray-500'>Created At</p>
                                <p className=''>{selectedFile?.UploadedAt}</p>
                            </div>

                            <div className='w-full h-[1px] bg-gray-200 my-4'/>
                            <div className='w-full flex justify-between items-center'>
                                <p className='text-gray-500'>Size</p>
                                <p className=''>697 KB</p>
                            </div>

                            <div className='w-full h-[1px] bg-gray-200 my-4'/>

                            <div className='w-full flex justify-between items-center mt-8'>
                                <Button type='secondary'>
                                    Download
                                </Button>
                                <Button type='danger'>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwipeableDrawer>
            </div>
        </LoadingWrapper>
    )
}
