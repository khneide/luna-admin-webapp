import { GraphQLResult } from '@aws-amplify/api';
import { Breadcrumb, Button, Card, Form, Input, Select, Space } from 'antd';
import MaskedInput from 'antd-mask-input';
import { Content } from 'antd/lib/layout/layout';
import { API, graphqlOperation } from 'aws-amplify';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UpdateUserInput } from '../API';
import { updateUser } from '../graphql/mutations';
import { getFacilityListPath, getUserlistPath, SUBSCRIPTION_TYPES } from './utils';
const { Option } = Select;

const EditUser = () => {
  const params = useParams();
  const navigate = useNavigate()
  const location = useLocation()
  const user = location.state?.user;
  const org = location.state?.org;
  const facility = location.state?.facility;

  let initialValues: any = {
    lunaId: user?.lunaId,
    pccId: user?.pccId,
    facilityId: params.facilityId,
  };

  const navigationState = {
    org: {
      name: org?.name
    },
    facility: {
      name: facility?.name
    }
  };

  if (user) {
    initialValues = {
      ...initialValues,
      fullName: user?.fullName,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      subscriptionStatus: user?.subscriptionStatus,
    };
  };

  const onFinish = async (values: any) => {
    const input: UpdateUserInput = {
      pccId: values.pccId,
      lunaId: values.lunaId,
      facilityId: params.facilityId!,
      fullName: values.fullName,
      email: values.email,
      subscriptionStatus: values.subscriptionStatus,
      phone: values.phone,
      address: values.address,
    };

    await API.graphql(graphqlOperation(updateUser, { input })) as GraphQLResult<any>;

    navigate(getUserlistPath(params.orgId!, params.facilityId!), { state: navigationState });
  }

  const handleCancel = () => {
    navigate(-1);
  }


  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: '64px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/">Orgs</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to={getFacilityListPath(params.orgId!)} state={navigationState}>{org?.name}</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to={getUserlistPath(params.orgId!, params.facilityId!)} state={navigationState}>{facility?.name}</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{user?.fullName}</Breadcrumb.Item>
        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="Update user" bordered={false} style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
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
            label="Facility Id"
            name="facilityId"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Luna Id"
            name="lunaId"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="PCC Id"
            name="pccId"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input the full name of the user' }]}
          >
            <Input placeholder='Joe Smith' />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input a valid email for the user' }, { type: 'email' }]}
          >
            <Input placeholder='luna@lilia.health' />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{
              validator: async (_, value) => {
                if (!value) {
                  return;
                } else if (value && /^\+?\d[\d\s-]+$/.test(value)) {
                  return;
                } else {
                  throw new Error('Phone number is not valid');
                }
              },
              message: "Please enter a valid phone number",
            }]}
          >
            <MaskedInput name="phone" mask="000 000-0000" placeholder='555 555-5555' />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
          >
            <Input placeholder='123 Main st, Phoenix, AZ 12345' />
          </Form.Item>
          <Form.Item
            label="Subscription Type"
            name="subscriptionStatus"
            rules={[{ required: true, message: 'Please enter the type of subscription this user has' }]}
          >
            <Select style={{ width: 120 }}>
              {Object.values(SUBSCRIPTION_TYPES).map((type, i) => <Option value={type} key={i}>{type}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Update
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

export default EditUser;
