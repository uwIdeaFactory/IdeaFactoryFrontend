import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const ProjectUploadForm = () => {
  const [form] = Form.useForm();


  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  
  const onFinish = () => {
    axios.post(
      'http://localhost:3000/post', {
        pname: form.getFieldValue('pname'), 
        preview: form.getFieldValue('preview'),
        detail: form.getFieldValue('detail'),
        owner: "test owner",
        location: "test location"
      }
    )
    .then (() => {
      message.success('Submit success!');
    })
    .catch (() => {
      onFinishFailed()
    })
  };

  return (
    <Form
      form={form}
      name="form"
      labelCol={{
        span: 3,
      }}
      wrapperCol={{
        span: 16,
      }}
      // style={{
      //   maxWidth: 600,
      // }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="pname"
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
        name="preview"
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
        name="detail"
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
        <Button type="primary" htmlType="submit"
          style={{
            textAlign: 'center',
          }}>
          Upload
        </Button>
      </Form.Item>
    </Form>
  )}
export default ProjectUploadForm;