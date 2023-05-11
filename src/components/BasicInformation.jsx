import React from "react";
import { Card, Col, Row } from 'antd';

function BasicInformation (props) {
  return (
    <Card title="Basic Information" extra={<a href="/userProfileUpdate">Update</a>}>
      <Row span={20}>
      <Col span={5}>
        <Card title="Username">{props.username}</Card>
      </Col>
      <Col span={15}>
        <Card title="Summary">{props.bio}</Card>
      </Col>
      </Row>
    </Card>
  )
}

export default BasicInformation;