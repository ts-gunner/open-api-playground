import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProForm,
  ProFormList,
  ProFormGroup,
  ProCard
} from '@ant-design/pro-components';
import '@umijs/max';
import { CloseCircleOutlined } from '@ant-design/icons';
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
        requestHeader: JSON.parse(values.requestHeader || "[]"),
        requestBody: JSON.parse(values.requestBody || "[]"),
        responseHeader: JSON.parse(values.responseHeader || "[]"),
        responseBody: JSON.parse(values.responseBody || "[]"),
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


      </ProForm.Group>
      <ProForm.Group>
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
        <ProFormTextArea
          label="接口描述"
          width="xl" name="interfaceDescription"
        />
      </ProForm.Group>


      <ProCard
        title="Headers(请求头)"
        bordered
        boxShadow
        style={{
          marginTop: "20px"
        }}
      >
        <ProFormList
          name="requestHeader"
          deleteIconProps={{
            Icon: CloseCircleOutlined,
            tooltipText: '删除',
          }}
        >
          <ProFormGroup key="group">
            <ProFormText name="key" label="KEY" width="md" />
            <ProFormText name="value" label="VALUE" width="md" />
            <ProFormSelect name="type" label="TYPE" width="md"
              initialValue="string"
              options={[
                {
                  label: "String",
                  value: "string"
                },
                {
                  label: "Number",
                  value: "number"
                }
              ]}
            />
          </ProFormGroup>
        </ProFormList>
      </ProCard>

      <ProCard
        title="Body(请求主体)"
        bordered
        boxShadow
        style={{
          marginTop: "20px"
        }}
      >
        <ProFormList
          name="requestBody"
          deleteIconProps={{
            Icon: CloseCircleOutlined,
            tooltipText: '删除',
          }}
        >
          <ProFormGroup key="group">
            <ProFormText name="key" label="KEY" width="md" />
            <ProFormText name="value" label="VALUE" width="md" />
            <ProFormSelect name="type" label="TYPE" width="md"
              initialValue="string"
              options={[
                {
                  label: "String",
                  value: "string"
                },
                {
                  label: "Number",
                  value: "number"
                }
              ]} />
          </ProFormGroup>
        </ProFormList>
      </ProCard>

      <ProCard
        title="ResponseHeader(响应头)"
        bordered
        boxShadow
        style={{
          marginTop: "20px"
        }}
      >
        <ProFormList
          name="responseHeader"
          deleteIconProps={{
            Icon: CloseCircleOutlined,
            tooltipText: '删除',
          }}
        >
          <ProFormGroup key="group">
            <ProFormText name="key" label="KEY" width="md" />
            <ProFormText name="value" label="VALUE" width="md" />
            <ProFormSelect name="type" label="TYPE" width="md"
              initialValue="string"
              options={[
                {
                  label: "String",
                  value: "string"
                },
                {
                  label: "Number",
                  value: "number"
                }
              ]} />
          </ProFormGroup>
        </ProFormList>
      </ProCard>

      <ProCard
        title="Response(响应数据)"
        bordered
        boxShadow
        style={{
          marginTop: "20px"
        }}
      >
        <ProFormList
          name="responseBody"
          deleteIconProps={{
            Icon: CloseCircleOutlined,
            tooltipText: '删除',
          }}
        >
          <ProFormGroup key="group">
            <ProFormText name="key" label="KEY" width="md" />
            <ProFormText name="value" label="VALUE" width="md" />
            <ProFormSelect name="type" label="TYPE" width="md"
              initialValue="string"
              options={[
                {
                  label: "String",
                  value: "string"
                },
                {
                  label: "Number",
                  value: "number"
                }
              ]} />
          </ProFormGroup>
        </ProFormList>
      </ProCard>




    </ModalForm >
  );
};
export default UpdateForm;
