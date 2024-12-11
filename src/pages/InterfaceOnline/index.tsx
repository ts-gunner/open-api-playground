import React, { useEffect, useRef, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { useParams, Link } from '@umijs/max'
import { Space, Input, Button, Tabs, Radio, Select } from 'antd'
import type { TabsProps, RadioChangeEvent } from 'antd';
import { invokeInterface, queryInterfaceInfo } from '@/services/forty-controller/interfaceInfoController'
import HeadersTab from './HeaderTab';
import type { ProFormInstance } from '@ant-design/pro-components';
import ResponseComponent from './ResponseComponent';
import BodyTab from './BodyTab';

const GoBackComponent = ({ text, url }: { text: string, url: string }) => {
    return (
        <Link to={url}>{text}</Link>
    )
}
const switchToObject = (arr: {key: string, value: string}[]) => {
    let obj:any = {}
    arr.forEach((item) => {
        obj[item.key] = item.value
    })
    return obj
}
export default function InterfaceOnline() {
    const params = useParams()
    const [btnLoading, setBtnLoading] = useState<boolean>(false)
    const [interfaceData, setInterfaceData] = useState<API.InterfaceInfoVO>({});
    const headerFormRef = useRef<ProFormInstance>()
    const [showResponse, setShowResponse] = useState<boolean>(false)
    const [apiResult, setAPIResult] = useState({})
    /**
     * Requestbody
     */
    const [bodyType, setBodyType] = useState("Raw")
    const [rawText, setRawText] = useState("")
    const bodyFormRef = useRef<ProFormInstance>()

    const getInterfaceData = async () => {
        const response = await queryInterfaceInfo({
            interfaceId: Number.parseInt(params.interfaceId || "-1")
        })
        if (response.code === 200) {
            setInterfaceData(response.data?.records?.length == 1 ? response.data.records[0] : {})
        }

    }
    useEffect(() => {
        getInterfaceData()
    }, [])


    const callPublicAPI = async () => {
        setBtnLoading(true)
        const headers = headerFormRef.current?.getFieldsValue()["responseHeader"]
        const response = await invokeInterface({
            interfaceId: params.interfaceId,
            bodyType,
            userRequestHeader: JSON.stringify(headers),
            userRequestParams: bodyType === "Raw" ? JSON.stringify(JSON.parse(rawText || "{}")): 
            JSON.stringify(switchToObject(bodyFormRef.current?.getFieldsValue()["requestBody"]))
        })
        setBtnLoading(false)

        setShowResponse(true)
        setAPIResult(response)

    }


    // const BodyTab = () => {
        
    //     return (
    //         <div>
    //             <Space style={{ marginBottom: "20px" }}>
    //                 <Radio.Group onChange={onChange} value={bodyType}>
    //                     <Radio value="formData">form-data</Radio>
    //                     <Radio value="FormUrlEncoded">x-www-form-urlencoded</Radio>
    //                     <Radio value="Raw">raw</Radio>
    //                 </Radio.Group>
    //                 {bodyType === "Raw" && <Select defaultValue="json" options={[
    //                     { value: "json", label: "JSON" }
    //                 ]}></Select>}
    //             </Space>
    //             {bodyType === "Raw" && (
    //                 <Input.TextArea rows={6} style={{ borderRadius: "10px" }} onChange={handleRowText} defaultValue={rawText}>
    //                 </Input.TextArea>
    //             )}
    //             {(bodyType === "FormUrlEncoded" || bodyType === "formData") && (
    //                 <ProForm
    //                     formRef={bodyFormRef}
    //                     initialValues={{
    //                         requestBody: [{}]
    //                     }}
    //                     submitter={{
    //                         submitButtonProps: {
    //                             style: {
    //                                 display: "none"
    //                             }
    //                         },
    //                         resetButtonProps: {
    //                             style: {
    //                                 display: "none"
    //                             }
    //                         }
    //                     }}
    //                 >
    //                     <ProFormList
    //                         name="requestBody"
    //                         deleteIconProps={{
    //                             Icon: CloseCircleOutlined,
    //                             tooltipText: '删除',
    //                         }}
    //                     >
    //                         <ProFormGroup key="group">
    //                             <ProFormText name="key" label="KEY" width="lg" />
    //                             <ProFormText name="value" label="VALUE" width="lg" />
    //                         </ProFormGroup>
    //                     </ProFormList>
    //                 </ProForm>
    //             )}
    //         </div>
    //     )
    // }

    const tabItems: TabsProps['items'] = [
        { key: '1', label: 'Headers', children: <HeadersTab interfaceData={interfaceData} formRef={headerFormRef} /> },
        { key: '2', label: 'Body', children: <BodyTab 
            rawText={rawText} setRawText={setRawText} 
            bodyType={bodyType} setBodyType={setBodyType}
            formRef={bodyFormRef}
            /> },
    ];

    return (
        <PageContainer
            extra={
                <Space>
                    <GoBackComponent text="返回接口详情" url={`/interface/detail/${params.interfaceId}`} />
                    <GoBackComponent text="返回查看接口文档" url="/interface/docs" />
                </Space>
            }
        >
            <div style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Input addonBefore={interfaceData.method} value={interfaceData.url} ></Input>
                <Button type="primary" onClick={callPublicAPI} loading={btnLoading}>Send</Button>
            </div>

            <div>
                <Tabs items={tabItems}>
                </Tabs>
            </div>

            {showResponse && <ResponseComponent bodyResult={apiResult}/>}
        </PageContainer>
    )
}
