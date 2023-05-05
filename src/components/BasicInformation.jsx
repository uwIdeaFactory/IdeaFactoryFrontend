import React from "react";
import { Card, Col, Row } from 'antd';
import ProjectRow from "./ProjectRow";

function BasicInformation (props) {
  console.log(props);
  console.log(props.children.username);
  return (
    <Card title="Basic Information">
      <Row span={20}>
      <Col span={5}>
        <Card title="Username">{props.username}</Card>
      </Col>
      <Col span={15}>
        <Card title="a">a</Card>
      </Col>
      </Row>
    </Card>
  )
}
 
export default BasicInformation;