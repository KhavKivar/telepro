import { useState } from "preact/hooks";
import Pagination from "./switchImage";

export default function ImageGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      <img src={images[selected]} className="rounded-lg shadow-md" />

      <Pagination
        selected={selected}
        total={images.length}
        onClick={(index) => setSelected(index)}
      />
    </div>
  );
}
