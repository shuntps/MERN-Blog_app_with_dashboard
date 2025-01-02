import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

import { Button } from 'flowbite-react';

import { AiFillGoogleCircle } from 'react-icons/ai';

import { app } from '../config/firebase';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type='button'
      gradientDuoTone='pinkToOrange'
      outline
      onClick={handleGoogleClick}
    >
      <div className='flex items-center gap-2'>
        <AiFillGoogleCircle className='w-6 h-6' />
        Continue with Google
      </div>
    </Button>
  );
}
