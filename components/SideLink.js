import React from 'react'

const SideLink = React.forwardRef(({ onClick, href, name, Icon }, ref) => {
  return (
    <li key={name} >
      <a href={href} onClick={onClick} ref={ref} className='flex items-center space-x-4 text-gray-500 hover:text-white mb-6 cursor-pointer '>
        <Icon style={{ fontSize: '1.5rem' }} />
        <span>{name}</span>
      </a>
    </li>
  )
})

export default SideLink