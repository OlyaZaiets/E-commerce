import { Link } from 'react-router-dom';
import './Login.scss';
import { GoogleLogo } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginInputForm } from '../../schemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';


// import { useAuth } from '../../context/AuthContext';



export const Login = () => {
  // const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputForm>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginInputForm) => {
    console.log(data);
  }

  return (
    <div className='auth-wrapper'>
      <div className='auth-container'>

        <div className='wrapper'>
          <div className='auth-title-text'>
            <h1>Welcome Back </h1>
            <div className="title-line"></div>
          </div>
          <div className="quick-registration">
            <p className="quick-registration-title">Quick login via:</p>

            <button type="button" className="google-btn">
              <GoogleLogo size={24} />
              <span>Google</span>
            </button>
          </div>
          <div className="or-separator">
            <span>or</span>
          </div>
          <form 
            className='user-auth'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input 
              type='email' 
              autoComplete="email"
              placeholder='Email*'
              className={`input-text ${errors.email ? 'input-error' : ''}`}
              {...register('email')}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            <input 
              type='password'
              autoComplete="current-password"
              placeholder='Password*'
              className={`input-text ${errors.password ? 'input-error' : ''}`}
              {...register('password')}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}

            <button type='submit' className='dark-btn'>Log In</button>
          </form>
          <p className='question-to-link'>New to Ukrainian Taste?</p> 
          <Link to='/registration' className='auth-link'>Create an account</Link>
        </div>
      </div>
    </div>
  )
}