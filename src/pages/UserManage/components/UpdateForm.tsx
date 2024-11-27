import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProForm
} from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useState } from 'react';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.UserUpdateRequest>;
export type UpdateFormProps = {
  onOpenChange: any;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.UserUpdateRequest>;
};
const UpdateForm: React.FC<UpdateFormProps> = ({ updateModalOpen, onOpenChange, onSubmit, values }) => {
  // 强制刷新Modal，更新初始化值
  const [key, setKey] = useState(0)
  useEffect(() => {
    setKey(key + 1)
  }, [values])
  return (
    <ModalForm
      key={key}
      title='更新用户信息'
      width="30%"
      open={updateModalOpen}
      onOpenChange={onOpenChange}
      onFinish={onSubmit}
      initialValues={{
        id: values.id,
        userName: values.userName,
        userProfile: values.userProfile,
        
      }}
    >
     <ProFormText
          label="id"
          width="md"
        name="id"
        hidden
        ></ProFormText>
        <ProFormText
          label="用户昵称"
          width="md"
          name="userName"
        ></ProFormText>
        <ProFormText
          label="用户介绍"
          width="md"
          name="userProfile"
        />
       


    </ModalForm >
  );
};
export default UpdateForm;
