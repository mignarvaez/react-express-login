import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../service/authService';

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) => {
        // The preventDefault() method cancels the event if it is cancelable, meaning that the default action 
        // that belongs to the event will not occur.
        e.preventDefault()
        try {
            const response = await register(values)
            if(response.status === 201)
                navigate('/login')
            
        } catch(err) {
            toast.error(err.response.data.message)
        }
    }
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='shadow-lg px-8 py-5 border w-72'>
            <h2 className='text-lg font-bold mb-4'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className='block text-gray-700'>Username</label>
                    <input type="text" placeholder='Enter Username' className='w-full px-3 py-2 border'
                    name="username" onChange={handleChanges}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className='block text-gray-700'>Email</label>
                    <input type="email" placeholder='Enter Email' className='w-full px-3 py-2 border'
                    name="email" onChange={handleChanges}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className='block text-gray-700'>Password</label>
                    <input type="password" placeholder='Enter Password' className='w-full px-3 py-2 border'
                    name="password" onChange={handleChanges}/>
                </div>
                <button className="w-full bg-green-600 text-white py-2 ">Submit</button>
            </form>
            <div className="text-center">
                <span>Already have account?</span>
                <Link to='/login' className='text-blue-500'>Login</Link>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Register