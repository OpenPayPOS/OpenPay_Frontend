import { useApiAtAction } from "@hooks/useApi"
import { ActionIcon, Button, Divider, FileButton, NumberInput, Paper, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { IconArrowBackUp, IconCheck, IconX } from "@tabler/icons-react"
import { BACKEND_URL } from "@utils/constants"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function CreateItemPage() {
    const [id, setId] = useState('')
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreviewImage] = useState<any>()

    const navigate = useNavigate()
    const { data, isLoading, error, fetchData, resetData } = useApiAtAction(`${BACKEND_URL}/api/v1/Items`, false)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {

        },
    })

    const handleSubmit = (values: any) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('price', values.price)
        formData.append('taxPercentage', values.taxPercentage)
        
        fetchData({
            method: "POST",
            body: formData
        })
    }
    
    useEffect(() => {
        if (isLoading && !error) {
            setId(notifications.show({
                loading: true,
                title: 'Loading',
                message: 'Waiting for a response',
                autoClose: false,
                withCloseButton: false
            }))
        }
    }, [isLoading])

    useEffect(() => {
        if (error) {
            console.log(error)
        // eslint-disable-next-line eqeqeq
            if (id != '') {
                notifications.update({
                    id,
                    title: 'Error!',
                    message: `${error}`,
                    icon: <IconX size={18} />,
                    autoClose: 2000,
                    loading: false
                })
            }
            resetData()
        }
    }, [error])

    useEffect(() => {
        if (data) {
            notifications.update({
                id,
                title: 'Item added!',
                message: '',
                icon: <IconCheck size={18} />,
                autoClose: 2000,
                loading: false
            })
            navigate('/settings/items')
        }
    
    }, [data])

    useEffect(() => {
        if (!file) {
            setPreviewImage(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreviewImage(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            backgroundColor: 'var(--mantine-color-default-hover)',
            height: '100%'
        }}>
            <Paper shadow="xs" p="xl" style={{
                minHeight: '50%',
                minWidth: '50%'
            }}>
                <ActionIcon variant="filled" aria-label="back" onClick={() => navigate('/settings/items')}>
                    <IconArrowBackUp style={{ width: '70%', height: '70%' }} stroke={2.5} />
                </ActionIcon>
                <h1>
                    Create Item
                </h1>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput withAsterisk label="Name" placeholder="Name" key={form.key('name')} {...form.getInputProps('name')} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '20px',
                        alignItems: 'center'
                    }}>
                        
                        <NumberInput withAsterisk prefix="€" allowNegative={false} decimalScale={2} label="Price" placeholder="1" step={0.1} key={form.key('price')} {...form.getInputProps("price")} />
                        <NumberInput withAsterisk suffix="%" min={0} max={100} decimalScale={2} label="Tax percentage" placeholder="10" step={1} key={form.key('taxPercentage')} {...form.getInputProps("taxPercentage")} />
                        <FileButton onChange={setFile} accept="image/png,image/jpeg">
                            {(props) => <Button {...props}>Upload Image</Button>}
                        </FileButton>
                    </div>
                    {file && (
                        <Text size="sm" ta="center" mt="sm">
                        Picked file:
                        <img alt={file.name} src={preview} />
                        </Text>
                    )}
                    <Divider style={{
                        margin: '20px 0 20px 0'
                    }}/>
                    <Button type="submit">Submit</Button>
                </form>
            </Paper>
        </div>
    )
}