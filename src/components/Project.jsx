/* eslint-disable react/prop-types */
import { Card, Col } from "antd";

function Project(props) {
  // console.log(props.value);
  return (
    <Col span={8}>
    <Card title={props.pname} bordered={false}>
      {props.preview}
      </Card>
    </Col>

    // <div>
    //   {props.value}
    // </div>
  );
}

export default Project;