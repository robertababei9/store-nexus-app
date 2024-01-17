import { Avatar, Dropdown } from 'antd';
import Skeleton from '@mui/material/Skeleton';
import { CompanyInfoType } from 'src/types/company';

  
type CompanyMenuItemProps = {
    collapsed: boolean;
    companyData: CompanyInfoType | null;
    loading?: boolean;
};

export default function CompanyMenuItem({
    collapsed,
    companyData,
    loading = false,
}: CompanyMenuItemProps) {

  
    return (
        <div className={`sm:flex items-center rounded-xl shadow-secondary transition-all
                        mx-1 px-1 mb-12 sm:mb-24
                        ${collapsed ? "justify-center" : "justify-start duration-1000 "} 
                        `}
            style={{
                boxShadow: collapsed ? "" : 
                    `rgba(79, 70, 229, 0.4) 0px 2px 40px, rgba(79, 70, 229, 0.3) 0px 7px 20px -3px, rgba(79, 70, 229, 0.2) 0px -3px 0px inset`
            }}
        >
          {/* LEFT AVATAR PICTURE */}
            {
              loading ? (
                <Skeleton sx={{ bgcolor: 'grey.700' }} variant="rounded" width={55} height={45}/>
              ) : (
                <Avatar 
                    className={`border-2 border-gray-300 transition-all ${collapsed ? "" : "duration-1000 w-[55px] h-[45px]"}`} 
                    shape='square' 
                    size={'large'} 
                    src="https://xsgames.co/randomusers/avatar.php?g=pixel" 
                />
              )
            }

            {/* RIGHT TEXT */}
            {
                <div className={`flex flex-col justify-center items-end ml-2 transition-all ${collapsed ? "scale-0 w-0" : "w-full duration-500 scale-100"}`}>
                    {
                      loading ? (
                        <>
                          <div className='w-full flex flex-col justify-start items-end'>
                            <Skeleton sx={{ bgcolor: 'grey.700' }} variant="text" width={"100%"}/>
                            <Skeleton sx={{ bgcolor: 'grey.700' }} variant="text" width={70}/>
                            <Skeleton sx={{ bgcolor: 'grey.700' }} variant="text" width={80}/>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className='text-sm font-semibold text-white'>{companyData?.Name}</p>
                          <div className='w-full flex flex-col justify-start items-end'>
                              <p className='text-sm font-medium text-gray-400'>{companyData?.TotalStores} stores</p>
                              <p className='text-sm font-medium text-gray-400'>{companyData?.TotalMembers} members</p>
                          </div>
                        </>
                      )
                    }
                </div>
            }
        </div>
    );
}
