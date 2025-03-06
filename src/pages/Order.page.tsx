import { SimpleGrid } from "@mantine/core";
import { Item } from "../types/item";
import { useApi } from "@hooks/useApi";

export function OrderPage() {
    const { data, isLoading, error } = useApi<Item[]>('https://localhost:8081/api/v1/Items')
    
    if (isLoading) {
        return (<div>Loading...</div>)
    }

    if (error) {
        console.log(error)
        return (<div>Error!</div>)
    }

    console.log(data)
    return (
        <div style={{
            display: 'flex',
            height: '100%'
        }}>
            <section style={{
                    width: 'calc(100% - 180px)'
            }}>
                <SimpleGrid cols={6}>
                {data?.map(item => (
                    <div key={item.id} style={{
                        aspectRatio: '1',
                        backgroundColor: 'var(--mantine-primary-color-6)'
                    }}>{item.name}</div>
                ))}
            </SimpleGrid>
            </section>
        <div style={{
            backgroundColor: 'var(--mantine-primary-color-2)',
            height: '100%',
            width: '180px'
        }}>
            test
        </div>
        </div>
    )
}