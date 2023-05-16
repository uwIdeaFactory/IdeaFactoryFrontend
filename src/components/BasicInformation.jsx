import React from "react";
import { Card, Col, Row, Button } from 'antd';

function BasicInformation(props) {
  return (
    <Card title="Basic Information" extra={<a href="/userProfileUpdate">Update</a>}>
      <Row span={20}>
        <Col span={6}>
          <Card title="Username">{props.username}</Card>
        </Col>
        <Col span={6}>
          <Card title="Email">{props.contact ? props.contact[0] : ""}</Card>
        </Col>
        <Col span={6}>
          <Card title="Phone">{props.contact ? props.contact[1] : ""}</Card>
        </Col>
        <Col span={6}>
          <Card title="Website"><a href={props.contact ? props.contact[2] : ""}>{props.contact ? props.contact[2] : ""}</a></Card>
        </Col>
        <Col span={6}>
          <Card title="Location">{props.location}</Card>
        </Col>
        <Col span={6}>
          <Card title="Resume">
            {!props.resume || props.resume === "" ? (
              <p>You have not uploaded your resume.</p>
            ) : (
              <a href={props.resume}>Resume</a>
            )}
          </Card>
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