import { Button, Form, Input, message, Space, InputNumber } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../AuthContext';

const { TextArea } = Input;

const ProjectUploadForm = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const [spaces, setSpaces] = useState([]);

  const handleAddSpace = () => {
    setSpaces([...spaces, ['', '', [], []]]);
    console.log(spaces);
  };

  const handleRemoveSpace = (index) => {
    const updatedSpaces = [...spaces];
    updatedSpaces.splice(index, 1);
    setSpaces(updatedSpaces);
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFinish = async () => {
    await axios.post(
      'https://api.ideafactoryuw.com/post', {
      // 'http://localhost:3000/post', {
      pname: form.getFieldValue('pname'),
      contact: [form.getFieldValue('email'), form.getFieldValue('mobile'), form.getFieldValue('url')],
      preview: form.getFieldValue('preview'),
      detail: form.getFieldValue('detail'),
      owner: user.uid,
      location: "test",
      roles: spaces,
    }
    )
      .then(() => {
        message.success('Submit success!');
        console.log(spaces);
        // wait for a second and then redirect to the project page
        setTimeout(() => {
          window.location.href = '/';
        }
          , 1000);

      })
      .catch(() => {
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
        <Input placeholder="MyProject" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input an email!',
          },
        ]}
      >
        <Input placeholder="sample@email.com" />
      </Form.Item>

      <Form.Item
        label="Mobile"
        name="mobile"
        rules={[
          {
            required: true,
            message: 'Please input a mobile number!',
          },
        ]}
      >
        <Input placeholder="+1 000-000-0000" />
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
        label="Roles"
        name="roles"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Button type="primary" onClick={handleAddSpace}>
          + Add
        </Button>
        <div>
          {spaces.map((space, index) => (
            <div key={index}> {/* Assign unique key using the index */}
              <Space.Compact>
                <Input
                  placeholder="Role Name"
                  required
                  value={space[0]}
                  onChange={(e) => {
                    const updatedSpaces = [...spaces];
                    updatedSpaces[index][0] = e.target.value;
                    setSpaces(updatedSpaces);
                  }}
                />
                <InputNumber
                  placeholder="Capacity"
                  required
                  value={space[1]}
                  min={1}
                  onChange={(value) => {
                    const updatedSpaces = [...spaces];
                    updatedSpaces[index][1] = value;
                    setSpaces(updatedSpaces);
                  }}
                />
                <Button onClick={() => handleRemoveSpace(index)}>Delete</Button>
              </Space.Compact>
            </div>
          ))}
        </div>
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
        <Input placeholder="yourproject.github.com" />
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
  )
}
export default ProjectUploadForm;