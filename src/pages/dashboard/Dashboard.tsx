import React from 'react'
import { Typography  } from 'antd';

import SalesAreaChart from '../../components/dashboard/SalesAreaChart';
import Menu from '../../components/dashboard/Menu'; // asta nu vine in /dashboard ... ca noi sa o sa il refolosim peste tot ---> _shared

const { Title } = Typography;

// te verific acum , ia sa mai vedem ce gasim
// ok, E OK ASA MOMENTAN, normal ca e, perfect chiar
// se poate sterge branch-ul asta nou facut de mn prost? si fac altu bun :)
// dar lasa asa momentan, e ok
// nu mai gresesti data viitoare
// dar acum hai sa iei modificarile de pe main si sa le pui la tn
//hai - pai hai
export default function Dashboard() {



  return (
    <div className='flex h-screen w-64 bg-dark'>
    <Menu />
   <div className='flex flex-col justify-start items-start sm:px-32 px-4 sm:py-8 py-6'>
      
      <Title>Dashboard</Title>


      <SalesAreaChart />
    
    </div>
    </div>
  )
}
