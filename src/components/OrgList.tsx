import { GraphQLResult } from '@aws-amplify/api';
import { Breadcrumb, Button, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ColumnsType } from 'antd/lib/table';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetOrgsQuery } from '../API';
import { getOrgs } from '../graphql/queries';
import { getFacilityListPath, getOrgEditPath } from './utils';

interface DataType {
  orgId?: string;
  key: number;
  name?: string;
  onboardedDate?: string;
}

const OrgList = () => {
  const [orgs, setOrgs] = useState<GetOrgsQuery | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrgData = async () => {
      const result = await API.graphql(graphqlOperation(getOrgs)) as GraphQLResult<GetOrgsQuery>;
      setOrgs(result.data);
    }

    getOrgData();
  }, []);

  const handleAdd = () => {
    navigate('/org/add');
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, org) => <Link to={getFacilityListPath(org.orgId!)} state={{
        org: {
          name: org?.name
        }
      }}>{text}</Link>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Date Onboarded',
      dataIndex: 'onboardedDate',
      key: 'onboardedDate',
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit'
    }
  ];

  let data: DataType[] = [];

  if (orgs) {
    const rows = orgs.getOrgs?.map((org, i) => {
      return {
        key: i,
        name: org?.name,
        orgId: org?.orgId,
        address: org?.address,
        onboardedDate: moment(org?.dateOnboarded!).format('yyyy-MM-DD'),
        edit: <Link to={getOrgEditPath(org?.orgId!)} state={{
          org: {
            orgId: org?.orgId,
            name: org?.name,
            dateOnboarded: org?.dateOnboarded!,
            address: org?.address,
          }
        }}>Edit</Link>
      };
    });

    if (rows) data = rows;
  }

  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: '64px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Orgs</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <Button onClick={handleAdd} type='primary' style={{ float: 'right', marginBottom: '10px' }}>Add</Button>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </Content>
  );
};

export default OrgList;