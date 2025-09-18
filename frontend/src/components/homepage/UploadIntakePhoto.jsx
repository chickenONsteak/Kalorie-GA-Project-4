import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetch from "../../hooks/useFetch";

const UploadIntakePhoto = () => {
  const fetchData = useFetch();

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    if (!uploadedImage) return; // IF USER REMOVES IMAGE AND uploadedImage BECOMES UNDEFINED

    const reader = new FileReader();

    // ASSIGN FUNCTION TO onloadend PROPERTY FIRST BEFORE READING
    reader.onloadend = async () => {
      //   console.log(reader.result);
      const base64ImageStr = reader.result.split(",")[1]; // reader.result gives 2 things: meta data (what we don't need) AND the converted image to ASCII string (what we need)

      // SEND REQUEST WITH BASE64 IMAGE
      try {
        const res = await fetchData("/openai/identify_food", "PUT", {
          uploaded_image: base64ImageStr,
        });

        if (res.ok) {
          console.log("successfully read image");
        }
      } catch (error) {
        console.error(error.msg);
      }
    };

    reader.readAsDataURL(uploadedImage); // START READING FILE
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        accept="image/*"
        onChange={(event) => handleImageUpload(event)}
      />
    </div>
  );
};

export default UploadIntakePhoto;
