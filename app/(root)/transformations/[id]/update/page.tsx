import AddTranFormationForm from '@/components/shared/AddTranFormationForm';
import { getImageById } from '@/lib/utils';

interface Params {
  id:string
}

async function UpdateTransformationPage({params}: {params: Params}) {
  const image = await getImageById(params.id);
  return (
    <AddTranFormationForm
    type={image.transformationType}
    data={image}
    action='Update'
    user_id={image.author}
    />
  )
}

export default UpdateTransformationPage