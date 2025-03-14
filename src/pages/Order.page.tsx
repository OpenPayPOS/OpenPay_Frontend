import { SimpleGrid, Tabs } from "@mantine/core";
import { Item } from "../types/item";
import { useApi } from "@hooks/useApi";
import { useState } from "react";
import { ItemComponent } from "@components/Order/Item";

type value = {
    item: Item,
    amount: number
}

export function OrderPage() {
    const { data, isLoading, error } = useApi<Item[]>('https://localhost:8081/api/v1/Items')
    const [activeCategory, setActiveCategory] = useState<string | null>('first');
    const [order, setOrder] = useState<Map<string,value>>(new Map())

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    if (error) {
        console.log(error)
        return (<div>Error!</div>)
    }

    const addToOrder = (item: Item) => {
        setOrder(prevOrder => {
            const newOrder = new Map(prevOrder); // Create a new Map instance
            const amount = (newOrder.get(item.id)?.amount ?? 0) + 1;
            newOrder.set(item.id, { item, amount });
            return newOrder; // React will now detect the change and trigger a rerender
        });
    }

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
                    {data?.map(item => <ItemComponent item={ item } onClick={() => addToOrder(item)} />)}
                    </SimpleGrid>
                </div>
            </section>
        <section style={{
            backgroundColor: 'var(--mantine-primary-color-2)',
            height: '100%',
            width: '180px',
            padding: '10px 20px'
        }}>
            {Array.from(order.keys()).map(id => {
                const amount = order.get(id)?.amount
                const item = order.get(id)?.item
                console.log(id)

                return <div key={id}>{item?.name}: {amount}</div>
            })}
        </section>
        </div>
    )
}