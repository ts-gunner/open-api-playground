import React, { useEffect, useState } from 'react'
import { PageContainer, ProCard, ProDescriptions, ProTable } from '@ant-design/pro-components'
import type {ProColumns} from "@ant-design/pro-components"
import { useParams, Link } from '@umijs/max'
import { Tag, Typography, theme,Space } from 'antd';
import { queryInterfaceInfo } from '@/services/forty-controller/interfaceInfoController'

const columns:ProColumns<{
    title: string,
    value: string,
    type: string,
}>[] = [
    {
        title: 'KEY',
        dataIndex: 'key',
        width: 120,
        align: "center",
        render: (text: any) => {
            return <Typography.Paragraph ellipsis={{
                expandable: true
            }}>{text}</Typography.Paragraph>
        }
    },
    {
        title: 'VALUE',
        dataIndex: 'value',
        width: 120,
        align: "center",
        render: (text: any) => {
            return <Typography.Paragraph ellipsis={{
                expandable: true
            }}>{text}</Typography.Paragraph>
        }
    },
    {
        title: 'TYPE',
        dataIndex: 'type',
        width: 120,
        align: "center",
        render: (text: any) => {
            return <Typography.Paragraph ellipsis={{
                expandable: true
            }}>{text}</Typography.Paragraph>
        }
    },
]

const DescriptionTitle = ({ text }: { text: string }) => {
    const { useToken } = theme;
    const { token } = useToken()
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div style={{
                    width: "4px",
                    height: "20px",
                    backgroundColor: token.colorPrimary,
                    borderRadius: "20px"
                }}></div>
            </div>
            <div>
                <Typography>{text}</Typography>
            </div>
        </div>
    )
}

const GoBackComponent = ({ text, url }: { text: string, url: string }) => {
    return (
        <Link to={url}>{text}</Link>
    )
}
export default function index() {

    const params = useParams()

    const [interfaceData, setInterfaceData] = useState<API.InterfaceInfoVO>({});

    const getInterfaceData = async () => {
        const response = await queryInterfaceInfo({
            interfaceId: Number.parseInt(params.interfaceId || "-1")
        })
        if (response.code === 200) {
            setInterfaceData(response.data?.records?.length == 1 ? response.data.records[0] : {})
        }

    }
    useEffect(() => {
        getInterfaceData()
    }, [])
    return (
        <PageContainer
            extra={<Space >
                <GoBackComponent text="在线调试" url={`/interface/online/${params.interfaceId}`} />
                <GoBackComponent text="返回查看接口文档" url="/interface/docs" />
            </Space>}
        >
            <ProCard
                title={<DescriptionTitle text="基本接口信息" />}
                bordered
                boxShadow
            >
                <ProDescriptions dataSource={interfaceData} column={1}>
                <ProDescriptions.Item dataIndex="id" label="接口ID"></ProDescriptions.Item>
                    <ProDescriptions.Item dataIndex="method" label="请求方式"
                        render={(text) => {
                            return <Tag color={text === "GET" ? "#34c46d" : "#f47023"}>{text}</Tag>
                        }}></ProDescriptions.Item>
                    <ProDescriptions.Item dataIndex="name" label="接口名称"></ProDescriptions.Item>
                    <ProDescriptions.Item dataIndex="description" label="接口描述"></ProDescriptions.Item>
                </ProDescriptions>
            </ProCard>
            {JSON.parse(interfaceData.requestHeader || "[]").length > 0 && (
                <ProCard
                    title={<DescriptionTitle text="请求头" />}
                    bordered
                    boxShadow
                    style={{
                        marginTop: "20px"
                    }}
                >
                    <ProTable
                        dataSource={JSON.parse(interfaceData.requestHeader || "[]")}
                        search={false}
                        options={false}
                        pagination={false}
                        columns={columns}
                    ></ProTable>
                </ProCard>
            )}
            {JSON.parse(interfaceData.requestBody || "[]").length > 0 && (
                <ProCard
                    title={<DescriptionTitle text="请求参数" />}
                    bordered
                    boxShadow
                    style={{
                        marginTop: "20px"
                    }}
                >
                    <ProTable
                        dataSource={JSON.parse(interfaceData.requestBody || "[]")}
                        search={false}
                        options={false}
                        pagination={false}
                        columns={columns}
                    ></ProTable>
                </ProCard>
            )}
            {
                JSON.parse(interfaceData.responseHeader || "[]").length > 0 && (
                    <ProCard
                        title={<DescriptionTitle text="响应头" />}
                        bordered
                        boxShadow
                        style={{
                            marginTop: "20px"
                        }}
                    >
                        <ProTable
                            dataSource={JSON.parse(interfaceData.responseHeader || "[]")}
                            search={false}
                            options={false}
                            columns={columns}
                            pagination={false}
                        ></ProTable>
                    </ProCard>
                )
            }
            {
                JSON.parse(interfaceData.responseBody || "[]").length > 0 && (
                    <ProCard
                        title={<DescriptionTitle text="响应数据" />}
                        bordered
                        boxShadow
                        style={{
                            marginTop: "20px"
                        }}
                    >
                        <ProTable
                            dataSource={JSON.parse(interfaceData.responseBody || "[]")}
                            search={false}
                            options={false}
                            columns={columns}
                            pagination={false}
                        ></ProTable>
                    </ProCard>
                )
            }


        </PageContainer>
    )
}
