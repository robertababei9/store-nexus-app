import { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { AiOutlineHome } from 'react-icons/ai';
import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/utils/Constants';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';

type BreadcrumbProps = {
    items: BreadcrumbItemType[];
};

let INITIAL_BREADCRUMB_ITEMS: BreadcrumbItemType[] = [
    {
        title: (
            <div className='b-6 '>
                <Link className='text-blue-500 hover:bg-red-500' to={ROUTES.Dashboard}>
                    <AiOutlineHome size={22} className='text-blue-400'/>
                </Link>
                
            </div>
        ),
    },
];

export default function Breadcrumb({
    items
}: BreadcrumbProps) {

    const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItemType[]>(INITIAL_BREADCRUMB_ITEMS)

    useEffect(() => {
        const breadcrumbUpdated = [...INITIAL_BREADCRUMB_ITEMS];
        items.forEach(item => {
            if (item.path) {
                breadcrumbUpdated.push({
                    title: (
                        <Link to={item.path}>{item.title}</Link>
                    )
                })
            }
            else {
                breadcrumbUpdated.push({
                    title: item.title
                })
            }
            
        })
        setBreadcrumbItems(breadcrumbUpdated);

    }, [items]);


    return (
        <BreadcrumbAntd
            className='ml-8 mb-1'
            items={breadcrumbItems}
        />
    )
}
