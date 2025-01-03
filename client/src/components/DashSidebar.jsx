import { Link } from 'react-router-dom';

import { Sidebar } from 'flowbite-react';

import { HiArrowSmRight, HiUser } from 'react-icons/hi';

export default function DashSidebar({ tab }) {
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={'User'}
              labelColor='dark'
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item active icon={HiArrowSmRight} className='cursor-pointer'>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
