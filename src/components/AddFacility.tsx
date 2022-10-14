import { GraphQLResult } from '@aws-amplify/api';
import { Breadcrumb, Button, Card, DatePicker, Form, Input, Space } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AddFacilityInput } from '../API';
import { addFacility } from '../graphql/mutations';
import { getFacilityListPath, getUserlistPath } from './utils';

const AddFacility = ({ edit }: { edit?: boolean }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation()
  const facility = location.state?.facility;
  const org = location.state?.org;
  const formName = edit ? `Edit ${facility?.name}` : "Add a facility";

  let initialValues: any = {
    orgId: params.orgId
  };
  if (facility) {
    initialValues = { ...initialValues, ...facility };
    initialValues.dateOnboarded = moment(initialValues.dateOnboarded);
  };

  const onFinish = async (values: any) => {
    const input: AddFacilityInput = {
      facilityId: values.facilityId,
      orgId: params.orgId!,
      name: values.name,
      address: values.address,
      dateOnboarded: values.dateOnboarded.valueOf(),
    };

    const result = await API.graphql(graphqlOperation(addFacility, { input })) as GraphQLResult<any>;

    if (edit) {
      navigate(getFacilityListPath(params.orgId!), {
        state: {
          org: {
            name: org?.name
          },
          facility: {
            name: values?.name
          }
        }
      });
    } else {
      navigate(getUserlistPath(params.orgId!, result.data?.addFacility), {
        state: {
          org: {
            name: org?.name
          },
          facility: {
            name: values?.name
          }
        }
      });
    }
  }

  const handleCancel = () => {
    navigate(-1);
  }

  const navigationState = {
    org: {
      name: org?.name
    },
    facility: {
      name: facility?.name
    }
  }
  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: '64px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/">Orgs</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to={getFacilityListPath(params.orgId!)} state={navigationState}>{org?.name}</Link></Breadcrumb.Item>
        {edit && <Breadcrumb.Item>{facility?.name}</Breadcrumb.Item>}
        <Breadcrumb.Item>{edit ? 'Edit' : 'Add'}</Breadcrumb.Item>
      </Breadcrumb>
      <Card title={formName} bordered={false} style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
        <Form
          name="basic"
          style={{ width: '100%' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={initialValues}
        >
          <Form.Item
            label="Organization Id"
            name="orgId"
            rules={[{ required: true, message: 'Please enter the organization id' }]}
          >
            <Input placeholder='ORG#123456' disabled />
          </Form.Item>
          <Form.Item
            label="Facility Id"
            name="facilityId"
            rules={[{ required: true, message: 'Please enter the facility id' }, {
              validator: async (_, value) => {
                if (value && value.startsWith("FAC#")) {
                  return;
                } else {
                  throw new Error('Facility id not valid');
                }
              },
              message: "Please make sure the id is of the format FAC#12345",
            }]}
          >
            <Input placeholder='FAC#123456' disabled={edit} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the org name' }]}
          >
            <Input placeholder='Cascadia' />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
          >
            <Input placeholder='123 Main st, Phoenix, AZ 12345' />
          </Form.Item>
          <Form.Item
            label="Date Activated"
            name="dateOnboarded"
            rules={[{ required: true, message: 'Please input date the facility was activated.' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {edit ? 'Update' : "Add"}
            </Button>
            <Space />
            <Button onClick={handleCancel} type="ghost" htmlType="button" style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Content>
  );
};

export default AddFacility;