import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ReusableModal = ({ show, handleClose, action, docData, handleAction }) => {

    const [file, setFile] = useState(docData ? docData.file : null);
    const [fileName, setFileName] = useState(docData ? docData.filelabel : '');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        setFileName(e.target.value);
    };

    const onAction = () => {
        handleAction({ fileName, file });
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    {action === 'upload' && 'Upload Document'}
                    {action === 'edit' && 'Edit Document'}
                    {action === 'delete' && 'Delete Document'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {action === 'delete' ? (
                    <p>Are you sure you want to delete?</p>
                ) : (
                    <Form>
                        <Form.Group>
                                <Form.Label>File Description</Form.Label>
                                
                            <Form.Control
                                type="text"
                                defaultValue={action === 'edit' ? docData.filelabel : '' }
                                onChange={handleChange}
                                placeholder="Enter File Name"
                            />
                            </Form.Group>
                            <br />
                        {action !== 'edit' && (
                            <Form.Group>
                                <Form.Label>Select Document</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Form.Group>
                        )}
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={action === 'delete' ? 'danger' : 'primary'} onClick={onAction}>
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReusableModal;
