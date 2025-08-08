import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { TbCameraPlus } from 'react-icons/tb'

const EditProfileModal = () => {
    const [avatarPreview, setAvatarPreview] = useState(
        "https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp"
    );
        const [coverPreview, setCoverPreview] = useState(
        "https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp"
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarPreview(imageUrl);
        }
    };

        const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverPreview(imageUrl);
        }
    };

    return (
        <>
            <input type="checkbox" id="EditProfileModal" className="modal-toggle" />
            <div className="modal  !bg-[#51515170]" role="dialog" >
                <div className="modal-box max-w-[600px] rounded-[16px] p-[0px] relative">
                    <div className='flex justify-between items-center px-4 w-full py-2 sticky top-0'>
                        <div className='flex items-center gap-[30px]'>
                            <label htmlFor="EditProfileModal" className='btn text-white w-[34px] h-[34px] p-[0px] rounded-full border-none bg-transparent hover:bg-[#ffffff20]'><IoClose className='text-[20px] ' /></label>
                            <h5 className='text-white text-[20px] font-semibold'>Edit profile</h5></div>
                        <button className='btn bg-white text-black rounded-full'>Save</button>
                    </div>
                    <div className=''>
                        <div className=''>
                            <div className='h-[200px] w-full bg-base-200 relative'>
                                <img src={coverPreview} alt="cover image" className="w-full h-full object-cover" />
                                <div className='absolute top-0 h-full w-full flex justify-center items-center'>
                                    <label htmlFor='coverImgUrl' className=' hover:cursor-pointer w-[36px] h-[36px] p-[10px] rounded-full bg-[#00000040]'>
                                        <input type="file" id='coverImgUrl' hidden accept="image/*" onChange={handleCoverImageChange} />
                                        <TbCameraPlus />
                                    </label>
                                </div>
                            </div>
                            <div className="avatar avatar-placeholder -mt-[58px] ml-[1rem]">
                                <div className="bg-neutral relative text-neutral-content w-[116px] h-[116px] rounded-full border-3 border-black ">
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className='absolute top-0 h-full w-full flex justify-center items-center'>
                                        <label htmlFor='AvatarUrl' className=' hover:cursor-pointer w-[36px] h-[36px] p-[10px] rounded-full bg-[#00000040]'>
                                            <input type="file" id='AvatarUrl' hidden accept="image/*" onChange={handleFileChange} />
                                            <TbCameraPlus />
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='p-4'>
                            <fieldset className="fieldset rounded-2">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" className="input w-full rounded-[6px]" placeholder="Type First Name" />
                            </fieldset>
                            <fieldset className="fieldset rounded-2">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" className="input w-full rounded-[6px]" placeholder="Type Last Name" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Your bio</legend>
                                <textarea className="textarea h-24 w-full rounded-[6px]" placeholder="Type Bio"></textarea>
                            </fieldset>
                        </div>

                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="EditProfileModal">Close</label>
            </div>
        </>
    )
}

export default EditProfileModal