import TranFormationForm from '@/components/shared/TranFormationForm';
import { getImageById } from '@/lib/utils';


async function UpdateTransformationPage({params}: {params: Params}) {
  const image = await getImageById(params.id);
  return (
    <TranFormationForm
    type={image.transformationType}
    updateImage={image}
    action='Update'
    user={null}
    />
  )
}

export default UpdateTransformationPage