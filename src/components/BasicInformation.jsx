import { Card, Col, Row } from 'antd';
import React from "react";
// import PropTypes from "prop-types";

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
              <a href={props.resume}>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512" width="24" height="24">
                  <path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/>
                  <path d="M256 56v120a32 32 0 0032 32h120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                </svg>
              </a>
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

// BasicInformation.propTypes = {
//   username: PropTypes.string.isRequired,
//   contact: PropTypes.arrayOf(PropTypes.string),
//   location: PropTypes.string.isRequired,
//   resume: PropTypes.string,
//   bio: PropTypes.string.isRequired,
// };

export default BasicInformation;