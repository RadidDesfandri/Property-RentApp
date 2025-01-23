import NotFoundComp from '@/components/NotFoundComp'
import React from 'react'
import { CiLogout } from "react-icons/ci";

const NotFound = () => {
    return (
        <div className='bg-black h-screen w-screen flex justify-center items-center'>
            <NotFoundComp text1='NOTFOUND?!' text2='404' sizetext1='3xl'/>
        </div>
    )
}

export default NotFound