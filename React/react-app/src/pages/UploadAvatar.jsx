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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "400px", height: "300px" }}>
        <Avatar width={400} height={300} onCrop={onCrop} onClose={onClose} src={src} />
        {preview && <img src={preview} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />}
      </div>
    </div>
    );
};
