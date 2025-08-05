'use client'
import Slider from '@mui/material/Slider'
import Cropper from 'react-easy-crop'
import { useRef, useState } from 'react'
import styles from "@/app/settings/settings.module.css";
import { getCroppedImg } from '@/lib/helperImage';
import { useRouter } from 'next/navigation';

export default function AvatarSelector({data}){
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [file,setFile] = useState(data.propic_url);
    const [image,setImage] = useState();
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const nav=useRouter();
    const fileRef=useRef(null);

    const onFileChange=(e)=>{
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setFile(reader.result);
        };
        reader.readAsDataURL(file);
        setImage(file);
    }

    const onCropChange = (crop) => {
        setCrop(crop)
    }

    const onCropComplete = (_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onZoomChange = (zoom) => {
        setZoom(zoom)
    }

    const showDialog = (e)=>{
        fileRef.current.click();
    }

    const handleSave = async () => {
        const croppedBlob = await getCroppedImg(file, croppedAreaPixels);
        const formData = new FormData();
        formData.append('propic', croppedBlob,'avatar.jpg');
        
        const res = await fetch('/api/user/upload_avatar', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            alert('Uploaded successfully!');
            nav.push("/"+data.username);
        } else {
            alert('Upload failed');
        }
    }

    return (
    <main className={styles.main}>
        <div className={styles["crop-container"]}>
        <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
        />
        </div>
        <div className={styles.controls}>
            <h1>-</h1>
            <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.5}
                marks
                aria-label="Zoom"
                onChange={(e, zoom) => onZoomChange(zoom)}
                color='gray'
            />
            <h1>+</h1>
        </div>
        <div className={styles.loader}>
            <div className={styles.buttons}>
                <button type="button" onClick={showDialog}>Change Avatar</button>
                <input type="file" name='file-upload' id='file-upload' onChange={onFileChange} hidden ref={fileRef}/>
                <button onClick={handleSave}>Save</button>
            </div>
            <div className={styles.info}>
                <i>Avatars must be JPEG or PNG format with maximum size of 2MB</i>
            </div>
        </div>
    </main>
    )

}