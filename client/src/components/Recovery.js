import React from 'react';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';

export default function Recovery() {
    return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
            <div className={styles.glass}>

                <div className='title flex flex-col items-center'>
                    <h1 className='text-5xl font-bold'>Recovery</h1>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        Enter OTP to recover password.
                    </span>
                </div>

                <form className='pt-20'>
                    <div className='textbox flex flex-col items-center gap-6'>
                      <div className='input text-center'>
                        <span className='py-4 text-sm text-left text-gray-500'>
                          Enter 6 digit OTP send to your email address
                        </span>
                        <input className={styles.textbox} type='text' placeholder='OTP'/>
                      </div>
                        <button className={styles.btn} type='submit'>Sign In</button>
                    </div>
                    <div className='text-center py-4'>
                        <span>Can't get OTP <button className="text-red-500">Resend</button></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
