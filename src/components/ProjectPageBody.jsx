/* eslint-disable react/prop-types */
import { Descriptions, Table, Divider, Tag } from "antd";
import { useAuth } from '../AuthContext';
import { Button, notification, Space } from 'antd';
const { Column } = Table;

function ProjectPageBody(props) {
    return (
        <div className="projectPageBody">
            <h1>{props.pname}</h1>
            <Tag>{props.tag}</Tag>

            <Divider></Divider>

            <Descriptions bordered>
            <Descriptions.Item label="Owner">{props.owner}</Descriptions.Item>
            <Descriptions.Item label="Contact">{props.contact}</Descriptions.Item>
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

function RoleTable(props) {
    const { user, login } = useAuth();
    const data = props.roles ? props.roles.map((value) => {
        return {
            role: value[0],
            accepted: value[2],
            applied: value[3], 
            portion: value[2].length + "/" + value[1],
            full: value[2].length == value[1],
            options: value[3].map((item) => {
                return <option value={item}>{item}</option>
            })
        }
    }) : [];
    return (
        <Table dataSource={data}>
            <Column title="Role" dataIndex="role" key="role" />
            <Column title="Accepted" dataIndex="portion" key="accepted" />
            {props.owner == user.uid && // if the user is the owner of the project
                <Column 
                    title="Status" 
                    key="status"
                    render={(record) => (
                        <>
                            {/* if the role is full */}
                            {record.full && <span>Full</span>}
                            {/* if the role is not full and user is owner */}
                            {!record.full && props.owner == user.uid && 
                                <>
                                    <select onChange={(event) => alert(event.target.value)}>
                                    {record.options}
                                    </select>
                                </>}
                            {/* if the role is not full and user applied */}
                            {!record.full && record.applied.includes(user.uid) && <span>Applied</span>}
                            {/* if the role is not full and user accepted */}
                            {!record.full && record.accepted.includes(user.uid) && <span>Accepted</span>}
                        </>
                    )}
                />
            }
        </Table>
    )
}

export default ProjectPageBody;
