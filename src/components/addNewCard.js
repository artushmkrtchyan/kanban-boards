import React, {useState, useRef, useEffect} from 'react';
import { Button } from 'antd';

const AddNewCard = (props) => {
    const ref = useRef(null)
    const [show, setShow] = useState(false);

    useEffect(()=>{
        if (show) {
            ref.current.focus();
        }
    }, [show])


    const onSubmit = event => {
        const form = event.target;
        event.preventDefault();

        const value = form.input.value.trim();
        if (!value) return;

        props.onSubmit(value);
        form.reset();
        setShow(false);
    };

    return (
        <div className="new-card-form">
            {
                show ?
                    <form onSubmit={onSubmit}>
                        <textarea
                            name="input"
                            rows="2"
                            ref={ref}
                            className="form--input"
                            placeholder="Введите текст карточки"
                         />
                        <div className="form--footer">
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Добавить карточку
                            </Button>
                            <div onClick={() => setShow(false)}>
                                Отмена
                            </div>
                        </div>
                    </form>
                    :
                <div
                    className="form--div"
                    onClick={() => setShow(true)}
                >
                    <span>+</span>Добавить еще одну карточку...
                </div>
            }
        </div>

    );
}

export default AddNewCard
