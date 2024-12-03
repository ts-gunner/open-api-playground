import React from 'react'
import { Typography } from 'antd'
import { ProCard } from '@ant-design/pro-components'
import ReactJson from 'react-json-view';
export default function ResponseComponent({ bodyResult }: { bodyResult: any }) {
    return (
        <div style={{
            marginTop: "20px"
        }}>
            <ProCard title="Body">
                <Typography.Paragraph>
                    <ReactJson
                        name={false}
                        src={bodyResult} />
                </Typography.Paragraph>
            </ProCard>

        </div>
    )
}
