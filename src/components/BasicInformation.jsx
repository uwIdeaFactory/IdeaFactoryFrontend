import React from "react";
import { Card, Col, Row } from 'antd';

function BasicInformation (props) {
  return (
    <Card title="Basic Information" extra={<a href="/userProfileUpdate">Update</a>}>
      <Row span={20}>
        <Col span={6}>
          <Card title="Username">{props.username}</Card>
        </Col>
        <Col span={6}>
          <Card title="Contact">{props.contact}</Card>
        </Col>
        <Col span={6}>
          <Card title="Location">{props.location}</Card>
        </Col>
        <Col span={6}>
        <Card title="Resume">{props.resume}</Card>
        </Col>
      </Row>
      <Row span={20}>
        <Col span={24}>
          <Card title="Summary">{props.bio}</Card>
        </Col>
      </Row>
    </Card>
  )
}

export default BasicInformation;