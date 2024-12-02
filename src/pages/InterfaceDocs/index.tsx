import React from 'react'
import { PageContainer, ProList } from '@ant-design/pro-components'
import { Input, Space, Tag } from 'antd';
import { queryInterfaceInfo } from '@/services/forty-controller/interfaceInfoController';
import { Link } from 'umi';


const { Search } = Input
export default function InterfaceDocs() {
  return (
    <PageContainer>
      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Search enterButton loading={false} style={{
          width: "50%",
          textAlign: "center"
        }} placeholder='找不到API？来搜索下吧'></Search>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
      <ProList<API.InterfaceInfoVO>
        style={{
          width: "90%",
          marginTop: "30px"
        }}
        bordered
        headerTitle="接口列表"
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
        }}
        request={async (params) => {
          const response = await queryInterfaceInfo({
            currentPage: params.current,
            pageSize: params.pageSize,
            status: true
          })
          return {
            success: true,
            data: response.data?.records,
            total: response.data?.total
          }
        }}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: 'description',
          },
          subTitle: {
            render: (_, record) => {
              return (
                <Space size={0}>
                  <Tag color="blue">{record.url}</Tag>
                  <Tag color={record.method?.toLocaleUpperCase() === "GET" ? "#34c46d": "#f47023"}>{record.method}</Tag>
                </Space>
              );
            },
          },
          actions: {
            render: (text, row, index, action) => [
              (<Link
                to={`/interface/detail/${row.id}`}
              >
                查看详情
              </Link>),
            ],
          },
        }}
      >

      </ProList>
      </div>
     
    </PageContainer>
  )
}
