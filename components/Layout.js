import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Player from './Player'
import { useRecoilState } from 'recoil'
import { logoutState } from '../atoms/atom'

const Layout = ({ children }) => {
    const [show, setShow] = useState(false)
    const [logout, setLogout] = useRecoilState(logoutState)

    useEffect(() => {
        if (window) {
            window.location.pathname === '/login' ? setShow(false) : setShow(true)
            const yPos = window.scrollY;
            const xPos = window.scrollX;
            !logout ? window.onscroll = () => {
                window.scroll(0, 0);
            } : null;
            // logout ? window?.scrollY = () = {
            //     window?.scroll(0);  // reset the scroll position to the top left of the document.
            // } : null
        }
    }, [])
    return (
        <React.Fragment>
            <div className="bg-black h-screen overflow-hidden">
                <main className='flex '>
                    {show ? <Sidebar /> : null}
                    {children}
                </main>
                <div className='sticky bottom-0 '>
                    {show ? <Player /> : null}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout