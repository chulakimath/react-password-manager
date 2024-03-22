import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-purple-200/60 text-white m-2 p-1 text-center sm:flex sm:justify-between items-center rounded-md select-none'>
            <div className='font-bold'><span className='text-green-900 text-2xl '>&lt;</span><span className='text-xl'>Password</span><span className='text-green-700 text-2xl'>Manager/&gt;</span></div>
            <ul className='inline-flex gap-4 p-4 max-sm:hidden'>
                <li className='hover:font-bold hover:scale-125 duration-200'><a href='#'>Home</a></li>
            </ul>

        </nav>
    )
}

export default Navbar