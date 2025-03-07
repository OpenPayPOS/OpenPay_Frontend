import { SimpleGrid, Tabs } from "@mantine/core";
import { Item } from "../types/item";
import { useApi } from "@hooks/useApi";
import { useState } from "react";
import { ItemComponent } from "@components/Order/Item";

export function OrderPage() {
    const { data, isLoading, error } = useApi<Item[]>('https://localhost:8081/api/v1/Items')
    const [activeCategory, setActiveCategory] = useState<string | null>('first');
    
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
                <div>
                    <Tabs value={activeCategory} onChange={setActiveCategory}>
                        <Tabs.List>
                            <Tabs.Tab value="first">First tab</Tabs.Tab>
                            <Tabs.Tab value="second">Second tab</Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                    <SimpleGrid cols={6}>
                    {data?.map(item => <ItemComponent item={ item } />)}
                    </SimpleGrid>
                </div>
            </section>
        <section style={{
            backgroundColor: 'var(--mantine-primary-color-2)',
            height: '100%',
            width: '180px',
            padding: '10px 20px'
        }}>
            test
        </section>
        </div>
    )
}