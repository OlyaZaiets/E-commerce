import { Link } from 'react-router-dom';
import './Login.scss';
import { GoogleLogo } from 'phosphor-react';
// import { useAuth } from '../../context/AuthContext';
// import { useState } from 'react';

export const Login = () => {
  // const { login } = useAuth();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setError('');

//   try {
//     await login(email, password);
//   } catch (error: any) {
//     let message = 'An unexpected error occurred. Please try again.';

//     if (error.code) {
//       switch (error.code) {
//         case 'auth/invalid-email':
//           message = 'Invalid email address format.';
//           break;
//         case 'auth/user-disabled':
//           message = 'This account has been disabled.';
//           break;
//         case 'auth/user-not-found':
//           message = 'No account found with this email.';
//           break;
//         case 'auth/wrong-password':
//           message = 'Incorrect password. Please try again.';
//           break;
//         case 'auth/invalid-credential':
//           message = 'Invalid email or password.';
//           break;
//         case 'auth/too-many-requests':
//           message = 'Too many failed attempts. Please wait a few minutes.';
//           break;
//         default:
//           message = 'Login failed. Please check your credentials.';
//       }
//     }

//     setError(message); 
//     console.error('Login error:', error);
//   }
// };

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
          {/* {error && <p className='error-message fade-in'>{error}</p>} */}
            <input 
              type='email' 
              placeholder='Email*'
              className='input-text'
              // onChange={(e) => setEmail(e.target.value)}
              required
              />
            <input 
              type='password' 
              placeholder='Password*'
              className='input-text'
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='submit' className='dark-btn'>Log In</button>
          </form>
          <p className='question-to-link'>New to Ukrainian Taste?</p> 
          <Link to='/registration' className='auth-link'>Create an account</Link>
        </div>
      </div>
    </div>
  )
}