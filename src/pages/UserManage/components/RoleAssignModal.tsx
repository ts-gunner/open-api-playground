import { getRoleList } from '@/services/forty-controller/userRoleController';
import {
    ModalForm,
    ProFormSelect,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useState } from 'react';
export type FormValueType = Partial<API.AddUserRoleRequest>;
export type UpdateFormProps = {
    onOpenChange: any;
    onSubmit: (values: FormValueType) => Promise<void>;
    roleAssignModalOpen: boolean;
    values: Partial<API.UserVO>;
};
const requireRules = [
    {
        required: true,
        message: '为必填项',
    },
]
const RoleAssignModal: React.FC<UpdateFormProps> = ({ roleAssignModalOpen, onOpenChange, onSubmit, values }) => {
    // 强制刷新Modal，更新初始化值
    const [key, setKey] = useState(0)
    useEffect(() => {
        setKey(key + 1)
    }, [values])
    return (
        <ModalForm
            title='角色授权'
            width="30%"
            open={roleAssignModalOpen}
            onOpenChange={onOpenChange}
            onFinish={onSubmit}
        >
            <ProFormSelect
                label="角色"
                rules={requireRules}
                width="md"
                name="roleId"
                request={async () => {
                    const response = await getRoleList({})
                    let options: { label: string, value: number }[] = []
                    if (response.code === 200) {
                        response.data?.map((item) => {
                            options.push({
                                label: item.roleName || "",
                                value: item.roleId || -1
                            })
                        })
                    }
                    return options
                }}

            />


        </ModalForm>
    );
};
export default RoleAssignModal;
