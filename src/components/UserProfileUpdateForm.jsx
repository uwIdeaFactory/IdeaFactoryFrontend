import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage } from '../firebase';

const { TextArea } = Input;

const ProjectUploadForm = (props) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState({});
  const [disable, setDisable] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get("http://35.165.101.117/user/" + props.uid)
      .then(res => res.data)
      .then(setUser)
  }, []);


  const uploadResume = async () => {
    if (!file) return;
    const storageRef = ref(storage, 'resumes/' + user.uid + '.pdf');
    uploadBytes(storageRef, file);
  }

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFinish = async () => {
    let resume = "";
    if (file) {
      console.log("enter");
      const storageRef = ref(storage, 'resumes/' + user.uid + '.pdf');
      try {
        await uploadBytes(storageRef, file);
        resume = await getDownloadURL(storageRef);
        console.log('File available at', resume);
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    }

    let contact = [form.getFieldValue('email'), form.getFieldValue('mobile'), form.getFieldValue('website')]
    axios.post(
      'http://35.165.101.117/patchBasicInfo/' + props.uid, {
      username: form.getFieldValue('username'),
      contact: contact,
      location: form.getFieldValue('location'),
      summary: form.getFieldValue('summary'),
      resume: resume,
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

      initialValues={{
        remember: true,
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
        <input type='file' id='select-file' onChange={(event) => { setFile(event.target.files[0]) }} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
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