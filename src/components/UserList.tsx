import { GraphQLResult } from '@aws-amplify/api';
import { Breadcrumb, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ColumnsType } from 'antd/lib/table';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { GetOrgUsersForFacilityQuery } from '../API';
import { getOrgUsersForFacility } from '../graphql/queries';
import { getFacilityListPath, getUserEditPath } from './utils';

interface DataType {
  key: number;
  name?: string;
  email?: string;
  lunaId?: string;
  pccId?: string;
  address?: string | null;
  phone?: string | null;
  onboardedDate: string;
}

const UserList = () => {
  const [users, setUsers] = useState<GetOrgUsersForFacilityQuery | undefined>();
  const params = useParams();
  const location = useLocation()
  const facility = location.state?.facility;
  const org = location.state?.org;

  useEffect(() => {
    const getUserData = async () => {
      const result = await API.graphql(graphqlOperation(getOrgUsersForFacility, { facilityId: params.facilityId })) as GraphQLResult<GetOrgUsersForFacilityQuery>;
      setUsers(result.data);
    }

    getUserData();
  }, [params.facilityId]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "Email",
      dataIndex: 'email',
      key: 'email',
      render: value => <a href={`mailto:${value}`} target='_blank' rel="noreferrer">{value}</a>,
    },
    {
      title: "Luna Id",
      dataIndex: 'lunaId',
      key: 'lunaId',
    },
    {
      title: "PCC Id",
      dataIndex: 'pccId',
      key: 'pccId',
    },
    {
      title: "Address",
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: "Phone",
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Subscription',
      dataIndex: 'subscriptionStatus',
      key: 'subscriptionStatus',
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

  if (users) {
    const rows = users.getOrgUsersForFacility?.map((user, i) => {
      return {
        key: i,
        name: user?.fullName,
        email: user?.email,
        lunaId: user?.lunaId,
        pccId: user?.pccId,
        address: user?.address,
        phone: user?.phone,
        onboardedDate: moment(user?.dateOnboarded).format('yyyy-MM-DD'),
        subscriptionStatus: user?.subscriptionStatus,
        edit: <Link to={getUserEditPath(params.orgId!, params.facilityId!)} state={{
          user: {
            fullName: user?.fullName,
            email: user?.email,
            lunaId: user?.lunaId,
            pccId: user?.pccId,
            address: user?.address,
            phone: user?.phone,
            onboardedDate: user?.dateOnboarded,
            subscriptionStatus: user?.subscriptionStatus
          },
          org: {
            name: org?.name
          },
          facility: {
            name: facility?.name
          }
        }}>Edit</Link>
      };
    });

    if (rows) data = rows;
  }

  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: '64px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/">Orgs</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to={getFacilityListPath(params.orgId!)} state={{
          org: {
            name: org?.name
          }
        }}>{org?.name}</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{facility?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </Content>
  );
};

export default UserList;