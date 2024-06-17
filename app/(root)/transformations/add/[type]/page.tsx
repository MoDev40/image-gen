import AddTranFormationForm from '@/components/shared/AddTranFormationForm';
import Header from '@/components/shared/Header';
import { transformationTypes } from '@/constants';
import { getUser } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';

interface TransformationType {
  type: string;
  title: string;
  subTitle: string;
  config: {
    [key: string]: any;
  };
  icon: string;
}


async function AddTransformationType({params}:{params:Params}) {
  const {type} = params
  const { userId } : { userId: string | null } = auth();
  const user = await getUser(userId!)
  const transform : TransformationType = transformationTypes[type as keyof typeof transformationTypes]
  return (
    <>
    <Header title={transform.title} subtitle={transform.subTitle}/>
    <AddTranFormationForm user={user} updateImage={null} action='Add'  type={transform.type}/>
    </>
  )
}

export default AddTransformationType