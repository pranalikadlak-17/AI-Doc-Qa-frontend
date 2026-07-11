import { useState } from "react";
import API from "../services/api";
import "./Upload.css";
function Upload({ setDocumentId }) {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {

        if (!file) {
            setMessage("Please select a PDF file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            const response = await API.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setMessage(
                "Uploaded Successfully. Document ID: "
                + response.data.id
            );
              setDocumentId(response.data.id);

        } catch(error) {

            console.log(error);
            setMessage("Upload failed:" + error.message );

        }
    };


    return (
        <div className="upload-container">

            <h2>Upload Document</h2>

            <input
    className="file-input"
    type="file"
    accept=".pdf"
    onChange={(e)=>setFile(e.target.files[0])}
/>

            <button 
            className="upload-btn"
            onClick={handleUpload}>
    Upload
</button>

            <p>{message}</p>

        </div>
    );
}

export default Upload;