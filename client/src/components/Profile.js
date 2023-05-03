import React, { useState } from 'react';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../Helper/validate'
import convertToBase64 from '../Helper/convert';
export default function Profile() {
  
  const [file, setFile] = useState();

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: 'asad@123',
            mobile: '',
            address: ''
        },
        validate: profileValidation,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async values =>{
          values = await Object.assign(values , { profile : file || ''})
            console.log(values);
        }
    })
/** File handling is not supoorted by the formik so create this function*/
const onUpload = async e =>{
  const base64 = await convertToBase64(e.target.files[0]);
  setFile(base64);
}

    return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
            <div className={`${styles.glass} ${extend.glass}`} style={{width: "45%"}}>

                <div className='title flex flex-col items-center'>
                    <h1 className='text-5xl font-bold'>Profile</h1>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        You can update the details.
                    </span>
                </div>

                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                      <label htmlFor='profile'>
                        <img className={`${styles.profile_img} ${extend.profile_img}`} src={ file || avatar } alt="avatar"/>
                      </label>
                      <input onChange={onUpload} type='file' id='profile' name='profile'/>
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                      <div className="name flex w-3/4 gap-10">
                        <input {...formik.getFieldProps('firstname')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='First Name'/>
                        <input {...formik.getFieldProps('lastname')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Last Name'/>
                      </div>
                      <div className="name flex w-3/4 gap-10">
                        <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Mobile No.'/>
                        <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type='email' placeholder='Email'/>
                      </div>
                        <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Address'/>
                        <button className={styles.btn} type='submit'>Register</button>
                    </div>
                    <div className='text-center py-4'>
                        <span>Come back later? <button className="text-red-500">Logout</button></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
