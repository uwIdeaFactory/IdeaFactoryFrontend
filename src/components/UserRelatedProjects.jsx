import React, { useEffect } from "react";
import { Card } from 'antd';
import ProjectRow from "./ProjectRow";

const UserRelatedProjects = (props) => {
  // useEffect(() => {

  // });
  return (
    <Card title="Projects in IdeaFactory">
    <Card type="inner" title="Hosted Project">
        {props.user.host && <ProjectRow 
          pid={props.user.host}/>}
    </Card>
    <Card
      style={{
          marginTop: 16,
      }}
          type="inner"
          title="Attended Projects"
      >
      {props.user.host && <ProjectRow
        pid={props.user.attend ? props.user.attend : []}/>}
    </Card>
</Card>
  )
}

export default UserRelatedProjects;