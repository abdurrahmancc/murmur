import React, { useState } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { EditorState } from 'lexical'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import ToolbarPlugin from './ToolbarPlugin'
import { MdPublic } from 'react-icons/md'
import { FaCheck, FaUserCheck } from 'react-icons/fa'
import { CiImageOn } from 'react-icons/ci'
import Cookies from "js-cookie";
import { accessToken } from '../hooks/useCookies'
import axiosPrivet from '../hooks/axiosPrivet'

const initialConfig = {
    namespace: 'MurmurEditor',
    onError: (error: any) => { console.error('Lexical error:', error); },
    theme: {},
    editorState: null,
    nodes: [],
};

const postAccessList = [
    { id: 1, title: "Everyone", value: "Public", icon: MdPublic },
    { id: 2, title: "Accounts you follow", value: "Followers", icon: FaUserCheck },
];


const MurmurPost: React.FC = () => {
    const [postContent, setPostContent] = useState<string>('');
    const [selectedAccessId, setSelectedAccessId] = useState<number>(1);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const selectedAccess = postAccessList.find(acc => acc.id === selectedAccessId);
    const SelectedIcon = selectedAccess?.icon;

    const onChange = (editorState: EditorState) => {
        editorState.read(() => setPostContent(JSON.stringify(editorState.toJSON())));
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setSelectedImages(Array.from(e.target.files));
    };

const handleSubmit = async () => {
  const access = postAccessList.find(a => a.id === selectedAccessId)?.value || 'Public';

  const data = {
    content: postContent,
    access,
  };

  try {
    const res = await axiosPrivet.post('http://localhost:3000/api/murmurs', data);
    console.log('Success', res);
  } catch (err) {
    console.error('Error:', err);
  }
};


    return (
        <div className=" relative w-full">
            <LexicalComposer initialConfig={initialConfig}>

                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor-input w-full" />}
                    placeholder={<div className="editor-placeholder left-[10px] top-[8px]">What's happening?</div>}
                    // ErrorBoundary={LexicalErrorBoundary}
                    ErrorBoundary={({ children }) => <>{children}</>}
                />
                {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                    {selectedImages.map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-lg">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`img-${index}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    ))}
                </div> */}

                <div className="dropdown">
                    <div tabIndex={0} role="button"
                        className="text-[#1d9bf0] m-1 flex items-center gap-x-[5px] cursor-pointer px-[10px] py-[6px] rounded-full hover:bg-[rgba(29,155,240,0.1)] transition-colors">
                        {SelectedIcon && <SelectedIcon className="mt-[2px]" />}
                        <span>{selectedAccess?.title} can reply</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content p-0 menu py-2 bg-base-100 rounded-[15px] z-10 w-[320px] shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        <div className='px-[16px] mb-2'>
                            <div className='font-semibold font-[16px] text-white'>Who can reply?</div>
                            <div className='text-[14px] text-gray-500'>Choose who can reply to this post. Anyone mentioned can always reply.</div>
                        </div>
                        {
                            postAccessList.map((acc) => {
                                const Icon = acc.icon;
                                const isSelected = acc.id === selectedAccessId;

                                return (
                                    <li key={acc.id} onClick={() => setSelectedAccessId(acc.id)}>
                                        <a className='flex items-center justify-between cursor-pointer'>
                                            <div className="flex items-center gap-2">
                                                <div className='p-2 bg-[#1d9bf0] rounded-full flex justify-center items-center'>
                                                    <Icon className="text-[18px] text-white" />
                                                </div>
                                                <div className='text-[16px] font-semibold'>{acc.title}</div>
                                            </div>
                                            {isSelected && <FaCheck className="text-[#1d9bf0]" />}
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                <div className='flex justify-between items-center border-t-[0.5px] border-gray-700 p-2 mt-2'>
                    <div>
                        {/* <ToolbarPlugin /> */}
                        {/* <label htmlFor='uploadImage' className='cursor-pointer'>
                        <input id='uploadImage' hidden type="file" accept="image/*" multiple onChange={handleImagesChange} />
                        <CiImageOn className='text-[22px] text-blue-500' />
                        </label> */}
                    </div>

                    <button type='submit' onClick={handleSubmit} className='bg-white btn rounded-full px-6 text-black'>Post</button>
                </div>
                <HistoryPlugin />
                <OnChangePlugin onChange={onChange} />
            </LexicalComposer>
        </div>
    )
}

export default MurmurPost
