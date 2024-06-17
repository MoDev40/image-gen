import TransformedImage from '@/components/shared/TransformedImage';
import { API } from '@/lib/config';
import axios from 'axios';

interface Params {
  id:string
}

export async function getImageById (id:string) : Promise<ImageInterface> {
  const res = await axios.get(`${API}/images/${id}`);
  return await res.data.image;
}

async function TransformationPage({params}:{params:Params}) {
  const image = await getImageById(params.id);
  return (
    <TransformedImage image={image}/>
  )
}

export default TransformationPage