import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react'

const { TextArea } = Input;

const ProjectUploadForm = (props) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState({});
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    // axios.get("http://localhost:3000/user/J2lhMMs3P9UISWlzfhKIYj9xOIA3")
    axios.get("http://localhost:3000/user/" + props.uid)
      // .then(res => res.data)
      .then(res => res.data)
      .then(setUser)
  }, []);

  // console.log(user.username);

  const uploadResume = async() => {
    let src = user.uid + '_resume';
    let input = document.getElementById('select-file');
    console.log(input.files[0]);

    let reqUrl = 'api url here!'
    const { url } = await fetch(reqUrl).then(res => res.json());

    await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: input.files[0]
    });
  }

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFinish = () => {
    // console.log('http://localhost:3000/patchBasicInfo/' + user.uid);
    let contact = [form.getFieldValue('email'), form.getFieldValue('mobile'), form.getFieldValue('website')]
    axios.post(
      'http://localhost:3000/patchBasicInfo/' + props.uid, {
      username: form.getFieldValue('username'),
      contact: contact,
      location: form.getFieldValue('location'),
      summary: form.getFieldValue('summary')
    }
    )
      .then(() => {
        uploadResume();
        message.success('Submit success!');
        // Wait for 1 second
        setTimeout(() => {
          window.location.href = "/userprofile/" + props.uid
        }, 5000);
        setDisable(true);
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
          initialValue={user.username ? user.username : ''}
        >
          <Input placeholder="DummyUser" />
        </Form.Item>}

      {/* {user.uid &&
        <Form.Item
          label="Contact"
          name="contact"
          rules={[
            {
              required: true,
              message: 'Please input a contact!',
            },
          ]}
          initialValue={user.contact ? user.contact : ''}
        >
          <Input placeholder="+1 000-000-0000" />
        </Form.Item>} */}

      {user.uid &&
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input an email!',
            },
          ]}
          initialValue={(user.contact && user.contact[0]) ? user.contact[0] : ''}
        >
          <Input placeholder="sample@email.com" />
        </Form.Item>}

      {user.uid &&
        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[
            {
              required: true,
              message: 'Please input a mobile number!',
            },
          ]}
          initialValue={(user.contact && user.contact[1]) ? user.contact[1] : ''}
        >
          <Input placeholder="+1 000-000-0000" />
        </Form.Item>}

      {user.uid &&
        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              required: false,
              // message: 'Please input a website!',
            },
          ]}
          initialValue={(user.contact && user.contact[2]) ? user.contact[2] : ''}
        >
          <Input placeholder="sample_website.com" />
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
          initialValue={user.location ? user.location : ''}
        >
          <Input placeholder="Seattle, WA" />
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
          initialValue={user.bio ? user.bio : ''}
        >
          <TextArea
            placeholder="summary of yourself"
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
        </Form.Item>}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >

      <input type='file' id='select-file'/>

        <Button type="primary" htmlType="submit" disabled={disable}
          style={{
            textAlign: 'center',
          }}>
          Update
        </Button>
      </Form.Item>
    </Form>
  )
}
export default ProjectUploadForm;