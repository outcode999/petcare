import React from 'react'
import Pets from "./pets.jpg"
import { Link } from 'react-router-dom'


export default function Appoiment() {


  



  return (
    <div className='flex gap-20 justify-center items-center'>



        <div >
            <img className="w-[600px] h-[500px]  mt-6" src={Pets}  alt="" />

        </div>

        <div>
            <h1 className='font-serif text-4xl text-gray-600 '>Place the Apoiment</h1>
            <p className='text-gray-900 text-2xl font-extralight  mt-4'>Name: dr Sanath Dissanayka</p>
            <p className='text-gray-900 text-2xl font-extralight '>Whatsapp: ddfdfffffffffffffffffffffffdfdf</p>
            <p className='text-gray-900 text-2xl font-extralight '>call:0775634564444</p>
            <p className='text-red-900 text-2xl font-extralight  mt-4 '>After calling make Appoiment</p>
               <Link to="/form">
               
            <button className='w-28 rounded-md hover:opacity-90 h-10 font-serif cursor-pointer bg-red-600 text-white mt-2'>Appoiment</button>
            </Link>
        </div>
    </div>
  ) 
}
