import AddTranFormationForm from '@/components/shared/AddTranFormationForm';
import CreditAlert from '@/components/shared/CreditAlert';
import Header from '@/components/shared/Header';
import { transformationTypes } from '@/constants';
import { API } from '@/lib/config';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';

interface Params {
  type:string
}

interface TransformationType {
  type: string;
  title: string;
  subTitle: string;
  config: {
    [key: string]: any;
  };
  icon: string;
}

async function getUser (id:string) : Promise<DBUser> {
  const res = await axios.get(`${API}/users/${id}`);
  return await res.data.user;
}

async function AddTransformationType({params}:{params:Params}) {
  const {type} = params
  const { userId } : { userId: string | null } = auth();
  const user = await getUser(userId!)
  const transform : TransformationType = transformationTypes[type as keyof typeof transformationTypes]
  return (
    <>
    <Header title={transform.title} subtitle={transform.subTitle}/>
    {user.creditBalance === 0 ? <CreditAlert/> :
    <AddTranFormationForm user_id={user._id} data={null} action='Add'  type={transform.type}/>}
    </>
  )
}

export default AddTransformationType