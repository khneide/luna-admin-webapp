import { GraphQLResult } from '@aws-amplify/api';
import { Breadcrumb, Button, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ColumnsType } from 'antd/lib/table';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetFacilitiesForOrgQuery } from '../API';
import { getFacilitiesForOrg } from '../graphql/queries';
import { getFacilityAddPath, getFacilityEditPath, getUserlistPath } from './utils';

interface DataType {
  facilityId?: string;
  key: number;
  name?: string;
  address?: string | null;
  onboardedDate: string;
}

const FacilityList = () => {
  const [facilities, setFacilities] = useState<GetFacilitiesForOrgQuery | undefined>();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation()
  const org = location.state?.org;

  useEffect(() => {
    const getFacilities = async () => {
      const result = await API.graphql(graphqlOperation(getFacilitiesForOrg, { orgId: params.orgId! })) as GraphQLResult<GetFacilitiesForOrgQuery>;
      setFacilities(result.data);
    }

    getFacilities();
  }, [params.orgId]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, facility) => <Link to={getUserlistPath(params.orgId!, facility.facilityId!)} state={{
        facility: {
          name: facility?.name,
        },
        org: {
          name: org?.name,
        }
      }}>{text}</Link>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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

  if (facilities) {
    const rows = facilities.getFacilitiesForOrg?.map((facility, i) => {
      return {
        key: i,
        name: facility?.name,
        address: facility?.address,
        facilityId: facility?.facilityId,
        onboardedDate: moment(facility?.dateOnboarded).format('yyyy-MM-DD'),
        edit: <Link to={getFacilityEditPath(params.orgId!, facility?.facilityId!)} state={{
          facility: {
            facilityId: facility?.facilityId,
            name: facility?.name,
            dateOnboarded: facility?.dateOnboarded,
            address: facility?.address,
          },
          org: {
            name: org?.name
          }
        }}>Edit</Link>
      };
    });

    if (rows) data = rows;
  }

  const handleAdd = () => {
    navigate(getFacilityAddPath(params.orgId!), {
      state: {
        org: {
          name: org?.name
        }
      }
    });
  }

  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: '64px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/">Orgs</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{org?.name}</Breadcrumb.Item>
        <Breadcrumb.Item>Facilities</Breadcrumb.Item>
      </Breadcrumb>
      <Button onClick={handleAdd} type='primary' style={{ float: 'right', marginBottom: '10px' }}>Add</Button>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </Content>
  );
};

export default FacilityList;