import Header from '@/components/shared/Header';
import Profile from '@/components/shared/Profile';
import { API } from '@/lib/config';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';

export async function getProfileData (id:string) : Promise<ProfileInterface> {
  const res = await axios.get(`${API}/users/${id}/profile`);
  return await res.data;
}

async function ProfilePage() {
  const { userId } : { userId: string | null } = auth();
  const data = await getProfileData(userId!)
  return (
    <>
    <Header title='Profile'/>
    <Profile creditBalance={data.creditBalance} imageManipulated={data.imageManipulated}/>
    </>
  )
}

export default ProfilePage