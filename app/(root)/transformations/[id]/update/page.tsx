import AddTranFormationForm from '@/components/shared/AddTranFormationForm';
import { getImageById } from '@/lib/utils';


async function UpdateTransformationPage({params}: {params: Params}) {
  const image = await getImageById(params.id);
  return (
    <AddTranFormationForm
    type={image.transformationType}
    updateImage={image}
    action='Update'
    user={null}
    />
  )
}

export default UpdateTransformationPage