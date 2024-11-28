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
} & Partial<API.InterfaceInfoVO>;
export type UpdateFormProps = {
  onOpenChange: any;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.InterfaceInfoVO>;
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
      title='更新接口信息'
      width="80%"
      open={updateModalOpen}
      onOpenChange={onOpenChange}
      onFinish={onSubmit}
      initialValues={{
        interfaceId: values.id,
        interfaceName: values.name,
        interfaceDescription: values.description,
        url: values.url,
        method: values.method,
        status: values.status ? 1 : 0,
        requestHeader: values.requestHeader,
        requestBody: values.requestBody,
        responseHeader: values.responseHeader,
        responseBody: values.responseBody,
      }}
    >
      <ProFormText
          label="id"
          width="md"
          name="interfaceId"
          hidden
        ></ProFormText>
      <ProForm.Group>
        <ProFormText
          label="接口名称"
          width="md"
          name="interfaceName"
        ></ProFormText>
        <ProFormText
          label="接口地址"
          width="md"
          name="url"
        />
        <ProFormSelect
          label="调用方法"
          name="method"
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
        <ProFormSelect
          label="接口状态"
          name="status"
          width="md"
          options={[
            {
              value: 0,
              label: "不可用(close)"
            },
            {
              value: 1,
              label: "可用(open)"
            },
          ]}
        />
        <ProFormTextArea
          label="接口描述"
          width="md" name="interfaceDescription"
        />
      </ProForm.Group>

      <ProForm.Group>

        <ProFormTextArea
          label="请求头"
          width="md" name="requestHeader"
        />
        <ProFormTextArea
          label="请求体"
          width="md" name="requestBody"
        />
      </ProForm.Group>
      <ProForm.Group>

        <ProFormTextArea
          label="响应头"
          width="md" name="responseHeader"
        />

        <ProFormTextArea
          label="响应体"
          width="md" name="responseBody"
        />

      </ProForm.Group >


    </ModalForm >
  );
};
export default UpdateForm;
