import React, { useState } from 'react';
import ReusableModal from '../Modal/modal';
import { Button } from 'react-bootstrap';

const DocumentManager = () => {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');
    const [selectedDoc, setSelectedDoc] = useState('');
    const [documents, setDocuments] = useState(JSON.parse(localStorage.getItem('uploads')) || []);
    const [loginInfo] = useState(JSON.parse(localStorage.getItem('LoggedInfo')) || []);
    const [showDocs] = useState(documents.filter((data) => data.userid === loginInfo.id) || []);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleShow = (actionType, doc = '') => {
        setAction(actionType);
        setSelectedDoc(doc);
        setShowModal(true);
    };

    const handleUpload = ({ fileName, file }) => {
        if (fileName === '') {
            alert("Please enter File Description");
            return;
        } else if (!file) {
            alert("Please select a file before uploading.");
            return;
        } else {
            if (file && fileName) {
                const newDoc = {
                    id: Number(new Date()),
                    userid: loginInfo.id,
                    filelabel: fileName,
                    fileName: file.name,
                };
                const updatedDocs = [...documents, newDoc];
                setDocuments(updatedDocs);
                localStorage.setItem('uploads', JSON.stringify(updatedDocs));
            }
            handleClose();
        }
    };

    const handleEdit = ({ fileName }) => {
        if (fileName === '') {
            alert("Please Description cannot be Blank");
            return;
        } else {
            const updatedDocs = documents.map((doc) =>
                doc.id === selectedDoc.id ? { ...doc, filelabel: fileName } : doc
            );
            setDocuments(updatedDocs);
            localStorage.setItem('uploads', JSON.stringify(updatedDocs));
            handleClose();
        }
    };

    const handleDelete = () => {
        const updatedDocs = documents.filter((doc) => doc.id !== selectedDoc.id);
        setDocuments(updatedDocs);
        localStorage.setItem('uploads', JSON.stringify(updatedDocs));
        handleClose();
    };

    const handleAction = (data) => {
        if (action === 'upload') {
            handleUpload(data);
        } else if (action === 'edit') {
            handleEdit(data);
        } else if (action === 'delete') {
            handleDelete();
        }
    };

    return (
        <>
            <div className='container'>
                <div className='main-div'>
                    <h1>Document Lists</h1>

                    <Button variant="primary" onClick={() => handleShow('upload')} style={{ maxWidth: '200px', marginBottom: '20px' }}>
                        Upload Document
                    </Button>

                    <table className="table table-striped table-hover text-center table-div">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showDocs.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.filelabel}</td>
                                        <td>{item.fileName}</td>
                                        <td>
                                            <Button
                                                variant="secondary"
                                                onClick={() => handleShow('edit', item)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleShow('delete', item)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <ReusableModal
                        show={showModal}
                        handleClose={handleClose}
                        action={action}
                        docData={selectedDoc}
                        handleAction={handleAction}
                    />
                </div>
            </div>
        </>
    );
};

export default DocumentManager;
