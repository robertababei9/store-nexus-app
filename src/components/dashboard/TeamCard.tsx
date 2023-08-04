import { Avatar } from 'antd'
import { Card } from '../_shared'

type Member = {
    name: string;
    role: string;
    image?: string;
}

const MEMBERS: Member[] = [
    {
        name: "Robert Ababei",
        role: "Manager",
        image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
    },
    {
        name: "Razvan Ababei",
        role: "Manager",
        image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
    },
    {
        name: "Dinu Ababei",
        role: "Member",
        image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
    },
    {
        name: "Tiberiu Giuborunca",
        role: "Member",
        image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4"
    },
    {
        name: "Codrin Ababei",
        role: "Member",
        image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=6"
    },
    {
        name: "Eliza Giuborunca",
        role: "Member",
        image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5"
    },
];

export default function TeamCard() {
  return (
    <Card className='bg-white !p-0 min-w-[320px] w-full'>
        <div className='py-4 px-6 flex justify-start'>
            <p className='font-semibold text-lg'>Team members</p>
        </div>
        
        <div className='w-full h-[2px] bg-gray-100'/>

        <div className='w-full max-h-[420px] overflow-auto bg-scroll'>
            {/* ROWs */}
            {
                MEMBERS.map((member: Member, index: number) => (
                    <div className='flex justify-start items-center mt-6 px-6 cursor-pointer hover:text-cyan-400'>
                        <Avatar size={50} src={member.image} />
                        <div className='flex flex-col justify-start items-start ml-4'>
                            <p className='font-semibold '>{member.name}</p>
                            <p className='text-gray-400'>{member.role}</p>
                        </div>
                    </div>
                ))
            }
        </div>



    </Card>
  )
}
