import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReusableModal from '../Modal/modal';

function UserList() {

    const [Users, updateUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [loggedInUser] = useState(JSON.parse(localStorage.getItem('LoggedInfo')));
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');
    const [selectedId, setSelectedUser] = useState('');
    const navigate = useNavigate();

    const handleClose = () => {
        setShowModal(false);
    }

    const handleShow = (actionType, doc = '') => {
        setAction(actionType);
        setSelectedUser(doc);
        setShowModal(true);
    };

    const handleAction = (data) => {
        if (action === 'delete') {
            handleDelete();
        }
    };

    const handleDelete = () => {
        const userslist = Users.filter((user) => user.id !== selectedId.id);
        updateUsers(userslist);
        localStorage.setItem('users', JSON.stringify(userslist));
        handleClose();
    };

    const handleEditClick = (userid) => {
        navigate('edit-user', { state: { userid } });
    };

    return (
        <>
            <div className='container'>
                <div className='main-div'>
                    <h1>User Lists</h1>
                    <table className="table table-striped table-hover text-center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Users.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>

                                            <Button variant="secondary" type="button" onClick={() => handleEditClick(item.id)} style={{ marginLeft: '10px' }}>
                                                Edit
                                            </Button>
                                            {item.id != loggedInUser.id && (
                                                <Button variant="danger" onClick={() => handleShow('delete', item)} style={{ marginLeft: '10px' }}>
                                                    Delete
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <ReusableModal
                show={showModal}
                handleClose={handleClose}
                action={action}
                docData={setSelectedUser}
                handleAction={handleAction}
            />
        </>
    )
}

export default UserList;