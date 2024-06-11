import AddTranFormationForm from '@/components/shared/AddTranFormationForm';
import Header from '@/components/shared/Header';
import { transformationTypes } from '@/constants';
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
  const res = await axios.get(`http://localhost:3000/api/users/${id}`);
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
    <AddTranFormationForm user={user}  type={transform.type}/>
    </>
  )
}

export default AddTransformationType