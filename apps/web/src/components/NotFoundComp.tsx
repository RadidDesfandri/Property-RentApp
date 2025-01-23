import Image from 'next/image'
import React from 'react'

interface IPropsNotFound {
  text1: string;
  text2?: string;
  sizetext1: string
  sizePic?: string
}

const NotFoundComp = ({ text1, text2, sizetext1, sizePic }: IPropsNotFound) => {
  return (
    <div className='flex flex-col items-center relative w-full'>
      <Image src={'/notfound.svg'} alt={`${text2}`} width={300} height={300} className={`${sizePic}`} />
      <p className='text-6xl text-btn font-bold absolute bottom-7'>{text2}</p>
      <p className={`text-${sizetext1} text-btn font-extrabold absolute bottom-0`}>{text1}</p>
    </div>
  )
}

export default NotFoundComp