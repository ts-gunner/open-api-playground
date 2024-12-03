
import { Radio, Space, Select, Input } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ProFormList, ProFormGroup, ProFormText, ProForm } from '@ant-design/pro-components'
import { CloseCircleOutlined } from '@ant-design/icons';


const BodyTab = ({bodyType, setBodyType, rawText,setRawText,formRef}: any) => {
    // const [bodyType, setBodyType] = useState("raw")
    // const [rawText, setRawText] = useState("")
    // const formRef = useRef<ProFormInstance>()
    const onChange = (e: RadioChangeEvent) => {
        setBodyType(e.target.value)
    }
    const handleRowText = (event: any) => {
        setRawText(event.target.value)
    }
    return (
        <div>
            <Space style={{ marginBottom: "20px" }}>
                <Radio.Group onChange={onChange} value={bodyType}>
                    <Radio value="formData">form-data</Radio>
                    <Radio value="formUrlEncoded">x-www-form-urlencoded</Radio>
                    <Radio value="Raw">raw</Radio>
                </Radio.Group>
                {bodyType === "Raw" && <Select defaultValue="json" options={[
                    { value: "json", label: "JSON" }
                ]}></Select>}
            </Space>
            {bodyType === "Raw" && (
                <Input.TextArea rows={6} style={{ borderRadius: "10px" }} onChange={handleRowText} defaultValue={rawText}>
                </Input.TextArea>
            )}
            {(bodyType === "formUrlEncoded" || bodyType === "formData") && (
                <ProForm
                    formRef={formRef}
                    initialValues={{
                        requestBody: [{}]
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
                        name="requestBody"
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
            )}
        </div>
    )
}

export default BodyTab