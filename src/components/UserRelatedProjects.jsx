import React from "react";
import { Card } from 'antd';
import ProjectRow from "./ProjectRow";

const UserRelatedProjects = () => {

  return (
    <Card title="Related Projects">
    <Card type="inner" title="Project Established" extra={<a href="#">More</a>}>
        <ProjectRow></ProjectRow>
    </Card>
    <Card
    style={{
        marginTop: 16,
    }}
        type="inner"
        title="Project Involved"
        extra={<a href="#">More</a>}
    >
    <ProjectRow></ProjectRow>
    </Card>
</Card>
  )
}

export default UserRelatedProjects;