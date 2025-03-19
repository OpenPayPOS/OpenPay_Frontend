import { SimpleGrid, Tabs } from "@mantine/core";
import { Item } from "../types/item";
import { useApi } from "@hooks/useApi";
import { useState } from "react";
import { ItemComponent } from "@components/Order/Item";

import classes from './Order.page.module.css'
import { IconMinus, IconPlus } from "@tabler/icons-react";

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

    const getTotal = () => {
        let total = 0;
        order.entries().forEach(value => {
            total += value[1].amount * value[1].item.price
        })

        return total
    }

    return (
        <div style={{
            display: 'flex',
            height: '100%'
        }}>
            <section style={{
                    width: 'calc(100% - 250px)'
            }}>
                <div>
                    <Tabs value={activeCategory} onChange={setActiveCategory}>
                        <Tabs.List>
                            <Tabs.Tab value="first">First tab</Tabs.Tab>
                            <Tabs.Tab value="second">Second tab</Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                    <SimpleGrid cols={6}>
                    {data?.map(item => <ItemComponent key = {item.id} item={ item } onClick={() => addToOrder(item)} />)}
                    </SimpleGrid>
                </div>
            </section>
        <section className={classes.sidebar}>
            {Array.from(order.keys()).map(id => {
                const amount = order.get(id)?.amount
                const item = order.get(id)?.item
                if (item === undefined) { return null } 
                if (amount === undefined) { return null } 
                console.log(id)

                return <div key={id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <p>
                        {item.name}: {amount} - € {item.price * amount}
                    </p>
                    <div>
                    <IconPlus />
                    <IconMinus />
                    </div>
                </div>
            })}
            <div>Total: € {getTotal()}</div>
        </section>
        </div>
    )
}