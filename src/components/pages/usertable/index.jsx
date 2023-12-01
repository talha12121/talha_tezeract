import React, { useState, useEffect } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { MdFormatListBulleted } from 'react-icons/md';
import { TbTableFilled } from 'react-icons/tb';
import { Space, Switch, Table, Tag } from 'antd';
import { Link } from 'react-router-dom'


function UserTable() {
    const [openMenu, setOpenMenu] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        let data = localStorage.getItem('userData')
        if (data) {
            data = JSON.parse(data)
            setData(data)
        }
    }, [])

    return (
        <div className=''>
            <div className='flex gap-4 md:gap-10 h-screen'>
                <div className={`${openMenu ? 'w-[57px] md:w-[220px]' : 'w-[57px]'} shrink-0 bg-white h-full overflow-hidden`}>
                    <div className='p-4'>
                        <IoMdMenu className='text-[#B5B5B5] text-2xl' onClick={() => setOpenMenu(!openMenu)} />
                    </div>
                    <div className='flex flex-col gap-3 mt-10'>
                        <Link to={'/userform'}>
                            <div className='p-4 flex gap-5 items-center'>
                                <div className='p-1 rounded-md bg-[#B5B5B5] flex justify-center items-center'>
                                    <MdFormatListBulleted className='text-white text-base' />
                                </div>
                                <p className='text-[#B5B5B5] line-clamp-1'>User From</p>
                            </div>
                        </Link>
                        <Link to={'/usertable'}>
                            <div className='p-4 bg-[#7A5CFA] flex gap-5 items-center'>
                                <div>
                                    <TbTableFilled className='text-white text-2xl' />
                                </div>
                                <p className='text-white line-clamp-1'>User Table</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='flex-grow h-full overflow-y-auto bg-white py-7'>
                    <h1 className='text-3xl text-[#333333] px-5 md:px-14'>User Table</h1>
                    <div className='px-5 mt-10'>
                        <table className='w-[1000px] lg:w-full overscroll-x-auto'>
                            <thead>
                                <tr className='text-sm'>
                                    <th className='text-start py-4 pl-8'>#</th>
                                    <th className='text-start py-4'>EMAIL</th>
                                    <th className='text-start py-4'>NAME</th>
                                    <th className='text-start py-4'>PHONE NO</th>
                                    <th className='text-start py-4'>TIMING</th>
                                    <th className='text-start py-4'>ROLE</th>
                                    <th className='text-start py-4'>ACTIVE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index} className={`${(index + 1) % 2 === 1 && 'bg-gray-200'}`}>
                                                <td className='py-4 pl-5 md:pl-8'>{index + 1}</td>
                                                <td className='py-4'>{item.email}</td>
                                                <td className='py-4'>{item.name}</td>
                                                <td className='py-4'>{item.phone}</td>
                                                <td className='py-4'>{item.time}</td>
                                                <td className='py-4'>{item.role ? item.role : '-'}</td>
                                                <td className='py-4'><Switch className='bg-gray-300' /></td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable;