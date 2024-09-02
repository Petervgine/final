import React, { useState } from 'react';
import forgotPasswordIcon from '../assest/forgotpasswnedSend.gif';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common'; // Ensure correct path
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending forgot password request for email:', email);

      if (!SummaryApi?.forgotPassword?.url) {
        throw new Error('Forgot password API configuration is missing');
      }

      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (result.success) {
        toast.success(result.message);
        navigate('/login');
      } else if (result.error) {
        toast.error(result.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error occurred during forgot password request:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <section id='forgot-password'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <img src={forgotPasswordIcon} alt='Forgot password icon' />
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email: </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Reset Password
            </button>
          </form>

          <p className='my-5'>
            Remembered your password?{' '}
            <Link to={'/login'} className='text-red-600 hover:text-red-700 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
