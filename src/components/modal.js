import React, {useState, useEffect} from 'react';
import { Modal, Button, Input } from 'antd';
import {EditOutlined} from '@ant-design/icons';

const CardModal = ({data = {}, close, setCard}) => {
    const {show, card = {}} = data
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [isEdit, setEditTitle] = useState(false);

    useEffect(() => {
        card.desc  && setDesc(card.desc);
        card.title && setTitle(card.title);
    }, [card]);

    const handleChange= ({ target: { name, value } }) => {
        name === 'title' ? setTitle(value) : setDesc(value)
    };

    const handleClose = () => {
        close()
        setEditTitle(false)
        setDesc('')
        setTitle('')
    };

    const handleSubmit = () => {
        setCard({...card, title: title.trim(), desc: desc.trim()})
        handleClose()
    };

    const handleDelete = () => {
        setCard(card, true)
        handleClose()
    };

    return (
        <Modal
            className="item--card"
            title={
                isEdit ?
                    [
                        <Input.TextArea
                            className="modal--title-input"
                            key={card.id+'_'}
                            value={title}
                            name="title"
                            onChange={handleChange}
                        />
                    ]
                    :
                    [
                        <div className='modal--title' key={card.id+'___'}>
                            <span>{card.title}</span>
                            <span className='edit-icon' onClick={() => setEditTitle(true)}><EditOutlined /></span>
                        </div>
                    ]
            }
            visible={show}
            onOk={handleClose}
            onCancel={handleClose}
            footer={[
                <div key="buttons" className="custom-buttons">
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                    >
                        Сохранить
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={handleDelete}
                    >
                        Удалить
                    </Button>
                </div>,
            ]}
        >
            <p>
                <Input.TextArea
                    value={desc}
                    name="desc"
                    onChange={handleChange}
                    placeholder="Описание"
                    autoSize={{ minRows: 3 }}
                />
            </p>
        </Modal>
    );
}

export default CardModal