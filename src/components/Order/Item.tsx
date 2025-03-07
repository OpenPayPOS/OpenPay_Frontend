import { Item } from "../../types/item"

export function ItemComponent({ item }: { item: Item }) {
    console.log(item)
    return (
            <div key={item.id} style={{
                aspectRatio: '1',
                backgroundColor: 'var(--mantine-primary-color-6)',
                position: 'relative'
            }}>
                <p style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '-2px',
                    margin: '0',
                    padding: '0 5px',
                    backgroundColor: 'var(--mantine-primary-color-4)',
                    borderRadius: '0 5px 0 0',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 2px -2px 3px 2px'
                }}>
                    {item.name}
                </p>
            </div>
        )
}