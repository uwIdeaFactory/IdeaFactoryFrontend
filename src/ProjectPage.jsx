import { Breadcrumb, Layout, theme, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { NavLink, useParams } from 'react-router-dom'
import ProjectPageBody from './components/ProjectPageBody';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
const { Content, Footer } = Layout;

const ProjectPage = () => {
  const { pid } = useParams();
  const [project, setProject] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:3000/project/" + pid)
  //     .then(res => res.data)
  //     .then(res_ => {
  //             axios.get("http://localhost:3000/user/" + res_.owner)
  //               .then(res => res.data)
  //               // fetch applicants username by their uid, it is in the roles array, in every role, the third array is the applicants uid

  //               .then((res) => { res_.owner_username = res ? res.username : 'anonymous user'; return res_; })
  //               .then(setProject);
  //             });
  // }, []);
  useEffect(() => {
    axios.get("http://localhost:3000/project/" + pid)
      .then(res => res.data)
      .then(res_ => {
        axios.get("http://localhost:3000/user/" + res_.owner)
          .then(res => res.data)
          .then(owner => {
            res_.owner_username = owner ? owner.username : 'anonymous user';

            const fetchApplicantsPromises = res_.roles.map(role => {
              const applicantsPromises = role[3].map(uid => {
                return axios.get("http://localhost:3000/user/" + uid)
                  .then(res => res.data)
                  .then(applicant => {
                    return applicant ? applicant.username : 'anonymous user';
                  });
              });

              return Promise.all(applicantsPromises);
            });

            Promise.all(fetchApplicantsPromises)
              .then(applicants => {
                res_.roles.forEach((role, index) => {
                  const combinedElements = role[3].map((uid, i) => {
                    return uid + "$-$" + applicants[index][i];
                  });

                  role[3] = combinedElements;
                });

                setProject(res_);
              });
          });
      });
  }, []);


  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Navigation />
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>{project.pname}</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <NavLink to={"/projectUpload"}>
            <Button type="primary" icon={<UploadOutlined />} size={20}>
              Upload
            </Button>
          </NavLink>
          {
            project.owner_username && <ProjectPageBody {...project} />
          }
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default ProjectPage;