import { useForm } from 'react-hook-form';
import './ProfileInfo.scss';
import { profileInfoSchema, type ProfileInputInput } from '../../schemas/ProfileInfoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput from 'react-phone-number-input/input';
import { useEffect } from 'react';


export const ProfileInfo = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileInputInput>({
          resolver: zodResolver(profileInfoSchema),
  });

  const onSubmit = (data: ProfileInputInput) => {
    console.log(data)
  }

  useEffect(() => {
    register('phone');
  }, [register]);
  
  return(
    <div>
      <div>
        <h2>Your personal data</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='main-user-info'> 
          <div className='user-first-name'>
            <label htmlFor='firstName'>First Name</label>
            <input 
              type='text' 
              id='firstName'
              className={`input-text ${errors.firstName ? 'input-error' : ''}`}
              {...register('firstName')}
              />
            {errors.firstName && <p className='error-message'>{errors.firstName.message}</p>}
          </div>

          <div className='user-last-name'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              id='lastName'
              type='text' 
              className={`input-text ${errors.lastName ? 'input-error' : ''}`}
              {...register('lastName')}
              />
            {errors.lastName && <p className='error-message'>{errors.lastName.message}</p>}

          </div>

          <div className='user-email'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email' 
              className={`input-text ${errors.email ? 'input-error' : ''}`}
              {...register('email')}
              />
            {errors.email && <p className='error-message'>{errors.email.message}</p>}
          </div>

          <div className='user-phone-number'>
            <label htmlFor='phone'>Phone number</label>
            <PhoneInput
              id='phone'
              defaultCountry='DE'
              international
              className={`input-text phone-input ${errors.phone ? 'input-error' : ''}`}
              onChange={(value) => setValue('phone', value ?? '', { shouldValidate: true })}
            />
            {errors.phone && <p className='error-message'>{errors.phone.message}</p>}
          </div>

          <div className='user-gender' >
            <label htmlFor='gender'>Gender</label>
            <select 
              id='gender'
              aria-label='gender' 
              className={`select-text ${errors.gender ? 'input-error' : ''}`} 
            {...register('gender')}>
            <option value=''>Select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Prefer not to say</option>
            </select>
            {errors.gender && <p className='error-message'>{errors.gender.message}</p>}
          </div>

          <div className='user-birthday'>
            <label htmlFor='birth'>Date of Birth</label>

            <div className='dob-selects'>
            <select
              id='birth'
              aria-label='Day' 
              className={`select-text ${errors.birthday?.day ? 'input-error' : ''}`} 
              {...register('birthday.day')}>
                <option value=''>Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

            <select
              id='birth'
              aria-label='Month'  
              className={`select-text ${errors.birthday?.month ? 'input-error' : ''}`} 
              {...register('birthday.month')}>
                <option value=''>Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

            <select 
              id='birth'
              aria-label='Year' 
              className={`select-text ${errors.birthday?.year ? 'input-error' : ''}`} 
              {...register('birthday.year')}>
                <option value=''>Year</option>
                {Array.from({ length: 120 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className='title-line'></div>

        <div className='change-password-container'>
          <h2>Change Password</h2>
          <div className='old-password'>
            <label htmlFor='old-password'>Old Password</label>
            <input 
              type='password'
              id='old-password' 
              className={`input-text ${errors.oldPassword ? 'input-error' : ''}`}
              {...register('oldPassword')}
            />
            {errors.oldPassword && <p className='error-message'>{errors.oldPassword.message}</p>}
          </div>

          <div className='new-password'>
            <label htmlFor='new-password'>New Password</label>
            <input 
              type='password'
              id='new-password' 
              className={`input-text ${errors.newPassword ? 'input-error' : ''}`}
            {...register('newPassword')}
            />
            {errors.newPassword && <p className='error-message'>{errors.newPassword.message}</p>}

          </div>
        </div>
        
        <button className='dark-btn' type='submit'>Submit</button>
      </form>
    </div>
  )
}