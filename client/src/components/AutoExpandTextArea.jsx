import { X } from "lucide-react";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

function AutoExpandTextarea({
  placeholder,
  onChange,
  question,
  answer,
  img,
  mediaType,
}) {
  const [value, setValue] = useState("");
  const [zoomImage, setZoomImage] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div>
      {img && mediaType === "image" && (
        <div className="w-full h-[20vh]">
          <img
            src={img}
            alt="selected image"
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => setZoomImage(true)}
          />
        </div>
      )}
      {img && mediaType === "video" && <VideoPlayer video={img} />}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/80 z-999 flex items-center justify-center"
          onClick={() => setZoomImage(false)}
        >
          <button
            className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4 z-1000 text-white bg-black/60 hover:bg-black/80"
            onClick={() => setZoomImage(false)}
          >
            <X size={22} />
          </button>

          <img
            src={img}
            alt="zoomed"
            className="max-w-[90%] max-h-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <textarea
        className="w-full p-2 resize-none focus:outline-none bg-transparent text-lg leading-relaxed"
        rows={1}
        placeholder={placeholder || "Write here..."}
        value={value || question || answer}
        onChange={handleChange}
      />
    </div>
  );
}

export default AutoExpandTextarea;
