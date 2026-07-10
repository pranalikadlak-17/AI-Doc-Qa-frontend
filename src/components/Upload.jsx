import { useState } from "react";
import API from "../services/api";

function Upload() {

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

        } catch(error) {

            console.log(error);
            setMessage("Upload failed");

        }
    };


    return (
        <div>

            <h2>Upload Document</h2>

            <input
                type="file"
                accept=".pdf"
                onChange={(e)=>setFile(e.target.files[0])}
            />

            <button onClick={handleUpload}>
                Upload
            </button>

            <p>{message}</p>

        </div>
    );
}

export default Upload;