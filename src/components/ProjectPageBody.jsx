/* eslint-disable react/prop-types */
import { Descriptions, Table, Divider, Tag, message } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../AuthContext';
import { Button, notification, Space, Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { Column } = Table;

function ProjectPageBody(props) {
    console.log(props);
    return (
        <div className="projectPageBody">
            <h1>{props.pname}</h1>
            <Tag>{props.tag}</Tag>

            <Divider></Divider>

            <Descriptions bordered>
            <Descriptions.Item label="Owner">{props.owner_username}</Descriptions.Item>
            <Descriptions.Item label="Email">{props.contact ? props.contact[0] : ""}</Descriptions.Item>
            <Descriptions.Item label="Phone">{props.contact ? props.contact[1] : ""}</Descriptions.Item>
            <Descriptions.Item label="Website"><a href={props.contact ? props.contact[2] : ""}>{props.contact ? props.contact[2] : ""}</a></Descriptions.Item>
            <Descriptions.Item label="Location">{props.location}</Descriptions.Item>
            <Descriptions.Item label="Preview" span={3}>{props.preview}</Descriptions.Item>
            <Descriptions.Item label="Roles" span={3}>{RoleTable(props)}</Descriptions.Item>
            </Descriptions>

            <Divider></Divider>

            <h2>Description</h2>
            <p>{props.detail}</p>
        </div>
    );
}

// map the roles array to a table
function RoleTable(props) {
    const handleMenuClick = (e) => {
        
        // find the index of the first " "
        let temp = e.key.indexOf(" ");
        // substring first part
        let username = e.key.substring(0, temp);
        // substring second part
        let role = e.key.substring(temp + 1); 
        setUsername(username);
        setRole(role);
      };
    // the notification component api
    const [api, contextHolder] = notification.useNotification();
    // rolename to help find which role is being added
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (username !== '') {
            if (username === user.uid) {// if we are applying
                openNotificationApply();
            } else {
                openNotificationOwner();
            }
        } 
    }, [username]);

    const close = () => {
        setUsername("");
        setRole("");
        console.log(
            'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
    };

    // add a new role to the project and update the database
    // find a way to update user profile as wel
    const onFinishOwner = () => {
        // append the new role to the roles array
        for (let i = 0; i < props.roles.length; i++) {
            if (props.roles[i][0] == role) {
                props.roles[i][2].push(username);
                props.roles[i][3].splice(props.roles[i][3].indexOf(username), 1);
                break;
            }
        }
        axios.post('http://localhost:3000/update/attend', {
            uid: username,
            attend: props._id
        })
        .catch((error) => {
            console.error('Error occurred during the POST request:', error);
            onFinishFailed();
        });
        axios.post('http://localhost:3000/update/project', {
            id: props._id,
            pname: props.pname,
            preview: props.preview,
            detail: props.detail,
            owner: props.owner,
            location: props.location,
            roles: props.roles,
        })
        .then(() => {
            message.success('Submit success!');
        })
        .catch((error) => {
            console.error('Error occurred during the POST request:', error);
            onFinishFailed();
        });

        api.destroy();
        setUsername("");
    };

    const onFinishApply = () => {
        // append the new role to the roles array
        for (let i = 0; i < props.roles.length; i++) {
            if (props.roles[i][0] == role) {
                props.roles[i][3].push(username);
                break;
            }
        }
        axios.post('http://localhost:3000/update/project', {
            id: props._id,
            pname: props.pname,
            preview: props.preview,
            detail: props.detail,
            owner: props.owner,
            location: props.location,
            roles: props.roles,
        })
        .then(() => {
            message.success('Submit success!');
        })
        .catch((error) => {
            console.error('Error occurred during the POST request:', error);
            onFinishFailed();
        });

        api.destroy();
        setUsername("");
    };

    // open and close the notification for owner
    const openNotificationOwner = () => {
        const key = `open${Date.now()}`;
        const btn = (
        <Space>
            <Button type="link" size="small" onClick={() => {api.destroy(key);close()}}>
            Close
            </Button>
            <Button type="primary" size="small" onClick={onFinishOwner}>
            Confirm
            </Button>
        </Space>
        );
        api.open({
        message: 'Adding a new member?',
        description:
            'You are adding a new member to your project.',
        btn,
        key,
        duration: 0,
        });
    };

    const openNotificationApply = () => {
        const key = `open${Date.now()}`;
        const btn = (
        <Space>
            <Button type="link" size="small" onClick={() => {api.destroy(key);close()}}>
            Close
            </Button>
            <Button type="primary" size="small" onClick={onFinishApply}>
            Confirm
            </Button>
        </Space>
        );
        api.open({
        message: 'Applying to this role?',
        description:
            'You are applying to a new project!',
        btn,
        key,
        duration: 0,
        });
    };

    const { user, login } = useAuth();
    const data = props.roles ? props.roles.map((value) => {
        // fetch an array for all users who applied to this role
        return {
            role: value[0],
            accepted: value[2].map(value => value.split("$-$")[0]), // accepted id
            applied: value[3].map(value => value.split("$-$")[0]),  // applied id
            portion: value[2].length + "/" + value[1],
            full: value[2].length == value[1],
            options: {items: value[3].map((item) => {
                console.log(item);
                // separate item by "$-$"
                const temp = item.split("$-$");
                return {
                    label: temp[1],
                    key: temp[0] + " " + value[0],
                    icon: <UserOutlined />,
                }
            }), onClick: handleMenuClick,}
        }
    }) : [];
    return (
        <Table dataSource={data}>
            <Column title="Role" dataIndex="role" key="role" />
            <Column title="Accepted" dataIndex="portion" key="accepted" />
            <Column 
                title="Status" 
                key="status"
                render={(record) => (
                    <>  
                        {contextHolder}
                        {/* if the role is full */}
                        {record.full && !record.accepted.includes(user.uid) && <span>Full</span>}
                        {/* if the role is not full and user is owner */}
                        {!record.full && props.owner == user.uid && 
                        <>
                            <Dropdown menu={record.options}>
                            <Button>
                                <Space>
                                Pick an Applicant
                                <DownOutlined />
                                </Space>
                            </Button>
                            </Dropdown>
                        </>}
                        {/* if the role is not full and user applied */}
                        {!record.full && record.applied.includes(user.uid) && <span>Applied</span>}
                        {/* if the role is not full and user accepted */}
                        {record.accepted.includes(user.uid) && <span>Accepted</span>}
                        {/* if the role is not full and user is not applied yet */}
                        {!record.full && !record.applied.includes(user.uid) && !record.accepted.includes(user.uid) && props.owner != user.uid && 
                            <Button type="primary" onClick={() => {
                                setUsername(user.uid);
                                setRole(record.role);
                            }}>Apply</Button>
                        }
                    </>
                )}
            />
            {/* {props.owner == user.uid && 
            <Column 
                title="Members" 
                key="Members"
                render={(record) => (
                    console.log(record.members),
                    <>
                        <Dropdown menu={record.members}>
                        <Button>
                            <Space>
                            Accepted members
                            <DownOutlined />
                            </Space>
                        </Button>
                        </Dropdown>
                    </>
                )}
            />} */}
        </Table>
    )
}

export default ProjectPageBody;
