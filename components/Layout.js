import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Player from './Player'
import StoreProvider from '../context/context'

const Layout = ({ children }) => {
    const [show, setShow] = useState(false)
    
    useEffect(() => {
        if (window) {
            window.location.pathname === '/login' ? setShow(false) : setShow(true)
        }
    }, [])
       
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