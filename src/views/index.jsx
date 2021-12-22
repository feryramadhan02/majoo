import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Modal } from "react-bootstrap";
import Button from '../components/button';
import { deleteTodo, getDataTodo, getIdTodo } from '../store/actions/crud';

import '../assets/scss/main.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Forms from '../components/form';

const IconDelete = <FontAwesomeIcon icon={faTrashAlt} />;
const IconEdit = <FontAwesomeIcon icon={faEdit} />;

const Home = () => {
    const dispatch = useDispatch()
    const [type, setType] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [saveId, setSaveId] = useState(0)
    const [showDialogDel, setShowDialogDel] = useState(false)
    const { data } = useSelector((state) => state.crudState)

    useEffect(() => {
        dispatch(getDataTodo())
    }, [dispatch, saveId])


    // ------------------------------------Initial Empty Data--------------------------------
    const Empty = () => {
        return <div className="empty-data">
            <h2>No Data</h2>
        </div>
    }

    // ------------------------------------Style Status--------------------------------
    const todoStatus = (item) => {
        if (item.status === 1) {
            return <p className='status-done'>Selesai</p>
        } else {
            return <p className='status-process'>Proses</p>
        }
    }

    // ------------------------------------Asc/DEsc Function--------------------------------
    let asc = data.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })
    let desc = data.sort((function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt)
    })).reverse()

    const dataDone = desc.map((item) => item).filter((list) => list.status !== 0)
    const dataProcess = asc.map((item) => item).filter((list) => list.status === 0)

    // ------------------------------------Add/Edit Function--------------------------------
    const handleShowModal = () => {
        setType("add")
        setShowModal(true)
    }
    const handleShowModalEdit = (id) => {
        setType("edit")
        setSaveId(id)
        dispatch(getIdTodo(id))
        setShowModal(true)
    }
    const handleCloseModal = () => setShowModal(false)
    const handleCloseModalOut = (val) => setShowModal(val)

    // ------------------------------------Delete Function--------------------------------
    const handleShowDel = (id) => {
        setSaveId(id)
        setShowDialogDel(true)
    }
    const handleCloseDel = () => setShowDialogDel(false)
    const delData = (id) => {
        dispatch(deleteTodo(id))
        setShowDialogDel(false)
    }

    return (
        <>
            <div className="containers">
                <div className="base-head-action">
                    <Button
                        className='btn-add'
                        type='button'
                        isDisabled={false}
                        onClick={handleShowModal}
                    >
                        + Tambah
                    </Button>
                </div>
                <h2 className='title-table-status'>Todo Haven't Done</h2>
                <div className="table-wrapper">
                    <table className='table-data'>
                        <thead className='table-head'>
                            <tr className='head-title-table'>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {data.length !== 0 ?
                            <>
                                <tbody className='table-body'>
                                    {dataProcess.map((item) => (
                                        <tr key={item.id} className='data-row'>
                                            <td>{item.id}</td>
                                            <td style={{ width: '400px' }}>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{todoStatus(item)}</td>
                                            <td>
                                                <div className="base-btn-action">
                                                    <Button
                                                        className='btn-edit'
                                                        type='button'
                                                        isDisabled={false}
                                                        onClick={() => handleShowModalEdit(item.id)}
                                                    >
                                                        {IconEdit} Update
                                                    </Button>
                                                    <Button
                                                        className='btn-delete'
                                                        type='button'
                                                        isDisabled={false}
                                                        onClick={() => handleShowDel(item.id)}
                                                    >
                                                        {IconDelete} Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                            :
                            <tbody>
                                <tr>
                                    <td colSpan={6}>
                                        <Empty />
                                    </td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>
                <h2 className='title-table-status'>Todo Done</h2>
                <div className="table-wrapper">
                    <table className='table-data'>
                        <thead className='table-head'>
                            <tr className='head-title-table'>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {data.length !== 0 ?
                            <>
                                <tbody className='table-body'>
                                    {dataDone.map((item) => (
                                        <tr key={item.id} className='data-row'>
                                            <td>{item.id}</td>
                                            <td style={{ width: '400px' }}>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{todoStatus(item)}</td>
                                            <td>
                                                <div className="base-btn-action">
                                                    <Button
                                                        className='btn-edit'
                                                        type='button'
                                                        isDisabled={false}
                                                        onClick={() => handleShowModalEdit(item.id)}
                                                    >
                                                        {IconEdit} Update
                                                    </Button>
                                                    <Button
                                                        className='btn-delete btn-done-disable'
                                                        type='button'
                                                        isDisabled={true}
                                                    >
                                                        {IconDelete} Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                            :
                            <tbody>
                                <tr>
                                    <td colSpan={6}>
                                        <Empty />
                                    </td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>{type === "add" ? "Add Data" : "Edit Data"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Forms type={type} close={handleCloseModalOut} id={saveId} />
                </Modal.Body>
            </Modal>

            <Modal show={showDialogDel} onHide={handleCloseDel}>
                <Modal.Header>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Anda Yakin ?</Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn-cancel"
                        type="button"
                        isDisabled={false}
                        onClick={handleCloseDel}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="btn-submit"
                        type="button"
                        isDisabled={false}
                        onClick={() => delData(saveId)}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Home;