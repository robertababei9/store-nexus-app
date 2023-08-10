import { HomeOutlined } from '@ant-design/icons';
import { AiOutlineHome } from 'react-icons/ai';
import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/utils/Constants';

export default function Breadcrumb() {

    return (
        <BreadcrumbAntd 
            items={[
                {
                    href: '',
                    title: (
                        <div className='b-6 '>
                            <Link className='text-blue-500 hover:bg-red-500' to={ROUTES.Dashboard}>
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
                    title: 'Edit',
                }
            ]}
        />
    )
}
