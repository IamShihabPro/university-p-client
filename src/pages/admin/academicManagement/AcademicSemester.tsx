// import { useGetAllSemestersQuery } from "../../../redux/feature/academicSemester/academicSemesterApi";

import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/feature/admin/academicManagement.api";
import { useState } from "react";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam } from "../../../types";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export type TTableData = Pick<
  TAcademicSemester,
  'name' | 'year' | 'startMonth' | 'endMonth'
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Autumn',
        value: 'Autumn',
      },
      {
        text: 'Fall',
        value: 'Fall',
      },
      {
        text: 'Summer',
        value: 'Summer',
      },
    ],
  },
  {
    title: 'Year',
    key: 'year',
    dataIndex: 'year',
    filters: [
      {
        text: '2024',
        value: '2024',
      },
      {
        text: '2025',
        value: '2025',
      },
      {
        text: '2026',
        value: '2026',
      },
    ],
  },
  {
    title: 'Start Month',
    key: 'startMonth',
    dataIndex: 'startMonth',
  },
  {
    title: 'End Month',
    key: 'endMonth',
    dataIndex: 'endMonth',
  },
  {
    title: 'Action',
    key: 'x',
    render: () => {
      return (
        <div>
          <Button>Update</Button>
        </div>
      );
    },
  },
];


const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};



const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isLoading, isFetching, } = useGetAllSemestersQuery(params);

  console.log(semesterData);

  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  // 

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


  return (
    <div>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
        />
    </div>
  );
};

export default AcademicSemester;