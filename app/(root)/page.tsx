import RecentImages from "@/components/shared/RecentImages";
import { API } from "@/lib/config";
import { ImageDocument } from "@/lib/database/models/imageModal";
import axios from "axios";

async function getImages () : Promise<ImageDocument[]> {
  const res = await axios.get(`${API}/images`);
  return await res.data.images;
}
export default async function Home() {
  const images = await getImages();
  return (
    <div className="flex flex-col gap-4">
      <h1>Recent images</h1>
      <RecentImages
      images={images}
      />
    </div>
  );
}
