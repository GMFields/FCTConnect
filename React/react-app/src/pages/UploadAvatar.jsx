import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";


export const UploadAvatar = () =>{
    const[src, setSrc] = useState(null);
    const[preview, setPreview] = useState(null);
    
    
    const onCrop = (view) =>{
        setPreview(view)
    }

    const onClose = () =>{
        setPreview(null)
    }

    useEffect(() => {
        console.log(preview)
    }, [preview])

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40%" }}>
      <div style={{ width: "20%", height: "20%" }}>
        <Avatar width={400} height={300} onCrop={onCrop} onClose={onClose} src={src} />
        {preview && <img src={preview} style={{ width: "20%", height: "20%", borderRadius: "50%" }} />}
      </div>
    </div>
    );
};
