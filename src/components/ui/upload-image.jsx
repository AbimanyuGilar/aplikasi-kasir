import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon } from "lucide-react";

export function UploadImage(props) {
  const [preview, setPreview] = useState(props.initialImage || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Label
        htmlFor="image"
        className="
          flex
          justify-center
          items-center
          border-dashed 
          h-32  /* Berikan tinggi yang konsisten */
          border-2
          hover:bg-accent
          text-muted-foreground
          rounded-md
          cursor-pointer
          overflow-hidden"
      >
        {preview ? (
          <img 
            src={preview} 
            alt="Preview" 
            className="h-full w-full object-cover" 
          />
        ) : (
          <ImageIcon />
        )}
      </Label>
      <Input
        id="image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        {...props}
      />
    </>
  );
}