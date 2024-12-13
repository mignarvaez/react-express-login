import { useEffect } from 'react'
import { validateToken } from '../service/authService'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await validateToken()
            if (response.status !== 201)
                navigate('/login')
        } catch (error) {
            console.log(error)
            navigate('/login')
        }
    }

    const logOut = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }

    useEffect(() => {
        fetchData()
    })
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-2xl px-8 py-5 border w-72'>
                <div className='text-3xl text-lime-950'>Home</div>
                <button onClickCapture={logOut} className="w-full bg-green-600 text-white py-2 ">Logout</button>
            </div>
        </div>
    )
}
