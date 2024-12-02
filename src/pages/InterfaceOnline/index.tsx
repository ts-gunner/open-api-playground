import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { useParams, Link } from '@umijs/max'
import { Space } from 'antd'
import { queryInterfaceInfo } from '@/services/forty-controller/interfaceInfoController'

const GoBackComponent = ({ text, url }: { text: string, url: string }) => {
    return (
        <Link to={url}>{text}</Link>
    )
}

export default function InterfaceOnline() {
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
            extra={
                <Space>
                    <GoBackComponent text="返回接口详情" url={`/interface/detail/${params.interfaceId}`} />
                    <GoBackComponent text="返回查看接口文档" url="/interface/docs" />
                </Space>
            }
        >{interfaceData.name}</PageContainer>
    )
}
