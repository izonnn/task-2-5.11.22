import React from 'react';
import {Button, Form, InputNumber} from "antd";
import {useElevatorsData} from "../../hooks/use-elevators";

const SetupPage = () => {
    const {setUserPreference} = useElevatorsData();

    const onFinish = (values: { floorsNumber: number, elevatorsNumber: number }) => {
        const {floorsNumber, elevatorsNumber} = values;
        setUserPreference(floorsNumber, elevatorsNumber);
    };

    return (
        <div className='setup-page'>
            <h2>Welcome to Hen Izon elevators app</h2>
            <p>Please select number of floors and number of elevators</p>
            <Form
                initialValues={{floorsNumber: 10, elevatorsNumber: 5}}
                onFinish={onFinish}
            >
                <Form.Item label="Enter number of floors" name="floorsNumber">
                    <InputNumber min={1}/>
                </Form.Item>
                <Form.Item label="Enter number of elevators" name='elevatorsNumber'>
                    <InputNumber min={1}/>
                </Form.Item>
                <Button htmlType='submit' type='primary'>Start app</Button>
            </Form>
        </div>
    );
};

export default SetupPage;
