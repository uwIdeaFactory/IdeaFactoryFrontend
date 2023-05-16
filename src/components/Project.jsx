/* eslint-disable react/prop-types */
import { Button, Card, Col } from "antd";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Project(props) {
  const { user, login } = useAuth()

  return (
    <Col span={8}>
      <Card
        title={props.pname}
        extra={
          user ? (
            <NavLink to={`/projects/${props.pid}`}>
              <Button>More</Button>
            </NavLink>
          ) : (
            <Button onClick={() => alert("Please login first!")}> More </Button>
          )
        }
        bordered={true}
      >
        {props.preview}
      </Card>
    </Col>


  );
}

export default Project;