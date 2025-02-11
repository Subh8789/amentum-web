import  Login  from '@/components/Login'
import "./globals.css";
import TableWithHeader from '@/components/TableWithHeader';

export default function page()  {
  return (
    <div className='main-container'>
         <Login/> 
        {/* <TableWithHeader/> */}
    </div>
  )
}
