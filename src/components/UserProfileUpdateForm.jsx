import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const ProjectUploadForm = () => {
  const [form] = Form.useForm();


  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFinish = () => {
    axios.patch(
      'http://localhost:3000/patchBasicInfo', {
        username: form.getFieldValue('username'),
        summary: form.getFieldValue('summary')
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
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input a username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Summary"
        name="summary"
        rules={[
          {
            required: true,
            message: 'Please input a summary of yourself!',
          },
        ]}
      >
        <TextArea
          placeholder="summary of yourself"
          autoSize={{
            minRows: 2,
            maxRows: 6,
          }}
        />
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