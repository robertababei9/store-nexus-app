import { useState, useEffect, useRef } from 'react'
import FileCard from 'src/components/_shared/FileCard/FileCard';
import { SwipeableDrawer } from '@mui/material';
import { DocumentTypeIcon } from 'src/components/_shared/Icons/Icons';
import { getFileTypeColor } from 'src/utils/Utils';
import { Button, LoadingWrapper } from 'src/components/_shared';
import { AiOutlineClose } from 'react-icons/ai';
import FileCardUpload from 'src/components/_shared/FileCard/FileCardUpload';
import { Upload, message } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { ApiResponseModel } from 'src/types/_shared';
import { FileType } from 'src/types/store';
import { useParams } from 'react-router-dom';
import { openNotification } from 'src/utils/Notification';
import { saveAs } from 'file-saver';



export default function FilesAndDocuments() {

    // refs
    const containerRef = useRef(null);

    // params
    const params = useParams();

    // states
    const [filesData, setFilesData] = useState<FileType[]>([]);
    const [rightInfoOpen, setRightInfoOpen] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
    
    const [filesLoading, setFilesLoading] = useState<boolean>(true);
    const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
    const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    // effects
    useEffect(() => {
        if (params.id) {
            fetchStoreFiles(params.id);
        }
    }, []);

    // handlers
    const handleOpenFileDetails = (file: FileType) => {
        file.fileType = file.Name.split(".").pop() ?? "";
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

    const handleDownload = async (fileName?: string) => {
        setDownloadLoading(true);
        try {
            const BASE_URL = getDefaultApiUrl();
            const result = await axios.get<any>(`${BASE_URL}/api/stores/DownloadFile/${fileName}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                responseType: "blob" // very very important
            });

            const fileExtension = selectedFile?.Name.split(".").pop();

            const blob = new Blob([result.data]);
            saveAs(blob, `${selectedFile?.Name}`);
        }
        catch (err: any) {
            console.log(err);
            openNotification("error");
        }
        finally {
            setDownloadLoading(false);
        }
    }

    const handleDelete = async (fileName?: string) => {
        setDeleteLoading(true);
        try {
            const BASE_URL = getDefaultApiUrl();
            const result = await axios.get<any>(`${BASE_URL}/api/stores/DeleteFile/${fileName}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (result.data) {
                const { Success } = result.data;

                if (Success) {
                    openNotification("success", "Success", "File deleted successfully");

                    // TODO: After you'll change to rtk query, the tag will be invalidated
                    // and a new fetch will be requsted to get the updated data ... but now
                    // we will remove it from the array

                    setFilesData(prev => prev.filter(x => x.Name != fileName));

                }
                else {
                    openNotification("error", "Error", "Couldn't delete the file");
                }
            }
        }
        catch (err: any) {
            console.log(err);
            openNotification("error");
        }
        finally {
            setDeleteLoading(false);
            handleCloseDrawer();
        }
    }

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
            }
        }
        catch (err: any) {
            console.log(err);
            openNotification("error");
        }
        finally {
            setFilesLoading(false);
            handleCloseDrawer();
        }
    } 

    const beforeUpload = (file: RcFile) => {

        const parts = file.name.split(".");
        const lastPart = parts[parts.length - 1];
        if (parts.length < 2) {
            message.warning(`File must have a file extension`, 9);
            return false;
        }

      }
      


    return (
        <LoadingWrapper loading={filesLoading}>
            <div ref={containerRef} className='w-full flex flex-wrap justify-start items-start px-2 py-4'>
                <Upload
                    showUploadList={false}
                    beforeUpload={beforeUpload}
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
                                <div 
                                    className={`
                                            absolute -bottom-1 -left-1 rounded-md px-3 py-1 
                                            ${getFileTypeColor(selectedFile?.fileType ?? "")}`}>
                                        <p className='font-semibold text-white text-xs select-none'>{selectedFile?.fileType}</p>
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
                                <Button 
                                    type='secondary'
                                    loading={downloadLoading}
                                    onClick={() => handleDownload(selectedFile?.Name)} 
                                >
                                    Download
                                </Button>
                                <Button 
                                    type='danger'
                                    loading={deleteLoading}
                                    onClick={() => handleDelete(selectedFile?.Name)}
                                >
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
