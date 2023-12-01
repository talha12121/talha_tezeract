import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { MdFormatListBulleted } from "react-icons/md";
import { TbTableFilled } from "react-icons/tb";
import { Switch, Radio } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '../../../lib/zodSchema';
import { Link } from 'react-router-dom'
import Loader from '../../loader';



function UserForm() {
    const [openMenu, setOpenMenu] = useState(true)
    const [role, setRole] = useState('');
    const [roleToggle, setRoleToggle] = useState(false)
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        setError,
        formState: {
            errors,
            isSubmitting
        },
    } = useForm({
        resolver: zodResolver(UserSchema)
    })

    let sleep = () => new Promise((r) => setTimeout(r, 2000))

    async function AddUser(data) {
        console.log(data);
        setLoading(true)
        await sleep()
        setLoading(false)
        let oldData = localStorage.getItem('userData')
        if (oldData) {
            oldData = JSON.parse(oldData)
            localStorage.setItem("userData", JSON.stringify
                (
                    [
                        ...oldData,
                        {
                            ...data,
                            role
                        }
                    ]
                )
            )
        }
        else {
            localStorage.setItem("userData", JSON.stringify([{ ...data, role }]))
        }

    }
    return (
        <div className=''>
            <div className='flex gap-4 md:gap-10 h-screen'>
                <div className={`${openMenu ? 'w-[57px] md:w-[220px]' : 'w-[57px]'} shrink-0 bg-white h-full overflow-hidden`}>
                    <div className='p-4'>
                        <IoMdMenu className='text-[#B5B5B5] text-2xl' onClick={() => setOpenMenu(!openMenu)} />
                    </div>
                    <div className='flex flex-col gap-3 mt-10'>
                        <Link to={'/userform'}>
                            <div className='p-4 bg-[#7A5CFA] flex gap-5 items-center'>
                                <div className='p-1 rounded-md bg-white flex justify-center items-center'>
                                    <MdFormatListBulleted className='text-[#7A5CFA] text-base' />
                                </div>
                                <p className='text-white line-clamp-1'>User From</p>
                            </div>
                        </Link>
                        <Link to={'/usertable'}>
                            <div className='p-4 flex gap-5 items-center'>
                                <div>
                                    <TbTableFilled className='text-[#B5B5B5] text-2xl' />
                                </div>
                                <p className='text-[#B5B5B5] line-clamp-1'>User Table</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='flex-grow h-full overflow-auto bg-white py-7 px-5 md:px-14'>
                    <h1 className='text-3xl text-[#333333]'>User Form</h1>
                    <form className='mt-10' onSubmit={handleSubmit(AddUser)}>
                        <div>
                            <p className='text-sm font-semibold text-[#666666] mb-3'>Upload profile picture</p>
                            <input type="file" id='file' hidden />
                            <div className='w-[200px] h-[100px] box-border'>
                                <label htmlFor="file" className='w-[200px] h-[100px] cursor-pointer flex justify-center items-center rounded-md border-2 border-dashed border-[#CCCCCC]'>
                                    <p className='py-2 px-3 rounded-md bg-[#E4E4E4] text-[#333333] font-semibold'>+ Browse</p>
                                </label>
                            </div>
                            <p className='text-sm font-semibold text-[#666666] mt-3'>PNG, JPEG, JPG</p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-8 mt-10'>
                            <div className=''>
                                <p className='text-sm font-semibold text-[#666666] mb-3'>User name</p>
                                <input type="text" {...register("name")} placeholder='Enter username' className={`w-full py-4 px-3 rounded-md border focus:outline-none ${errors.name ? 'border-red-500' : 'border-[#CCCCCC]'} `} />
                                {
                                    errors.name && <p className='text-red-500 text-xs font-semibold mt-2'>{errors.name.message}</p>
                                }
                            </div>
                            <div className=''>
                                <p className='text-sm font-semibold text-[#666666] mb-3'>Email</p>
                                <input type="email" {...register("email")} placeholder='Enter email' className={`w-full py-4 px-3 rounded-md border focus:outline-none ${errors.name ? 'border-red-500' : 'border-[#CCCCCC]'} `} />
                                {
                                    errors.email && <p className='text-red-500 text-xs font-semibold mt-2'>{errors.email.message}</p>
                                }
                            </div>
                            <div className=''>
                                <p className='text-sm font-semibold text-[#666666] mb-3'>Enter your phone number</p>
                                <input type="text" {...register("phone")} placeholder='Enter phone number' className={`w-full py-4 px-3 rounded-md border focus:outline-none ${errors.name ? 'border-red-500' : 'border-[#CCCCCC]'} `} />
                                {
                                    errors.phone && <p className='text-red-500 text-xs font-semibold mt-2'>{errors.phone.message}</p>
                                }
                            </div>
                            <div className=''>
                                <p className='text-sm font-semibold text-[#666666] mb-3'>Interview preferred time</p>
                                {/* <input type="text" placeholder='Enter username' className='w-full py-4 px-3 rounded-md border border-[#CCCCCC]' /> */}
                                <select {...register("time")} className='w-full py-4 px-3 rounded-md border border-[#CCCCCC]'>
                                    <option value="Morning">Morning</option>
                                    <option value="Afternoon">Afternoon</option>
                                    <option value="Evening">Evening</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-10'>
                            <div className='flex gap-5'>
                                <Switch checked={roleToggle} onChange={() => setRoleToggle(!roleToggle)} className='bg-gray-200' />
                                <p className='text-[#666666] mb-3'>Select Your Role (optional)</p>
                            </div>
                            <div className='mt-5'>
                                <Radio.Group disabled={!roleToggle} onChange={(e) => setRole(e.target.value)} value={role}>
                                    <Radio value={'student'}>Student</Radio>
                                    <Radio value={'teacher'}>Teacher</Radio>
                                    <Radio value={'other'}>Other</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className='flex justify-end mt-5'>
                            <button className='w-[150px] h-[50px] flex justify-center items-center bg-[#7A5CFA] text-white text-sm font-semibold'>{loading ? <Loader width='w-4' height='h-4' /> : 'ADD USER'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserForm;