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
  //   axios.get("https://api.ideafactoryuw.com/project/" + pid)
  //     .then(res => res.data)
  //     .then(res_ => {
  //       axios.get("https://api.ideafactoryuw.com/user/" + res_.owner)
  //         .then(res => res.data)
  //         .then(owner => {
  //           res_.owner_username = owner ? owner.username : 'anonymous user';

  //           const fetchApplicantsPromises = res_.roles.map(role => {
  //             const applicantsPromises = role[3].map(uid => {
  //               return axios.get("https://api.ideafactoryuw.com/user/" + uid)
  //                 .then(res => res.data)
  //                 .then(applicant => {
  //                   return applicant ? applicant.username : 'anonymous user';
  //                 });
  //             });

  //             return Promise.all(applicantsPromises);
  //           });

  //           Promise.all(fetchApplicantsPromises)
  //             .then(applicants => {
  //               res_.roles.forEach((role, index) => {
  //                 const combinedElements = role[3].map((uid, i) => {
  //                   return uid + "$-$" + applicants[index][i];
  //                 });

  //                 role[3] = combinedElements;
  //               });

  //               setProject(res_);
  //             });


  //         });
  //     });
  // }, []);

  useEffect(() => {
    axios.get("https://api.ideafactoryuw.com/project/" + pid)
      .then(res => res.data)
      .then(res_ => {
        axios.get("https://api.ideafactoryuw.com/user/" + res_.owner)
          .then(res => res.data)
          .then(owner => {
            res_.owner_username = owner ? owner.username : 'anonymous user';
  
            const fetchApplicantsPromises = res_.roles.map(role => {
              const applicantsPromises = role[3].map(uid => {
                return axios.get("https://api.ideafactoryuw.com/user/" + uid)
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
                const fetchRole2UsernamesPromises = res_.roles.map(role => {
                  const applicantsPromises = role[2].map(uid => {
                    return axios.get("https://api.ideafactoryuw.com/user/" + uid)
                      .then(res => res.data)
                      .then(applicant => {
                        return applicant ? applicant.username : 'anonymous user';
                      });
                  });
                  return Promise.all(applicantsPromises); // Returning Promise.all for each role[2]
                });
                
                Promise.all(fetchRole2UsernamesPromises)
                  .then(usernamesArray => {
                    res_.roles.forEach((role, index) => {
                      const usernames = usernamesArray[index]; // Fetching the usernames array for the corresponding role
                      const combinedElements = role[2].map((uid, i) => {
                        return uid + "$-$" + usernames[i];
                      });
                      console.log(combinedElements);
                      role[2] = combinedElements;
                    });
                    setProject(res_);
                  });
                
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