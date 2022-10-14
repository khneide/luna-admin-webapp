import { GraphQLResult } from '@aws-amplify/api';
import { Breadcrumb, Button, Card, DatePicker, Form, Input, Space } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AddOrgInput } from '../API';
import { addOrg } from '../graphql/mutations';
import { getFacilityListPath } from './utils';

const AddOrg = ({ edit }: { edit?: boolean }) => {
  const location = useLocation()
  const org = location.state?.org;
  const navigate = useNavigate();
  const formName = edit ? `Edit ${org?.name}` : "Add an org";
  let initialValues: any = {};
  if (org) {
    initialValues = org;
    initialValues.dateOnboarded = moment(initialValues.dateOnboarded);
  };

  const onFinish = async (values: any) => {
    console.log('Values', values);
    const input: AddOrgInput = {
      orgId: values.orgId,
      name: values.name,
      address: values.address,
      dateOnboarded: values.dateOnboarded.valueOf(),
    };

    const result = await API.graphql(graphqlOperation(addOrg, { input })) as GraphQLResult<any>;
    if (edit) {
      navigate('/');
    } else {
      navigate(getFacilityListPath(result.data?.addOrg), {
        state: {
          org: { name: values.name }
        }
      });
    }
  }

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: '64px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/">Orgs</Link></Breadcrumb.Item>
        {edit && <Breadcrumb.Item>{org?.orgId}</Breadcrumb.Item>}
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
            rules={[{ required: true, message: 'Please enter the organization id' }, {
              validator: async (_, value) => {
                if (value && value.startsWith("ORG#")) {
                  return;
                } else {
                  throw new Error('Org id not valid');
                }
              },
              message: "Please make sure the id is of the format ORG#12345",
            }]}
          >
            <Input placeholder='ORG#123456' disabled={edit} />
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
            rules={[{ required: true, message: 'Please input date the organization was activated.' }]}
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

export default AddOrg;