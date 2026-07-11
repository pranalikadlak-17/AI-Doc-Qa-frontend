import { useEffect, useState } from "react";
import API from "../services/api";
import "./DocumentList.css";
function DocumentList() {

    const [documents, setDocuments] = useState([]);

    const fetchDocuments = async () => {

        try {

            const response = await API.get("");

            setDocuments(response.data);

        } catch(error) {

            console.log(error);

        }
    };

    const deleteDocument = async (id) => {

        try {

            await API.delete(`/${id}`);

            fetchDocuments();

        } catch(error) {

            console.log(error);

        }

    };



    useEffect(() => {

        fetchDocuments();

    }, []);


    return (
        <div className="document-container">

            <h2>Uploaded Documents</h2>

           {
    documents.map((doc)=>(
        <div  className="document-card" key={doc.id}>

            <p>
                {doc.fileName}
            </p>

            <p>
                Type: {doc.fileType}
            </p>

            <button 
                 className="delete-btn"
                 onClick={() => deleteDocument(doc.id)}
            >
                Delete
                </button>

        </div>
    ))
}

        </div>
    );
}

export default DocumentList;