import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import axios from 'axios';

const ProjectRow = (props) => {

  useEffect(() => {
    if (props.pid.length === 0) return;
    fetchProjects();
  }, []);

  const [project, setProject] = useState([]);
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:3000/projects/")
      // filter res.data so that it only contains the project with pid
      for (let i = 0; i < res.data.length; i++) {
        if (!props.pid.includes(res.data[i]._id)) {
          res.data.splice(i, 1);
          i--;
        }
      }
      setProject(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  const projectCards = project.map((projectItem) => (
    <Col span={8} key={projectItem.pname}>
      <Card 
        title={projectItem.pname} 
        bordered={false}
        extra={<a href={`/projects/${projectItem._id}`}>More</a>}>
        {projectItem.preview}
      </Card>
    </Col>
  ));

  return (
    <Row gutter={16}>
      {projectCards}
    </Row>
  );
};

export default ProjectRow;
