import TransformedImage from '@/components/shared/TransformedImage';
import { getImageById } from '@/lib/utils';


async function TransformationPage({params}:{params:Params}) {
  const image = await getImageById(params.id);
  return (
    <TransformedImage image={image}/>
  )
}

export default TransformationPage