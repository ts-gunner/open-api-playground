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
  ProForm
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message, Tag, Popconfirm, Image } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import RoleAssignModal from './components/RoleAssignModal';
import { addUser, deleteUser, getUserList, updateUser } from '@/services/forty-controller/userController';
import { addRoleToUser } from '@/services/forty-controller/roleAssignmentController';


const requireRules = [
  {
    required: true,
    message: '为必填项',
  },
]


const UserManage: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [roleAssignModalOpen, handleRoleAssignModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserVO[]>([]);

  const columns: ProColumns<API.UserVO>[] = [

    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      align: "center",
      hideInSearch: true,
      render: (text) => {
        if (text !== "-" && text !== undefined){
          return <Image width={50} src={text?.toString()}></Image>
        }else {
          return <Image
          width={50}
          height={50}
          src="error"
          fallback="data:image/png;base64,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"
        />
        }

        
      }
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
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
      title: '昵称',
      dataIndex: 'userName',
      valueType: 'textarea',
      align: "center",
    },
    {
      title: '角色',
      dataIndex: 'roles',
      align: "center",
      render: (text: any) => {
        return text?.map((item: any) => {
          return (<Tag color="#108ee9">{item}</Tag>)
        })

      }
    },
    {
      title: '自我介绍',
      dataIndex: 'userProfile',
      align: "center",
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: "center",
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
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
        (<a
          key="role-assign"
          onClick={() => {
            setCurrentRow(record)
            handleRoleAssignModalOpen(true)
          }}
        >
          角色授权
        </a>),
        (<a
          key="reset-password"
        >
          重置密码
        </a>),
        (<Popconfirm
          title="Delete the task"
          description="你确定要删除吗?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            const response = await deleteUser({
              userId: record.id || 0
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

    },

  ];
  return (
    <PageContainer>
      <ProTable<API.UserVO, API.UserPageParams>
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
          const response = await getUserList({
            currentPage: params.current,
            pageSize: params.pageSize,
            userAccount: params.userAccount,
            userName: params.userName,
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
        title='新建用户'
        width="80%"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const response = await addUser(value as API.UserAddRequest);
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
            label="用户账号"
            rules={requireRules}
            width="md"
            name="userAccount"
          />
          <ProFormText
            label="密码"
            rules={requireRules}
            width="md" name="password"
          />

          <ProFormText
            label="用户昵称"

            width="md"
            name="username"
          />
          <ProFormTextArea
            label="用户介绍"
            name="userProfile"
            width="md"
          />
        </ProForm.Group>

      </ModalForm>
      <RoleAssignModal
        roleAssignModalOpen={roleAssignModalOpen}
        onOpenChange={handleRoleAssignModalOpen}
        values={currentRow || {}}
        onSubmit={async (value) => { 
          const response = await addRoleToUser({
            roleId: value?.roleId,
            userId: currentRow?.id
          })
          if (response.code === 200) {
            message.success(response.msg)
            handleRoleAssignModalOpen(false)
            actionRef.current?.reload()
          } else {
            message.error(response.msg)
          }
        }}
      ></RoleAssignModal>
      <UpdateForm
        onSubmit={async (value: any) => {
          const response = await updateUser(value)
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
        {currentRow?.userAccount && (
          <ProDescriptions<API.UserVO>
            column={2}
            title={currentRow?.userAccount}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.userAccount,
            }}
            columns={columns as ProDescriptionsItemProps<API.UserVO>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  )
}

export default UserManage;