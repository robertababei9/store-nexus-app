import { Breadcrumb, Typography } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "src/utils/Constants";


const Title = Typography.Title;

export default function EditStore() {

    const params = useParams();


    return (
      <div className='w-full h-full flex flex-col justify-start items-start overflow-y-scroll sm:px-16 px-4 sm:py-8 py-6 '>

          <div className="flex items-center">
              <Title>Edit Store</Title>
              <Breadcrumb
                  className="ml-8"
                  items={[
                      {
                          title: (
                              <div className='b-6 '>
                                  <Link className='text-blue-500' to={ROUTES.Dashboard}>
                                      <AiOutlineHome size={22} className='text-blue-400'/>
                                  </Link>
                                  
                              </div>
                          ),
                      },
                      {
                          title: (
                              <Link to={ROUTES.Stores}>Stores</Link>
                          ),
                      },
                      {
                          title: params.id == '0' ? "Add" : "Edit",
                      }
                  ]}
              />
          </div>
          
      </div>
    )
}