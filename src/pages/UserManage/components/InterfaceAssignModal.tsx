import type {
    ActionType,
    EditableFormInstance,
    ProColumns,
} from '@ant-design/pro-components';
import {
    ModalForm,
    EditableProTable
} from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useState, useRef } from 'react';
import { addOrUpdateUserInterfaceInfo, searchUserInterfaceInfo } from '@/services/forty-controller/userInterfaceInfoController';
import { message } from 'antd';
export type FormValueType = Partial<API.AddUserRoleRequest>;
export type UpdateFormProps = {
    onOpenChange: any;
    onSubmit: (values: FormValueType) => Promise<void>;
    modalOpen: boolean;
    values: Partial<API.UserVO>;
};

const InterfaceAssignModal: React.FC<UpdateFormProps> = ({ modalOpen, onOpenChange, onSubmit, values }) => {
    // 强制刷新Modal，更新初始化值
    const [key, setKey] = useState(0)
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
    const actionRef = useRef<ActionType>();
    const editableFormRef = useRef<EditableFormInstance>();
    useEffect(() => {
        setKey(key + 1)
    }, [values])
    
    const columns: ProColumns<API.UserInterfaceVO>[] = [
        {
            title: "接口ID",
            dataIndex: "interfaceId",
            editable: false,
            align: "center",
        },
        {
            title: "接口名称",
            dataIndex: "name",
            editable: false,
            align: "center",
        },
        {
            title: "接口地址",
            dataIndex: "url",
            editable: false,
            align: "center",
        },
        {
            title: "方法",
            dataIndex: "method",
            editable: false,
            align: "center",
        },
        {
            title: "剩余调用次数",
            dataIndex: "remainCount",
            align: "center",
            valueType: "digit"
        },
        {
            title: '操作',
            valueType: 'option',
            render: (_, row) => [
                <a
                    key="edit"
                    onClick={() => {
                        actionRef.current?.startEditable(row.interfaceId || 0);
                    }}
                >
                    编辑
                </a>,
            ],
        }
    ]

    const handleSave = async (rowKey:any, data:API.UserInterfaceVO) => {  
        // 自定义保存逻辑，例如发送请求保存数据  
        console.log('Saved Data:', rowKey, data);  
        const response = await addOrUpdateUserInterfaceInfo({
            userId: values.id,
            interfaceId: data.interfaceId,
            remainCount: data.remainCount
        })
        if (response.code === 200) {
            message.success("更新成功")
            actionRef.current?.reload()
        }else {
            message.error(response.msg)
        }
        // 可以根据需要编写网络请求，例如：  
        // await saveDataToServer(rowKey, data);  
      
      };  
    return (
        <ModalForm
            key={key}
            title='接口授权'
            width="70%"
            open={modalOpen}
            onOpenChange={onOpenChange}
            onFinish={onSubmit}
        >
            <EditableProTable
                rowKey="interfaceId"
                recordCreatorProps={false}
                editableFormRef={editableFormRef}
                actionRef={actionRef}
                request={async () => {
                    const response = await searchUserInterfaceInfo({
                        userId: values.id
                    })
                    return {
                        data:response.data?.records
                    }
                }}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onChange: setEditableRowKeys,
                    onSave: handleSave
                }}
                columns={columns}
            ></EditableProTable>

        </ModalForm>
    );
};
export default InterfaceAssignModal;
