import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from '../components/button';
import { getDataTodo } from '../store/actions/crud';

import '../assets/scss/main.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const IconDelete = <FontAwesomeIcon icon={faTrashAlt} />;
const IconEdit = <FontAwesomeIcon icon={faEdit} />;

const Home = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.crudState)

    useEffect(() => {
        dispatch(getDataTodo())
    }, [dispatch])

    const Empty = () => {
        return <div className="empty-data">
            <h2>No Data</h2>
        </div>
    }

    const asc = data.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt)
    })

    const desc = data.sort((function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })).reverse()

    const dataDone = desc.map((item) => item).filter((list) => list.status !== 0)
    const dataProcess = asc.map((item) => item).filter((list) => list.status === 0)

    const todoStatus = (item) => {
        if (item.status === 1) {
            return <p className='status-done'>Selesai</p>
        } else {
            return <p className='status-process'>Belum</p>
        }
    }

    return (
        <>
            <div className="containers">
                <div className="base-head-action">
                    <Button
                        className='btn-add'
                        type='button'
                        isDisabled={false}
                    >
                        + Tambah
                    </Button>
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
                                                    >
                                                        {IconEdit} Update
                                                    </Button>
                                                    <Button
                                                        className='btn-delete'
                                                        type='button'
                                                        isDisabled={false}
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
                                                    >
                                                        {IconEdit} Update
                                                    </Button>
                                                    <Button
                                                        className='btn-delete'
                                                        type='button'
                                                        isDisabled={false}
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
        </>
    )
}

export default Home;