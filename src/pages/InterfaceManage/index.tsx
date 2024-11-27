import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormTextArea,
    ProTable,
    ProFormSelect,
    ProForm
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message, Tag, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import { addInterfaceInfo, deleteInterface, queryInterfaceInfo, updateInterfaceInfo } from '@/services/forty-controller/interfaceInfoController';


const requireRules = [
    {
        required: true,
        message: '接口名称为必填项',
    },
]


const InterfaceManage: React.FC = () => {
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.InterfaceInfoVO>();
    const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfoVO[]>([]);

    const columns: ProColumns<API.InterfaceInfoVO>[] = [
        {
            title: 'id',
            dataIndex: 'id',
            hideInSearch: true,
            hideInTable: true,
            hideInDescriptions: true,
        },

        {
            title: '接口名称',
            dataIndex: 'name',
            align: "center",
            render: (dom, entity) => {
                return (
                    <a
                        onClick={() => {
                            setCurrentRow(entity);
                            setShowDetail(true);
                        }}
                    >
                        {dom}
                    </a>
                );
            },
        },
        {
            title: '接口描述',
            dataIndex: 'description',
            valueType: 'textarea',
            align: "center",
            hideInSearch: true
        },
        {
            title: '接口地址',
            dataIndex: 'url',
            align: "center",
            hideInSearch: true,
        },
        {
            title: '请求方法',
            dataIndex: 'method',
            align: "center",
        },
        {
            title: '接口状态',
            dataIndex: 'status',
            align: "center",
            valueType: "select",
            valueEnum: {
                true: {
                    text: <Tag color="#87d068">open</Tag>
                },
                false: {
                    text: <Tag color="#cd201f">close</Tag>
                }
            },
        },
        {
            title: '创建人',
            dataIndex: 'userAccount',
            align: "center",
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            align: "center",
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: "option",
            align: "center",
            render: (_, record) => [
                (<a
                    key="config"
                    onClick={() => {
                        setCurrentRow(record);
                        handleUpdateModalOpen(true);
                    }}
                >
                    配置
                </a>),
                (<Popconfirm
                    title="Delete the task"
                    description="你确定要删除吗?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={async () => {
                        const response = await deleteInterface({
                            interfaceId: record.id || 0
                        })
                        if (response.code === 200 && response?.data) {
                            message.success("删除成功！")
                            actionRef?.current?.reload();
                        } else {
                            message.error("删除失败")
                        }
                    }}
                >
                    <a key="config">删除</a>
                </Popconfirm>)
            ]
        },
        {
            title: '请求头',
            dataIndex: 'requestHeader',
            hideInSearch: true,
            hideInTable: true,
        },
        {
            title: '请求主体',
            dataIndex: 'requestBody',
            hideInSearch: true,
            hideInTable: true,
        },
        {
            title: '响应头',
            dataIndex: 'responseHeader',
            hideInSearch: true,
            hideInTable: true,
        },
        {
            title: '响应主体',
            dataIndex: 'responseBody',
            hideInSearch: true,
            hideInTable: true,
        },
    ];
    return (
        <PageContainer>
            <ProTable<API.InterfaceInfoVO, API.InterfacePageParams>
                headerTitle={'查询表格'}
                actionRef={actionRef}
                rowKey="id"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                request={async (params) => {
                    const response = await queryInterfaceInfo({
                        currentPage: params.current,
                        pageSize: params.pageSize,
                        interfaceName: params.name,
                        method: params.method,
                        userAccount: params.userAccount,
                        status: params.status !== undefined ? params.status === "true" : undefined
                    })
                    return {
                        data: response.data?.records,
                        // success 请返回 true，
                        // 不然 table 会停止解析数据，即使有数据
                        success: response.code === 200,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        total: response.data?.total,
                    }
                }}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            已选择{' '}
                            <a
                                style={{
                                    fontWeight: 600,
                                }}
                            >
                                {selectedRowsState.length}
                            </a>{' '}
                            项 &nbsp;&nbsp;
                        </div>
                    }
                >
                    <Button type="primary">批量审批</Button>
                </FooterToolbar>
            )}
            <ModalForm
                title={'新建接口'}
                width="80%"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    const response = await addInterfaceInfo(value as API.InterfaceInfoVO);
                    if (response.code === 200) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    } else {
                        message.error("添加失败：" + response.msg)
                    }
                }}
            >
                <ProForm.Group>
                    <ProFormText
                        label="接口名称"
                        rules={requireRules}
                        width="md"
                        name="interfaceName"
                    />
                    <ProFormTextArea
                        label="接口描述"
                        width="md" name="description"
                    />

                    <ProFormText
                        label="接口地址"
                        rules={requireRules}
                        width="md"
                        name="url"
                    />
                    <ProFormSelect
                        label="调用方法"
                        name="method"
                        rules={requireRules}
                        width="md"
                        options={[
                            {
                                value: "GET",
                                label: "GET"
                            },
                            {
                                value: "POST",
                                label: "POST"
                            },
                        ]}
                    />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormTextArea
                        label="请求头"
                        width="md" name="requestHeader"
                    />
                    <ProFormTextArea
                        label="响应头"
                        width="md" name="responseHeader"
                    />
                    <ProFormTextArea
                        label="请求体"
                        width="md" name="requestBody"
                    />
                    <ProFormTextArea
                        label="响应体"
                        width="md" name="responseBody"
                    />

                </ProForm.Group>


            </ModalForm>
            <UpdateForm
                onSubmit={async (value) => {
                    const response = await updateInterfaceInfo(value)
                    if (response.code === 200) {
                        handleUpdateModalOpen(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onOpenChange={handleUpdateModalOpen}
                updateModalOpen={updateModalOpen}
                values={currentRow || {}}
            />

            <Drawer
                width={600}
                open={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.name && (
                    <ProDescriptions<API.InterfaceInfoVO>
                        column={2}
                        title={currentRow?.name}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.name,
                        }}
                        columns={columns as ProDescriptionsItemProps<API.InterfaceInfoVO>[]}
                    />
                )}
            </Drawer>
        </PageContainer>
    )
}

export default InterfaceManage;