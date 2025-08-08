import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegComment, FaUserCircle } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { IoStatsChart } from 'react-icons/io5';
import { GoHeart } from 'react-icons/go';
import axiosPrivet from '../../hooks/axiosPrivet';
import { TfiMoreAlt } from 'react-icons/tfi';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { format, render, cancel, register } from 'timeago.js';


dayjs.extend(utc);
dayjs.extend(timezone);

const localeFunc = (number: number, index: number, totalSec?: number): [string, string] => {
  const phrases: [string, string][] = [
    ['just now', 'right now'],
    ['%s s', 'in %s seconds'],
    ['1 m', 'in 1 minute'],
    ['%s m', 'in %s minutes'],
    ['1 h', 'in 1 hour'],
    ['%s h', 'in %s hours'],
    ['1 d', 'in 1 day'],
    ['%s d', 'in %s days'],
    ['1 w', 'in 1 week'],
    ['%s w', 'in %s weeks'],
    ['1 m', 'in 1 month'],
    ['%s m', 'in %s months'],
    ['1 y', 'in 1 year'],
    ['%s y', 'in %s years']
  ];

  return phrases[index];
};

register('custom', localeFunc);



const MurmurFeedItem = ({ murmur, refetch, loginUser, followingData, followersData, followersRefetch, followingRefetch }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const parsedJson = JSON.parse(murmur?.text);
    const [isFollow, setIsFollow] = useState(false);

const formattedTime = (utcDateString: string) => {
  const date = new Date(utcDateString); 
  return format(date, 'custom');
}

const formatShortTime = (utcDateString) => {

  const userTimeZone = dayjs.tz.guess();

  const inputDate = dayjs.utc(utcDateString).tz(userTimeZone);
  const now = dayjs().tz(userTimeZone);

  const diffInMinutes = now.diff(inputDate, 'minute');
  const diffInHours = now.diff(inputDate, 'hour');

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}h`;

  return inputDate.format('MMM D');
};


    function highlightHashtagsAndMentions(text) {
        const regex = /([#@]\w+)/g;
        const parts = text.split(regex);

        return parts.map((part, i) => {
            if (part.match(/^([#@]\w+)/)) {
                return (
                    <span key={i} style={{ color: '#1D9BF0' }}>
                        {part}
                    </span>
                );
            }
            return part;
        });
    }

    function renderLexicalJson(root) {
        return root.children.map((paragraph, i) => (
            <p key={i}>
                {paragraph.children.map((child, j) => {
                    if (child.type === 'text') return <React.Fragment key={j}>{highlightHashtagsAndMentions(child.text)}</React.Fragment>;
                    if (child.type === 'linebreak') return <br key={j} />;
                    return null;
                })}
            </p>
        ));
    }



    useEffect(() => {
        const liked = murmur?.likes?.some(like => like?.userId === loginUser?.id);
        setIsLiked(liked);
        setLikesCount(murmur.likes?.length || 0);
    }, [murmur?.likes, loginUser?.id]);

    useEffect(() => {
        if (followingData) {
            const res = followingData.some(user => user.id === murmur?.user?.id);
            setIsFollow(res ? true : false)
        }
    }, [murmur?.user, followingData]);

    const handleLikeClick = async () => {
        try {
            await axiosPrivet.patch(`/api/murmur/like/${murmur?.id}`);
            if (isLiked) {
                setLikesCount(prev => prev - 1);
            } else {
                setLikesCount(prev => prev + 1);
            }
            setIsLiked(!isLiked);
            await refetch();
        } catch (error) {
            console.error('Like error:', error);
        }
    };


    const handleFollow = async (id) => {
        try {
            await axiosPrivet.post(`/api/follow/${id}`)
            followingRefetch()
            refetch()
        } catch (error) {
            console.log("error", error.message)
        }
    }

    const handleUnFollow = async (id) => {
        try {
            await axiosPrivet.delete(`/api/follow/${id}`)
            followingRefetch()
            refetch()
        } catch (error) {
            console.log("error", error.message)
        }
    }

    const handleDeleteMurmur = async (id) => {
        try {
            await axiosPrivet.delete(`/api/murmur/${id}`)
            refetch()
        } catch (error) {

        }
    }

    return (
        <div className="p-4 border-b-[0.5px] border-gray-700">
            <div className='flex gap-2 w-full'>
                <FaUserCircle className='w-[40px] h-[40px]' />
                <div className='w-full'>
                    <div className='flex justify-between'>
                        <div className='flex gap-[10px]'>
                            <h5 className="font-bold text-[#E7E9EA]"> {murmur?.user?.firstName} {murmur?.user?.lastName}</h5>
                            <span className='text-[#71767B]'>@{murmur?.user?.username} •</span><span className='text-[#71767B]'>{formattedTime(murmur.createdAt)}</span>
                        </div>
                        <div>
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className=""><TfiMoreAlt /></div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-[15px] px-[0px] z-1 w-52 py-2 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                    <>
                                        {loginUser?.id === murmur?.user?.id && (
                                            <li>
                                                <button onClick={() => handleDeleteMurmur(murmur.id)}>Remove</button>
                                            </li>
                                        )}

                                        <li>
                                            <button>Share</button>
                                        </li>

                                        {loginUser?.id !== murmur?.user?.id && (
                                            <>
                                                <li>
                                                    <button>Not interested in this post</button>
                                                </li>

                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            isFollow
                                                                ? handleUnFollow(murmur?.user?.id)
                                                                : handleFollow(murmur?.user?.id)
                                                        }
                                                    >
                                                        {isFollow ? `UnFollow @${murmur?.user?.username}` : `Follow @${murmur?.user?.username}`}
                                                    </button>
                                                </li>
                                            </>
                                        )}
                                    </>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>{renderLexicalJson(parsedJson?.root)}</div>
                    <div className='flex items-center justify-between mt-[20px]'>
                        <div data-tip="Reply" className=' tooltip text-[#71767b] hover:text-[#1D9BF0] flex items-center'>
                            <button className=' cursor-pointer hover:bg-[RGBA(29,155,240,0.156)] rounded-full p-2'>
                                <FaRegComment />
                            </button>
                            <span className='cursor-pointer text-[13px]'>0</span>
                        </div>
                        <div data-tip="Like" className='tooltip text-[#71767b] hover:text-[#F91880] flex items-center'>
                            <button
                                onClick={handleLikeClick}
                                className={`cursor-pointer rounded-full p-2 transition duration-200 ${isLiked
                                    ? 'text-[#F91880] bg-[rgba(249,24,128,0.19)]'
                                    : 'hover:bg-[rgba(249,24,128,0.19)]'
                                    }`}
                            >
                                {
                                    isLiked ? <FaHeart /> : <GoHeart />
                                }
                            </button>
                            <span className='cursor-pointer text-[13px] ml-1'>{murmur?.likes?.length}</span>
                        </div>
                        <div data-tip="View" className=' tooltip  text-[#71767b] hover:text-[#1D9BF0] flex items-center'>
                            <button className='cursor-pointer hover:bg-[RGBA(29,155,240,0.156)] rounded-full p-2'>
                                <IoStatsChart />
                            </button>
                            <span className='cursor-pointer text-[13px]'>0</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default MurmurFeedItem