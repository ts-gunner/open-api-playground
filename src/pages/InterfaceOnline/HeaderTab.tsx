import { ProFormList, ProFormGroup, ProFormText, ProForm } from '@ant-design/pro-components'
import { CloseCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

function HeadersTab({ interfaceData, formRef }: { 
    interfaceData: API.InterfaceInfoVO,
    formRef: any
 }) {
    const [key, setKey] = useState(0)
    useEffect(() => {
        if (interfaceData) {
            setKey(key + 1)
        }
    }, [interfaceData])
    return (
        <ProForm
            key={key}
            formRef={formRef}
            initialValues={{
                responseHeader: JSON.parse(interfaceData.requestHeader || "[]")
            }}
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
        >
            <ProFormList
                name="responseHeader"
                deleteIconProps={{
                    Icon: CloseCircleOutlined,
                    tooltipText: '删除',
                }}
            >
                <ProFormGroup key="group">
                    <ProFormText name="key" label="KEY" width="lg" />
                    <ProFormText name="value" label="VALUE" width="lg" />
                </ProFormGroup>
            </ProFormList>
        </ProForm>

    )
}
export default HeadersTab;