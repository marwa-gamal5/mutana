import {useState} from 'react';
import axiosInstance from "../../axiosConfig/axiosInstance.jsx";
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {FaEyeSlash} from "react-icons/fa6";
import {FaEye} from "react-icons/fa";
import {yupResolver} from "@hookform/resolvers/yup";


const schema = yup.object({
    username: yup.string().required('User name is required').min(8).matches(/^[a-zA-Z0-9]{8,30}$/, 'user name must be more than 8 characters and have no special chars or spaces'),
    email: yup.string().required('Email is required').matches(/^[a-zA-Z0-9]+@(yahoo|gmail).com$/, 'email must be a valid email, contain @ and end with .com like:- name@example.com'),
    fname: yup.string().required('First name is required').min(2).matches(/^.[a-zA-Z ]{3,30}$/, 'name must be only letters'),
    mname: yup.string().required('Middle name is required').min(2).matches(/^.[a-zA-Z ]{3,30}$/, 'name must be only letters'),
    lname: yup.string().required('Last name is required').min(2).matches(/^.[a-zA-Z ]{3,30}$/, 'name must be only letters'),
    national_id: yup.string().required('National id is required').matches(/^.[0-9]{13}$/, 'national id must be 14 digits and digits only'),
    date_of_birth: yup.string().required('Date of birth is required'),
    phone: yup.string().required('Phone is required').matches(/^(010|011|012|015)[0-9]{8}$/, 'phone number must be 11 digits and start with 010,011,012 or 015'),
    course: yup.string().required('Course is required'),
    password: yup
        .string()
        .min(8)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/, 'password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    confirmedPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Password confirmation is required'),
    gender: yup.string().required('please select your gender')
});

