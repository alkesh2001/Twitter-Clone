import React, {forwardRef} from 'react'

const Input = forwardRef( function Input({
    label, 
    type = 'text',
    className = '',
    ...props
}, ref){
    return (
        <div className='w-full'>
            {label && <label 
                   className='inline-block mb-1 pl-1'>
                    {label}
                </label> 
            }
            <input
             type={type}
             
             className={`px-3 py-2 rounded-lg bg-black text-white font-medium lg:text-lg text-md outline-none  border-gray-800 w-full ${className}`}
             ref={ref}      
             {...props}
             />
        </div>
    )
})

export default Input