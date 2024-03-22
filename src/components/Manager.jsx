import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { RiLockPasswordLine } from "react-icons/ri";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
// for tosts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [inputPassword, setInputPassword] = useState("");
    const userNameRef = useRef();
    const siteNameRef = useRef();
    const [passwords, setPasswords] = useState([]);
    const [editable, setEditable] = useState(false);
    const [currentEditable, setCurrentEditable] = useState();
    const generatePassword = () => {
        let Password = Math.random().toString(32).slice(2).padEnd(11, "Z")
        setInputPassword(Password);
        tost(1, "Password generated click on save! ")
    }
    const handlePasswordChange = (e) => {
        setInputPassword(e.target.value);
    }

    useEffect(() => {
        let data = localStorage.getItem('passwordmgr');
        if (data) {
            setPasswords(JSON.parse(data));
        }
    }, [])
    const saveHandler = () => {
        let userName = userNameRef.current.value;
        let siteName = siteNameRef.current.value;
        let pass = inputPassword;
        if (userName && siteName && pass) {
            const newPasswordObject = {
                userName,
                siteName,
                pass,
            }
            // check already data Exists
            for (let passs of passwords) {
                if ((passs.userName) === userName && (passs.siteName) == siteName) {
                    console.log(Date.now());
                    setCurrentEditable(passwords.indexOf(passs))
                    setEditable(true);
                    tost(2, "Data Already Exists Update")
                    return
                }
            }
            setPasswords(prev => ([...prev, newPasswordObject]));
            updateLocalStorage();
            setInputPassword('');
            userNameRef.current.value = '';
            siteNameRef.current.value = '';
            tost(1, 'Password Saved! ')
        }
        else {
            tost(3, "Field Cant be Empty!")
        }
    }
    const updateLocalStorage = () => {
        setPasswords(prev => {
            localStorage.setItem('passwordmgr', JSON.stringify(prev))
            return prev;
        })
    }
    const deletePasswordData = (id) => {
        setPasswords(prev => (
            prev.filter((_, index) => (index !== id))
        ));
        updateLocalStorage();
        tost(2, "Data Deleted")

    }
    const copyButtonMethod = (text,name) => {
        window.navigator.clipboard.writeText(text)
        tost(1, `${name} copied to clipboard!`)

    }
    const EditButtonHandler = (index) => {
        setInputPassword(passwords[index].pass);
        userNameRef.current.value = passwords[index].userName;
        siteNameRef.current.value = passwords[index].siteName;
        setEditable(true);
        setCurrentEditable(index);
        tost(2, "You Are About to update data")
    }
    const updatHandler = () => {
        let userName = userNameRef.current.value;
        let siteName = siteNameRef.current.value;
        let pass = inputPassword;
        const id = currentEditable;
        if (userName && siteName && pass) {
            const newPasswordObject = {
                userName,
                siteName,
                pass,
            }
            setPasswords(prev => {
                let data = [...prev];
                data[id] = newPasswordObject;
                return data;
            })
            updateLocalStorage();
            setInputPassword('');
            userNameRef.current.value = '';
            siteNameRef.current.value = '';
            tost(1, 'Updated successfully ! ')
            setEditable(false);
            setCurrentEditable('');
        }
        else {
            toast.error('field Cant be Empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const tost = (id, message) => {
        if (id === 1) {

            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (id === 2) {
            toast.warn(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
        else if (id === 3) {
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0  h-fit w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] z-10 select-none">
                <Navbar />
                <div className='bg-purple-200/40 m-2 rounded-lg pt-4'>
                    <div className='font-bold text-center'><span className='text-green-500 text-2xl '>&lt;</span><span className='text-xl'>Password</span><span className='text-green-500 text-2xl'>Manager/&gt;</span></div>
                    <div className='text-center font-semibold text-xl'><span className='max-sm:hidden'>Your Own personal and </span><span className='text-green-500 text-2xl'>Secure Password Manager</span> </div>
                    <div className='text-white flex flex-col p-2 gap-2'>
                        <div className='sm:px-8 flex justify-center'>
                            <input
                                type="text"
                                ref={siteNameRef}
                                className='w-full p-2 mx-auto rounded-lg text-black focus:outline-none focus:border-green-500  border border-black'
                                placeholder='Enter Site Name' /></div>
                        <div className='grid sm:grid-cols-12 w-full gap-3'>
                            <span className='sm:col-span-6 sm:pl-8'>
                                <input
                                    type="text"
                                    className='w-full p-2 rounded-lg text-black focus:outline-none focus:border-green-500  border border-black'
                                    ref={userNameRef}
                                    placeholder='Enter user name' />
                            </span>
                            <span className='sm:col-span-6 sm:pr-8 rounded-lg flex gap-1'>
                                <input
                                    value={inputPassword}
                                    type={showPassword ? "password" : "text"}
                                    onChange={handlePasswordChange}
                                    className='w-full p-2 rounded-lg text-black focus:outline-none  border border-black focus:border-green-500'
                                    placeholder='Enter password' />
                                <button className='bg-black p-3 rounded-lg' onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <BsEye /> : <BsEyeSlash />}</button>
                            </span>
                        </div>
                        <div className='flex justify-center gap-4 mb-4'>
                            <div>
                                <button
                                    className='bg-green-300 text-black font-semibold p-2 hover:bg-green-700 hover:text-white duration-200  rounded-lg'
                                    onClick={generatePassword} >Auto Generate</button>
                            </div>
                            <div>
                                {/* state editable */}
                                {!editable ? <button
                                    className='bg-green-300 text-black font-semibold p-2 hover:bg-green-700 hover:text-white duration-200  rounded-lg'
                                    onClick={saveHandler}>Save Password</button>
                                    : <>
                                        <button
                                            className='bg-green-300 text-black font-semibold p-2 hover:bg-green-700 hover:text-white duration-200  rounded-lg'
                                            onClick={updatHandler}>Update</button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-purple-200/20 m-2 rounded-lg overflow-hidden px-0 text-white'>
                    {
                        passwords.length > 0 ? <table className="table-fixed w-full text-left overflow-scroll">
                            <thead className='bg-zinc-500 '>
                                <tr className='text-center'>
                                    <th className='py-2 px-1 text-center'>Site Name</th>
                                    <th className='py-2 px-1'>User Name</th>
                                    <th className='py-2 px-1'>Password</th>
                                    <th className='py-2 px-1'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='g-purple-200/20 text-white'>
                                {passwords.map((item, index) => (
                                    <tr key={index} className='text-center'>
                                        <td className='py-2 pl-1 relative truncate'>
                                            {item.siteName}
                                            <span className='sm:absolute right-10 top-1'>
                                                <FaRegCopy className='cursor-pointer hover:scale-150 duration-200' size={20} onClick={() => copyButtonMethod(item.siteName,'site name')} />
                                            </span>
                                        </td>
                                        <td className='relative truncate'>
                                            {item.userName}
                                            <span className='sm:absolute right-10 top-1'>
                                                <FaRegCopy className='cursor-pointer hover:scale-150 duration-200' size={20} onClick={() => copyButtonMethod(item.userName,'User Name')} />
                                            </span>
                                        </td>
                                        <td className='relative truncate'>
                                            <div className=''>
                                                <span onClick={() => copyButtonMethod(item.pass,'password')} className='blur-[3px] hover:blur-none duration-500 cursor-pointer px-10'>
                                                    {item.pass}
                                                </span>
                                                {/* <span className='text-transparent bg-white hover:bg-transparent hover:text-white duration-500 cursor-pointer'>
                                                    {item.pass}
                                                </span> */}
                                            </div>
                                            <span className='sm:absolute right-10 top-1'>
                                                <FaRegCopy className='cursor-pointer hover:scale-150 duration-200' size={20} onClick={() => copyButtonMethod(item.pass,'password')} />
                                            </span>
                                        </td>
                                        <td className='bg-purple-400/20'>
                                            <span className='col-span-3 cursor-pointer flex justify-center gap-4' >
                                                <div>

                                                    <MdOutlineDeleteOutline size={20} onClick={() => deletePasswordData(index)} />
                                                </div>
                                                <div>
                                                    <FaRegEdit size={20} onClick={() => EditButtonHandler(index)} />

                                                </div>
                                            </span>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table> : <><div className='text-center'>No Password to show</div></>
                    }
                </div>
            </div >
        </>
    )
}
export default Manager