function Registration() {
    const  ssword,setShowPassword = useState(false);
    const  nfirmPassword,setShowConfirmPassword = useState(false);
    const  ype1,setInputType1 = useState('password');
    const  ype2,setInputType2 = useState('password');
    const  me,setUserName = useState('')
    const  setEmail = useState('')
    const  rd,setPassword = useState('')
    const  mPassword,setConfirmPassword = useState('')
    const  ame,setFirstName = useState('')
    const  Name,setMiddleName = useState('')
    const  me,setLastName = useState('')
    const  alId,setNationalId = useState('')
    const  setPhone = useState('')
    const  Birth,setDateOfBirth = useState('')
    const  ,setGender = useState('')
    const  ,setCourse = useState('')

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })


    return (
        <section className={` flex-col gap-5 justify-center items-center`}>
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
                axiosInstance.post('user/studen_registration/', data).then(res=>{
                    console.log(res)
                }).catch(err=> {
                    console.log(err)
                })
            })}>
                <div className={` `}>
                    <label htmlFor={`username`}>UserName</label>
                    <input {...register(`username`, )}
                           className={`border border-black`} type={`text`} value={username}
                           onChange={(e) => setUserName(e.target.value)}
                           placeholder={`enter a unique user name`} id={`username`}/>
                    <p className={`text-red-500`}>{errors.username?.message}</p>
                </div>
                <div className={` `}>
                    <label htmlFor={`email`}>Email</label>
                    <input {...register(`email`)}
                           className={`border border-black`} type={`email`} value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder={`enter your email`}
                           id={`email`}/>
                    <p className={`text-red-500`}>{errors.email?.message}</p>
                </div>
                <div className={` `}>
                    <div>
                        <label htmlFor={`fname`}>First Name</label>
                        <input {...register(`fname`)} className={`border border-black`} type={`text`} value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}
                               placeholder={`enter your first name`} id={`fname`}/>
                        <p className={`text-red-500`}>{errors.fname?.message}</p>
                    </div>
                    <div>
                        <label htmlFor={`mname`}>Middle Name</label>
                        <input {...register(`mname`, )} className={`border border-black`} type={`text`} value={middleName}
                               onChange={(e) => setMiddleName(e.target.value)}
                               placeholder={`enter your middle name`} id={`mname`}/>
                        <p className={`text-red-500`}>{errors.mname?.message}</p> {/* Fixed typo here */}
                    </div>
                    <div>
                        <label htmlFor={`lname`}>Last Name</label>
                        <input {...register(`lname`, )} className={`border border-black`} type={`text`} value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                               placeholder={`enter your last name`} id={`lname`}/>
                        <p className={`text-red-500`}>{errors.lname?.message}</p>
                    </div>
                </div>
                <div className={` `}>
                    <div className={`relative`}>
                        {/*===================resolver*/}
                        <label htmlFor={`password`}>Password</label>
                        <input {...register(`password`, )} className={`border border-black`} type={inputType1} value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder={`enter your password`} id={`password`}/>
                        <button type={`button`} className={`absolute left-[27%] top-1`}>
                            {showPassword ? <FaEyeSlash onClick={() => {
                                setShowPassword(!showPassword);
                                setInputType1('password');
                            }}/> : <FaEye onClick={() => {
                                setShowPassword(!showPassword)
                                setInputType1('text');
                            }}/>}
                        </button>
                        <p className={`text-red-500`}>{errors.password?.message}</p>
                    </div>
                    <div className={`relative border flex`}>
                        <label htmlFor={`passwordConfirm`}>Confirm Password</label>
                        <input
                            {...register('confirmedPassword')}
                            className={`border border-black`}
                            type={inputType2}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            placeholder={`confirm your password`}
                            id={`passwordConfirm`}
                        />

                        <button type={`button`} className={`absolute left-[31.8%] top-1`}>
                            {showConfirmPassword ? <FaEyeSlash onClick={() => {
                                setShowConfirmPassword(!showConfirmPassword);
                                setInputType2('password');
                            }}/> : <FaEye onClick={() => {
                                setShowConfirmPassword(!showConfirmPassword)
                                setInputType2('text');
                            }}/>}
                        </button>
                        <p className={`text-red-500`}>{errors.confirmedPassword?.message}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor={`nationalId`}>National Id</label>
                        <input {...register(`national_id`, )}
                               className={`border border-black`} type={`text`} value={nationalId}
                               onChange={(e) => setNationalId(e.target.value)}
                               placeholder={`enter your national id`} id={`nationalId`}/>
                        <p className={`text-red-500`}>{errors.national_id?.message}</p>
                    </div>
                    <div>
                        <label htmlFor={`date_of_birth`}>Date Of Birth</label>
                        <input {...register(`date_of_birth`, )}
                               className={`border border-black`} type={`date`} value={dateOfBirth}
                               onChange={(e) => {
                                   const selectedDate = new Date(e.target.value);

                                   // Format the date as yyyy-mm-dd
                                   const formattedDate = selectedDate.toISOString().split('T')[0];

                                   setDateOfBirth(formattedDate);
                               }}
                               placeholder={`enter your date of birth`}
                               id={`date_of_birth`}/>
                        <p className={`text-red-500`}>{errors.date_of_birth?.message}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor={`phone`}>Phone</label>
                        <input {...register(`phone`, )}
                               className={`border border-black`} type={`text`} value={phone}
                               onChange={(e) => setPhone(e.target.value)}
                               placeholder={`enter your phone`} id={`phone`}/>
                        <p className={`text-red-500`}>{errors.phone?.message}</p>
                    </div>
                    <div>
                        <span>select your studying year</span>
                        <select {...register(`course`, )} id={`course`}
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}>
                            <option value="" disabled>Select your studying year</option>
                            <option value={`1`}>First secondary year</option>
                            <option value={`2`}>Second secondary year</option>
                            <option value={`3`}>Third secondary year</option>
                        </select>
                        <p className={`text-red-500`}>{errors.course?.message}</p>
                    </div>
                </div>
                <div>
                    <p>Select your gender</p>
                    <div>
                        <label htmlFor={`male`}>Male</label>
                        <input type={`radio`} {...register(`gender`, )}
                               value={`male`} id={`male`}/>
                        <label htmlFor={`female`}>Female</label>
                        <input type={`radio`} {...register(`gender`, )}
                               value={`female`} id={`female`}/>
                        <p className={`text-red-500`}>{errors.gender?.message}</p>
                    </div>
                </div>
                <input type={`submit`}/>
            </form>
        </section>
    );
}

export default Registration;
