import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react'

const { TextArea } = Input;

const ProjectUploadForm = (props) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState({});

  useEffect(() => {
    // axios.get("http://localhost:3000/user/J2lhMMs3P9UISWlzfhKIYj9xOIA3")
    axios.get("http://localhost:3000/user/" + props.uid)
      // .then(res => res.data)
      .then(res => res.data)
      .then(setUser)
  }, []);

  // console.log(user.username);

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFinish = () => {
    // console.log('http://localhost:3000/patchBasicInfo/' + user.uid);
    axios.post(
      'http://localhost:3000/patchBasicInfo/' + props.uid, {
        username: form.getFieldValue('username'),
        contact: form.getFieldValue('contact'),
        location: form.getFieldValue('location'),
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
        // username: user.username ? user.username : 'default_username',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {user.uid &&
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input a username!',
          },
        ]}
        initialValue={user.username ? user.username : 'default_username'}
      >
        <Input />
      </Form.Item>}

      {user.uid &&
      <Form.Item
        label="Contact"
        name="contact"
        rules={[
          {
            required: true,
            message: 'Please input a contact!',
          },
        ]}
        initialValue={user.contact ? user.contact : 'default_contact'}
      >
        <Input />
      </Form.Item>}

      {user.uid &&
      <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: 'Please input a location!',
          },
        ]}
        initialValue={user.location ? user.location : 'default_location'}
      >
        <Input />
      </Form.Item>}


      {user.uid &&
      <Form.Item
        label="Summary"
        name="summary"
        rules={[
          {
            required: true,
            message: 'Please input a summary of yourself!',
          },
        ]}
        initialValue={user.bio ? user.bio : 'default_summary'}
      >
        <TextArea
          placeholder="summary of yourself"
          autoSize={{
            minRows: 2,
            maxRows: 6,
          }}
        />
      </Form.Item>}

      {/* <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input a username!',
          },
        ]}
        initialValue={user.username ? user.username : 'default_username'}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contact"
        name="contact"
        rules={[
          {
            required: true,
            message: 'Please input a contact!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: 'Please input a location!',
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
      </Form.Item> */}

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
          Update
        </Button>
      </Form.Item>
    </Form>
  )}
export default ProjectUploadForm;