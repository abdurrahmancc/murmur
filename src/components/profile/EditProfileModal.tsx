import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { TbCameraPlus } from 'react-icons/tb'
import { useForm } from "react-hook-form";
import axiosPrivet from '../../hooks/axiosPrivet';
import Loading from '../shared/Loading';
import { toast } from 'react-toastify';


const EditProfileModal = ({ loginUser, onClose }) => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm()
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [coverPreview, setCoverPreview] = useState<string | null>(null)
    const avatarFile = watch('avatar')
    const coverFile = watch('cover')
    let user = loginUser

    const fetchUser = async () => {
        try {
            setLoading(true);
            const { data } = await axiosPrivet.get('/api/user/me');
            user = data.data;
        } catch (error) {
            console.error('Failed to fetch user', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            setValue('firstName', user.firstName || '')
            setValue('lastName', user.lastName || '')
            setValue('bio', user.bio || '')
            setAvatarPreview(user.avatarUrl || null)
            setCoverPreview(user.coverPhotoUrl || null)
        }
    }, [user, setValue])

    useEffect(() => {
        if (avatarFile && avatarFile[0]) {
            setAvatarPreview(URL.createObjectURL(avatarFile[0]))
        }
    }, [avatarFile])

    useEffect(() => {
        if (coverFile && coverFile[0]) {
            setCoverPreview(URL.createObjectURL(coverFile[0]))
        }
    }, [coverFile])



    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('firstName', data.firstName)
            formData.append('lastName', data.lastName)
            formData.append('bio', data.bio || '')

            if (data.avatar && data.avatar[0]) formData.append('avatar', data.avatar[0])
            if (data.cover && data.cover[0]) formData.append('cover', data.cover[0])

            const { data: res } = await axiosPrivet.put(`/api/user/update/${user.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            if (res.success === true) {
                fetchUser()
                toast.success('Profile updated successfully')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Update failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <input type="checkbox" id="EditProfileModal" className="modal-toggle" />   
            <div className="modal modal-open !bg-[#51515170]" role="dialog" >
                <div className="modal-box max-w-[600px] rounded-[16px] p-[0px] relative">
                    <div className='flex justify-between items-center px-4 w-full py-2 sticky top-0'>
                        <div className='flex items-center gap-[30px]'>
                            <button onClick={onClose} className='btn text-white w-[34px] h-[34px] p-[0px] rounded-full border-none bg-transparent hover:bg-[#ffffff20]'><IoClose className='text-[20px] ' /></button>
                            <h5 className='text-white text-[20px] font-semibold'>Edit profile</h5>
                        </div>
                        { loading ?  <button className='btn bg-white text-black rounded-full'><span className="btn-loading inline-block"></span></button> : <button className='btn bg-white text-black rounded-full' onClick={handleSubmit(onSubmit)}>Save</button>}                      
                    </div>
                    <form>
                        <div className=''>
                            <div className='h-[200px] w-full bg-base-200 relative'>
                                {
                                    coverPreview && <img src={coverPreview} alt="cover image" className="w-full h-full object-cover" />
                                }
                                <div className='absolute top-0 h-full w-full flex justify-center items-center'>
                                    <label htmlFor='coverImgUrl' className=' hover:cursor-pointer w-[36px] h-[36px] p-[10px] rounded-full bg-[#00000040]'>
                                        <input type="file" id='coverImgUrl' hidden accept="image/*" {...register('cover')} />
                                        <TbCameraPlus />
                                    </label>
                                </div>
                            </div>
                            <div className="avatar avatar-placeholder -mt-[58px] ml-[1rem]">
                                <div className="bg-neutral relative text-neutral-content w-[116px] h-[116px] rounded-full border-3 border-black ">
                                    {
                                        avatarPreview && <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                    }
                                    <div className='absolute top-0 h-full w-full flex justify-center items-center'>
                                        <label htmlFor='AvatarUrl' className=' hover:cursor-pointer w-[36px] h-[36px] p-[10px] rounded-full bg-[#00000040]'>
                                            <input type="file" id='AvatarUrl' hidden accept="image/*"  {...register('avatar')} />
                                            <TbCameraPlus />
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='p-4'>
                            <fieldset className="fieldset rounded-2">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" className="input w-full rounded-[6px]"  {...register('firstName', { required: 'First name is required' })} placeholder="Type First Name" />
                                <p className="error-message">{errors?.firstName?.message as string}</p>
                            </fieldset>
                            <fieldset className="fieldset rounded-2">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" className="input w-full rounded-[6px]"  {...register('lastName')} placeholder="Type Last Name" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Your bio</legend>
                                <textarea className="textarea h-24 w-full rounded-[6px]" {...register('bio')} placeholder="Type Bio"></textarea>
                            </fieldset>
                        </div>
                    </form>
                </div>
                <label className="modal-backdrop" htmlFor="EditProfileModal">Close</label>
            </div>           
        </>
    )
}

export default EditProfileModal