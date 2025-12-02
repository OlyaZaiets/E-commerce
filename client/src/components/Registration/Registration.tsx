import { Link, useNavigate } from 'react-router-dom';
import './Registration.scss';
import { GoogleLogo } from 'phosphor-react';
import '../../styles/common/_common.scss';
import { useForm } from 'react-hook-form';
import { registrationSchema, type RegistrationInputForm } from '../../schemas/RegistrationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput from 'react-phone-number-input';
import { registerUser } from '../../api/auth';


// import { useAuth } from '../../context/AuthContext';

export const Registration = () => {
const navigate = useNavigate();

  const { register, handleSubmit, setValue, watch,  formState: { errors } } = useForm<RegistrationInputForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationInputForm) => {
    const {confirmPassword, privacy, ... payload } = data;
    try {
      const result = await registerUser (payload)

      localStorage.setItem('token', result.token);
      localStorage.setItem('role', result.role);


      navigate('/');
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    }
  }


  return (
    <div className='auth-wrapper'>
      <div className='auth-container'>
        <div className='wrapper'>
          <div className='auth-title-text'>
            <h1>Registration</h1>
            <div className='title-line'></div>
          </div>
          <div className='quick-registration'>
            <p className='quick-registration-title'>Quick registration via:</p>

            <button type='button' className='google-btn'>
              <GoogleLogo size={24} />
              <span>Google</span>
            </button>
          </div>


          <div className='or-separator'>
            <span>or</span>
          </div>

          <form  
            className='user-auth'
            onSubmit={handleSubmit(onSubmit)}
          >

            <div className='input-group'>
              <input 
                type='text' 
                id='fullName'
                className={`input-text ${errors.fullName ? 'input-error' : ''}`}
                placeholder='Full Name*'
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className='error-message'>{errors.fullName.message}</p>
              )}
            </div>

            <div className='input-group'>
              <input 
                type='email'
                id='email'
                className={`input-text ${errors.email ? 'input-error' : ''}`}
                placeholder='Email*'
                autoComplete='email'
                {...register('email')}
              />
              {errors.email && (
                <p className='error-message'>{errors.email.message}</p>
              )}
            </div>

            <div className='input-group'>
              <PhoneInput
                id='phone'
                className={`input-text phone-input ${errors.phone ? 'input-error' : ''}`}
                placeholder='Enter phone number*'
                defaultCountry='DE'
                international
                countryCallingCodeEditable={false}
                value={watch('phone')}
                onChange={(value) => setValue('phone', value ?? '')}
              />

              {errors.phone && (
                <p className='error-message'>{errors.phone.message}</p>
              )}
            </div>


            <div className='input-group'>
              <input 
                type='password'
                id='password'
                className={`input-text ${errors.password ? 'input-error' : ''}`}
                placeholder='Password*'
                autoComplete='new-password'
                {...register('password')}
              />
              {errors.password && (
                <p className='error-message'>{errors.password.message}</p>
              )}
            </div>

          
            <div className='input-group'>
              <input 
                type='password'
                id='confirmPassword'
                className={`input-text ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder='Confirm Password*'
                autoComplete='new-password'
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className='error-message'>{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className='checkbox-row'>
              <input 
                type='checkbox' 
                id='privacy' 
                className={`checkbox-input ${errors.privacy ? 'input-error' : ''}`}
                {...register('privacy')}
              />
              <label htmlFor='privacy' className='checkbox-label'>
                I agree to the <a href='/privacy-policy' className='privacy-link'>Privacy Policy</a>.
              </label>
            </div>
            {errors.privacy && (
              <p className='error-message'>{errors.privacy.message}</p>
            )}

            <div className='captcha-placeholder'>
              <div className='captcha-checkbox'></div>
              <p>I'm not a robot</p>
            </div>

            <button className='dark-btn' type='submit'>Create Account</button>
        </form >
          <p className='question-to-link'>Already have an account?</p> 
          <Link to='/login' className='auth-link'>Log In Here</Link>
        </div>
      </div>
    </div>
  )
}