import React, { useEffect, useRef, useState } from 'react'
import type { ProDescriptionsActionType } from "@ant-design/pro-components"
import { PageContainer, ProDescriptions, ProCard, ProFormText, ProForm, ModalForm } from '@ant-design/pro-components'
import { useModel } from '@umijs/max';
import { Button, message, Typography } from 'antd';
import {
    UndoOutlined
} from '@ant-design/icons';
import { createUserSecret } from '@/services/forty-controller/userController';

const createTips = `
已成功创建新的secretKey, 请妥善管理，当关闭窗口后，不再显示secretKey, 只能重新创建

`

export default function UserCenter() {
    const actionRef = useRef<ProDescriptionsActionType>()
    const { initialState, refresh } = useModel('@@initialState');
    const [createKeyOpen, handleCreateKeyOpen] = useState<boolean>(false);
    const [secretKey, setSecretKey] = useState<string>("")
    const createKey = async () => {
        // 1. 调用set secret key的api
        const response = await createUserSecret();
        if (response.code === 200) {
            setSecretKey(response.data || "")
            // 2. 打开modal，
            handleCreateKeyOpen(true)
        } else {
            message.error(response.msg)
        }

    }
    return (
        <PageContainer>
            <ProCard
                title="用户基本信息"
                bordered
                boxShadow
            >
                <ProDescriptions
                    column={2}
                    actionRef={actionRef}
                    request={async () => {
                        return Promise.resolve({
                            success: true,
                            data: initialState?.loginUser
                        })
                    }}
                >
                    <ProDescriptions.Item valueType="option">
                        <UndoOutlined onClick={() => {
                            refresh()
                            actionRef.current?.reload()
                        }} />
                    </ProDescriptions.Item>
                    <ProDescriptions.Item dataIndex="userAccount" label="用户账号"></ProDescriptions.Item>
                    <ProDescriptions.Item dataIndex="secretId" label="密钥ID" copyable></ProDescriptions.Item>
                    <ProDescriptions.Item dataIndex="userProfile" label="用户介绍" copyable></ProDescriptions.Item>
                    <ProDescriptions.Item dataIndex="createTime" label="创建时间"></ProDescriptions.Item>
                    <ProDescriptions.Item dataIndex="updateTime" label="更新时间"></ProDescriptions.Item>
                </ProDescriptions>
            </ProCard>

            <ProCard
                title="密钥管理"
                tooltip="创建密钥后，需要自己保管密钥，不能查看密钥，只能重新生成新的密钥"
                bordered
                boxShadow
                style={{
                    marginTop: "20px"
                }}
            >
                <ProForm
                    initialValues={{
                        secretId: initialState?.loginUser?.secretId,
                        secretKey: secretKey
                    }}
                    submitter={{
                        resetButtonProps: {
                            style: {
                                display: "none"
                            }
                        },
                        submitButtonProps: {
                            style: {
                                display: "none"
                            }
                        }
                    }}
                >

                    <ProFormText label="密钥ID" name="secretId" disabled width={500} />
                    <ProFormText label="密钥Key" name="secretKey" disabled width={500} />
                    <Button onClick={createKey}>创建密钥Key</Button>
                </ProForm>
            </ProCard>

            <ModalForm
                open={createKeyOpen}
                submitter={{
                    submitButtonProps: {
                        style: {
                            display: "none"
                        }
                    },
                    resetButtonProps: {
                        style: {
                            display: "none"
                        }
                    }
                }}
                onOpenChange={(open) => {
                    if (!open) {
                        handleCreateKeyOpen(false)
                        setSecretKey("********************************")
                    } else {
                        handleCreateKeyOpen(true)
                    }

                }}
                width="80%"
            >
                <ProCard
                    title="重要提示！！"
                    bordered
                    boxShadow
                    style={{
                        marginTop: "30px"
                    }}
                    bodyStyle={{
                        backgroundColor: "yellow"
                    }}
                >
                    <Typography>
                        {createTips}
                    </Typography>
                </ProCard>
                <div style={{ marginTop: "20px" }}>
                    <Typography.Text>密钥Key: &nbsp;&nbsp;&nbsp;</Typography.Text>
                    <Typography.Text copyable >{secretKey}</Typography.Text>
                </div>

            </ModalForm>
        </PageContainer>
    )
}
