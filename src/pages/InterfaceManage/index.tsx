import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
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
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { addInterfaceInfo, queryInterfaceInfo } from '@/services/forty-controller/interfaceInfoController';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const requireRules = [
    {
        required: true,
        message: '接口名称为必填项',
    },
]

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
        await updateRule({
            name: fields.name,
            desc: fields.description,
            key: fields.id,
        });
        hide();
        message.success('Configuration is successful');
        return true;
    } catch (error) {
        hide();
        message.error('Configuration failed, please try again!');
        return false;
    }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.InterfaceInfoVO[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.id),
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};

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

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */

    const columns: ProColumns<API.InterfaceInfoVO>[] = [
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
        },
        {
            title: '接口地址',
            dataIndex: 'url',
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
            hideInForm: true,
            valueEnum: {
                0: {
                    text: '关闭',
                    status: 'Default',
                },
                1: {
                    text: '开启',
                    status: 'Success',
                },
            },
        },
        {
            title: '创建人',
            dataIndex: 'userAccount',
            align: "center",
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            align: "center",
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        handleUpdateModalOpen(true);
                        setCurrentRow(record);
                    }}
                >
                    配置
                </a>,
                <a key="subscribeAlert" href="https://procomponents.ant.design/">
                    订阅警报
                </a>,
            ],
        },
    ];
    return (
        <PageContainer>
            <ProTable<API.InterfaceInfoVO, API.PageParams>
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
                request={async (
                    params,
                    sort,
                    filter,
                ) => {
                    const response = await queryInterfaceInfo({
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
                            <span>
                                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + 1, 0)} 万
                            </span>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>
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
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateModalOpen(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleUpdateModalOpen(false);
                    if (!showDetail) {
                        setCurrentRow(undefined);
                    }
                }}
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