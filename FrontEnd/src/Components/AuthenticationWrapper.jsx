
import sideImage from '../assets/7053216.jpg'
const AuthenticationWrapper = ({title,children}) => {
  return (
    <div className={` w-full h-full flex justify-start md:gap-2 lg:gap-4 lg:justify-evenly  `}>
        <div className=' left w-[100%]  md:w-[50%] h-screen flex flex-col items-center justify-center mx-4'>
            <h2 className=' font-bold text-[1.75rem] my-4 text-center lg:w-[70%]'>{title}</h2>
            <div className='bg-[#e5e5e5] w-[100%] lg:w-[50%] min-h-[60%] rounded-[10px] outline-gray-300 outline outline-1 outline-offset-1 drop-shadow-lg'>
                {children}
            </div>
        </div>
        <img src={sideImage} className=' right hidden md:block  md:w-[60%] lg:w-[40%] rounded-[20px] my-4 lg:m-2 mx-2'/>
    </div>
  )
}

export default AuthenticationWrapper