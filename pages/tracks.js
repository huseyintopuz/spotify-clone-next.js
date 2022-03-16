import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { ClockCircleFilled, DownOutlined, LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
import { Input } from 'antd';
import { useSession, signOut } from 'next-auth/react';
import { millisToMinutesAndSecondsWithoutExplanation } from '../lib/time';
import { StoreContext } from '../context/context'

const tracks = (track) => {
    const router = useRouter();
    const { searchResults, logout, setLogout } = useContext(StoreContext)
    const tracks = searchResults
    const [search, setSearch] = useState();
    const { Search } = Input
    const { data: session } = useSession();
    const disabled = router.pathname === '/tracks'

    const handleFocus = (e) => {
        e.preventDefault()
        router.push('/search')
    }

    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <div style={{ width: '1064px' }} className='h-screen overflow-y-scroll text-white px-8 '>
            <header className='sticky  top-0 pt-4'>
                <div className='flex items-center justify-between '>
                    <div className='flex space-x-4'>
                        <LeftCircleFilled
                            className='text-3xl cursor-pointer'
                            style={{ color: 'rgb(31 41 55)' }}
                            onClick={() => router.back()}
                        />
                        <button className={disabled ? 'disabledButton' : 'enabledButton'}>
                            <RightCircleFilled
                                className='text-3xl'
                                style={{ color: 'rgb(31 41 55)' }}
                            />
                        </button>
                        <div className='rounded-md' >
                            <Search
                                placeholder="input search text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                enterButton
                                onFocus={handleFocus}
                            />
                        </div>
                    </div>
                    <div className='flex space-x-6'>
                        <div onClick={() => setLogout(!logout)}
                            className='flex items-center bg-black space-x-3 h-8   
                          rounded-full cursor-pointer opacity-90 hover:opacity-80 p-0'
                        >
                            <img
                                className='w-6 h-6 rounded-full p-0'
                                src={session?.user?.image}
                                alt={session?.user?.name}
                            />
                            <span className='text-white font-bold hidden md:inline'>{session?.user.name}</span>
                            <DownOutlined className='text-white text-md pr-2 hidden md:inline' />
                        </div>
                        {logout &&
                            <div className='bg-gray-800 rounded fixed mt-8 right-11 text-white px-2 py-2 '>
                                <div className='text-left pl-2 pr-20 py-1 hover:bg-gray-600 cursor-pointer'>Profile</div>
                                <div className='text-left pl-2 pr-20 py-1 hover:bg-gray-600 cursor-pointer' onClick={() => signOut()}>Sign Out</div>
                            </div>
                        }
                    </div>
                </div>
            </header>
            <div className='grid grid-cols-12 p-6 items-center'>
                <h1 className='text-gray-400 mt'>#</h1>
                <h1 className='col-span-6 text-gray-400 m-0'>TITLE</h1>
                <h1 className='col-span-4 text-gray-400 m-0'>ALBUM</h1>
                <ClockCircleFilled />
            </div>
            {tracks.map((track, index) => {
                return (
                    <ul key={index} >
                        <li
                            className='grid grid-cols-12 items-center px-5 py-2 hover:bg-gray-600 rounded-md
                            cursor-pointer group '
                            onClick={handlePlay}
                        >
                            <div>{index + 1}</div>
                            <div className='grid col-span-6 grid-cols-6'>
                                <div className='text-white col-span-1'>
                                    <img className='w-10 h-10' src={track?.url} />
                                </div>
                                <div className='flex flex-col col-span-5 '>
                                    <span className='truncate '>{track?.artist}</span>
                                    <span className='truncate text-gray-600 group-hover:text-white hover:underline'>{track?.title}</span>
                                </div>
                            </div>
                            <div className='col-span-4 '>
                                <span className='text-gray-600 group-hover:text-white'>{track?.album}</span>
                            </div>
                            <div className='place-self-center'>
                                <span className='text-gray-600 group-hover:text-white'>{millisToMinutesAndSecondsWithoutExplanation(track?.duration)}</span>
                            </div>
                        </li>
                    </ul>
                )
            })}
        </div>

    )
}

export default tracks