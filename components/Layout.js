import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Player from './Player'
import { useRecoilState } from 'recoil'
import { logoutState } from '../atoms/atom'
import StoreProvider from '../store/store'

const Layout = ({ children }) => {
    const [show, setShow] = useState(false)
    const [logout, setLogout] = useRecoilState(logoutState)

    useEffect(() => {
        if (window) {
            window.location.pathname === '/login' ? setShow(false) : setShow(true)
            // const yPos = window.scrollY;
            // const xPos = window.scrollX;
            // !logout ? window.onscroll = () => {
            //     window.scroll(0, 0);
            // } : null;
        }
    }, [])

    // useEffect(() => {
    //     // Get the current page scroll position
    //     if (window) {
    //         let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //         let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

    //         // if any scroll is attempted, set this to the previous value
    //         (logout) ? (window.onscroll) = function () {
    //             window.scrollTo(scrollLeft, scrollTop);
    //         } : null;
    //     }
    // })

    return (
        <StoreProvider>
            <React.Fragment>
                <div className="bg-black h-screen overflow-hidden">
                    <main className='flex '>
                        {show ? <Sidebar /> : null}
                        { children }
                    </main>
                    <div className='sticky bottom-0 '>
                        {show ? <Player /> : null}
                    </div> 
                </div>
            </React.Fragment>
        </StoreProvider>
    )
}

export default Layout