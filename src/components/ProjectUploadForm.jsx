import { Button, Form, Input, message, Space } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const ProjectUploadForm = () => {
  const [value, setValue] = useState('');
  const [form] = Form.useForm();
  const onFinish = () => {
    message.success('Submit success!');
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  const onFill = () => {
    form.setFieldsValue({
      url: 'https://taobao.com/',
    });
  };
  return (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Title"
      name="project title"
      rules={[
        {
          required: true,
          message: 'Please input your project title!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Brief"
      name="brief description"
      rules={[
        {
          required: true,
          message: 'Please input brief description!',
        },
      ]}
    >
      <TextArea
        placeholder="brief description"
        autoSize={{
          minRows: 2,
          maxRows: 6,
        }}
      />
    </Form.Item>

    <Form.Item
      label="Description"
      name="detailed description"
      rules={[
        {
          required: true,
          message: 'Please input description!',
        },
      ]}
    >
      <TextArea
        placeholder="description"
        autoSize={{
          minRows: 2,
          maxRows: 6,
        }}
      />
    </Form.Item>
    
    <Form.Item
        name="url"
        label="URL"
        rules={[
          {
            required: false,
          },
          {
            type: 'url',
            warningOnly: true,
          },
          {
            type: 'string',
            min: 6,
          },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Upload
      </Button>
    </Form.Item>
  </Form>
)}
export default ProjectUploadForm;