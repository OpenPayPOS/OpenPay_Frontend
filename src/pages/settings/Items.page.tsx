import { useApi } from "@hooks/useApi";
import { Paper, ScrollArea, Table } from "@mantine/core";
import { Item } from "../../types/item";
import { IconEdit, IconX } from "@tabler/icons-react";

export function ItemsPage() {
    const { data, isLoading, error } = useApi<Item[]>('https://localhost:8081/api/v1/Items')
    console.log(data)

    const rows = isLoading ? 
        <Table.Tr>
            <Table.Td width='50%'>'Items loading...'</Table.Td>
        </Table.Tr>
            :
        data?.map(item => (
        <Table.Tr key={item.id}>
                <Table.Td width='33%'>{item.name}</Table.Td>
                <Table.Td width='33%'>€ {item.price.toFixed(2)}</Table.Td>
                <Table.Td width='33%'>{item.taxPercentage} %</Table.Td>
                <Table.Td style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <IconEdit color="var(--mantine-color-orange-6)" />
                    <IconX color="var(--mantine-color-error)" />
                </Table.Td>
        </Table.Tr>
    ))
    if (error) {
        return (<div>Error!</div>)
        }
    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'var(--mantine-color-default-hover)',
            height: '100%',
            overflowY: 'hidden'
        }}>
            <Paper shadow="xs" p="xl" mah='100%' style={{
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column'
            }} >
                <h1 style={{
                    margin: '0'
                }}>Manage items</h1>
                <ScrollArea.Autosize offsetScrollbars>
                    <Table stickyHeader> 
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Price</Table.Th>
                                <Table.Th>Tax Rate</Table.Th>
                                <Table.Th />
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                        {rows}
                        </Table.Tbody>
                    </Table>
                </ScrollArea.Autosize>
            </Paper>
        </div>
    )
}