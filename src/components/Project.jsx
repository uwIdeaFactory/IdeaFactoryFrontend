/* eslint-disable react/prop-types */
import { Card, Col } from "antd";

function Project(props) {
  // console.log(props.value);
  return (
    <Col span={8}>
    <Card
    title={props.pname}
    extra={<a href={`/projects/${props.pid}`}>More</a>} // api needs later
    bordered={true}>
      {props.preview}
      </Card>
    </Col>

  );
}

export default Project;