import TransformedImage from '@/components/shared/TransformedImage';
import { getImageById } from '@/lib/utils';

interface Params {
  id:string
}

async function TransformationPage({params}:{params:Params}) {
  const image = await getImageById(params.id);
  return (
    <TransformedImage image={image}/>
  )
}

export default TransformationPage