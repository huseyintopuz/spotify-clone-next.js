import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { DownOutlined, LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { StoreContext } from '../context/context'

const likedsongs = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { logout, setLogout } = useContext(StoreContext)
    const disabled = router.pathname === '/likedsongs'

    return (
        <div style={{ width: '1064px' }} className='h-screen overflow-y-scroll text-white px-8 '>
            <header className='sticky  top-0 pt-4'>
                <div className='flex items-center justify-between '>
                    <div className='space-x-4'>
                        <LeftCircleFilled
                            className='text-3xl cursor-pointer'
                            style={{ color: 'rgb(31 41 55)' }}
                            onClick={() => router.back()} />
                        <button type="button" className={disabled ? 'disabledButton' : 'enabledButton'}>
                            <RightCircleFilled
                                type='button'
                                className='text-3xl'
                                style={{ color: 'rgb(31 41 55)' }}
                            />
                        </button>
                    </div>
                    <div className='flex space-x-6'>
                        <Button type="primary" shape="round" style={{ background: 'black', padding: '4px 32px', border: '1px solid rgb(209 213 219)', }}
                            className='update'
                        >
                            UPDATE
                        </Button>
                        <div onClick={() => setLogout(!logout)}
                            className='flex items-center bg-red-300 space-x-3  
                            rounded-full cursor-pointer opacity-90 hover:opacity-80 p-0'
                        >
                            <img
                                className='w-6 h-6 rounded-full p-0'
                                src={session?.user?.image}
                                alt={session?.user?.name}
                            />
                            <span className='text-white hidden md:inline'>{session?.user.name}</span>
                            <DownOutlined className='text-white text-sm pr-2 hidden md:inline' />
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
        </div>
    )
}

export default likedsongs