import { useSelector } from 'react-redux';

import { Button, TextInput } from 'flowbite-react';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  const profilePicture =
    import.meta.env.VITE_BACKEND_URL + `${currentUser.profilePicture}`;

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-sm rounded-full overflow-hidden'>
          <img
            src={profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>

        <TextInput
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser.username}
        />

        <TextInput
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={currentUser.email}
        />

        <TextInput type='password' id='password' placeholder='Password' />

        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}
