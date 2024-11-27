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
import { addRole, deleteRole, getRoleByPage } from '@/services/forty-controller/userRoleController';


const requireRules = [
    {
        required: true,
        message: '必填项',
    },
]


const RoleManage: React.FC = () => {
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.UserRoleVO>();
    const [selectedRowsState, setSelectedRows] = useState<API.UserRoleVO[]>([]);

    const columns: ProColumns<API.UserRoleVO>[] = [
        {
            title: '角色ID',
            dataIndex: 'roleId',
            align: "center",
        },

        {
            title: '角色名称',
            dataIndex: 'roleName',
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
                        const response = await deleteRole({
                            roleId: record.roleId || 0
                        })
                        if (response.code === 200) {
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
        }

    ];
    return (
        <PageContainer>
            <ProTable<API.UserRoleVO, API.PageParams>
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
                    const response = await getRoleByPage({
                        currentPage: params.current,
                        pageSize: params.pageSize,
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
                title={'新建角色'}
                width="30%"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    const response = await addRole(value as API.addRoleParams);
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
                <ProFormText
                    label="角色名称"
                    rules={requireRules}
                    width="md"
                    name="role"
                />

            </ModalForm>

            <Drawer
                width={600}
                open={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.roleName && (
                    <ProDescriptions<API.UserRoleVO>
                        column={2}
                        title={currentRow?.roleName}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.roleName,
                        }}
                        columns={columns as ProDescriptionsItemProps<API.UserRoleVO>[]}
                    />
                )}
            </Drawer>
        </PageContainer>
    )
}

export default RoleManage;