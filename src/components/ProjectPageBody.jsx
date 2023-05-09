/* eslint-disable react/prop-types */
import { Descriptions, Table, Divider, Tag } from "antd";
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
    const data = []
    props.roles && props.roles.map((value) => {
        data.push({
            role: value[0],
            capacity: value[1],
            accepted: value[2],
        })
    })
    return (
        <Table dataSource={data}>
            <Column title="Role" dataIndex="role" key="role" />
            <Column title="Capacity" dataIndex="capacity" key="capacity" />
            <Column title="Accepted" dataIndex="accepted" key="accepted" />
        </Table>
    )
}

export default ProjectPageBody;
