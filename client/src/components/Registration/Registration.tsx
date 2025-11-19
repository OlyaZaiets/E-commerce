import { Link } from 'react-router-dom';
import './Registration.scss';
import { GoogleLogo } from 'phosphor-react';
import '../../styles/common/_common.scss';
// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';

export const Registration = () => {
  // const { register } = useAuth();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [error, setError] = useState('');

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     setError('Password do not match')
  //     return
  //   }

  //   try {
  //     await register(email, password)
  //   } catch (error: any) {
  //     setError(error.message)
  //   }
  //   console.log('Email', email)
  //   console.log('Password', password)
  //   console.log('confirm', confirmPassword);
  // };

  return (
    <div className='auth-wrapper'>
      <div className='auth-container'>
        <div className='wrapper'>
          <div className='auth-title-text'>
            <h1>Registration</h1>
            <div className="title-line"></div>
          </div>
          <div className="quick-registration">
            <p className="quick-registration-title">Quick registration via:</p>

            <button className="google-btn">
              <GoogleLogo size={24} />
              <span>Google</span>
            </button>
          </div>


          <div className="or-separator">
            <span>or</span>
          </div>

          <form  
            className='user-auth'
            // onSubmit={handleSubmit}
          >
            {/* {error && <p className='error-message'>{error}</p>} */}
            <div className='input-group'>
              {/* <label htmlFor='firstName'>Full:</label> */}
              <input 
                type='text' 
                id='firstName'
                className='input-text' 
                placeholder='Full Name*'
                required
              />
            </div>

            <div className='input-group'>
              {/* <label htmlFor='email'>Email:</label> */}
              <input 
                type='email'
                id='email'
                className='input-text'
                placeholder='Email*'
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='input-group'>
              {/* <label htmlFor='password'>Password:</label> */}
              <input 
                type='password'
                id='password'
                className='input-text'
                placeholder='Password*'
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className='input-group'>
              {/* <label htmlFor='confirmPassword'>Confirm Password:</label> */}
              <input 
                type='password'
                id='confirmPassword'
                className='input-text'
                placeholder='Confirm Password*'
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="checkbox-row">
              <input 
                type="checkbox" 
                id="privacy" 
                className="checkbox-input"
              />
              <label htmlFor="privacy" className="checkbox-label">
                I agree to the <a href="/privacy-policy" className="privacy-link">Privacy Policy</a>.
              </label>
            </div>

            <div className="captcha-placeholder">
              <div className="captcha-checkbox"></div>
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