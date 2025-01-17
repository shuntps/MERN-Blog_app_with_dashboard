import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

import OAuth from '../components/OAuth';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    try {
      setErrorMessage(null);
      setLoading(true);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col p-5 max-w-4xl mx-auto md:flex-row md:items-center gap-10'>
        {/* Left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-slate-500 to-slate-800 rounded-lg text-white'>
              MyApp
            </span>
            Dev
          </Link>

          <p className='text-sm mt-5'>
            This project is under development. You can still sign up with your
            email or Google account to follow its progress. Thank you.
          </p>
        </div>

        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='Email'
                id='email'
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>

            <Button
              type='submit'
              className='text-white bg-gradient-to-r from-slate-800 to-slate-500 hover:bg-gradient-to-r hover:from-slate-500 hover:to-slate-800 shadow hover:shadow-lg'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>

            <OAuth />
          </form>

          <div className='text-center text-sm mt-3'>
            <span>Already have an account?</span>

            <Link to='/sign-in' className='text-blue-900 p-2 hover:underline'>
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
