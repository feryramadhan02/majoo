import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from 'moment';
import { addTodo, editTodo, getDataTodo } from "../../store/actions/crud";

import '../../assets/scss/form.scss';

const Forms = ({ close, id, type }) => {
    const dispatch = useDispatch()
    const { dataDetail } = useSelector((state) => state.crudState)
    const [data, setData] = useState({
        title: "",
        description: "",
        createdAt: "",
        status: false
    })

    // ------------------Every type not equal "add" then render initial function as initialvalue of data--------------------------
    useEffect(() => {
        if (type !== "add") {
            const initial = () => {
                setData({
                    title: dataDetail.title,
                    description: dataDetail.description,
                    createdAt: moment(dataDetail.createdAt),
                    status: dataDetail.status === 1 ? true : false
                })
            }
            initial()
        }
    }, [dataDetail, type])

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        if (type !== "add") {
            dispatch(editTodo(data, id))
        } else {
            dispatch(addTodo(data))
        }
        dispatch(getDataTodo())
        close(false)
    }

    const closeModal = (e) => {
        e.preventDefault()
        close(false)
        setData({
            title: "",
            description: "",
            created: "",
            status: false
        })
    }

    return (
        <>
            <Form onSubmit={submit}>
                {/* conditional when the type edit it sould be any defaultValue */}
                {type !== "add" ?
                    <>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Title :</Form.Label>
                            <Form.Control className="input" type="text" name="title" onChange={handleInput} defaultValue={data.title} />
                        </Form.Group>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Description :</Form.Label>
                            <Form.Control className="input" type="text" name="description" onChange={handleInput} defaultValue={data.description} />
                        </Form.Group>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Created :</Form.Label>
                            <Form.Control className="input" type="date" name="createdAt" onChange={handleInput} defaultValue={data.createdAt} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect">
                            <Form.Label>Status :</Form.Label>
                            <Form.Control as="select" className="input" name="status" onChange={handleInput} defaultValue={data.status}>
                                <option value={true}>Sukses</option>
                                <option value={false}>Gagal</option>
                            </Form.Control>
                        </Form.Group>
                    </>
                    :
                    <>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Nama :</Form.Label>
                            <Form.Control className="input" type="text" name="title" onChange={handleInput} value={data.title} />
                        </Form.Group>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Description :</Form.Label>
                            <Form.Control className="input" type="text" name="description" onChange={handleInput} value={data.description} />
                        </Form.Group>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Created :</Form.Label>
                            <Form.Control className="input" type="date" name="createdAt" onChange={handleInput} value={data.createdAt} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect">
                            <Form.Label>Status :</Form.Label>
                            <Form.Control as="select" className="input" name="status" onChange={handleInput} value={data.status}>
                                <option value={true}>Sukses</option>
                                <option value={false}>Gagal</option>
                            </Form.Control>
                        </Form.Group>
                    </>
                }
                <div className="actions">
                    <Button
                        className="btn-cancel"
                        type="button"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="btn-submit"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default Forms;
