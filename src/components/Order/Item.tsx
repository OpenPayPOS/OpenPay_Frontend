import { Item } from "../../types/item"
import classes from './Item.module.css'

export function ItemComponent({ item, onClick }: { item: Item, onClick: () => void }) {
    console.log(item)
    return (
            <button key={item.id} type="button" className={classes.order_display_item} style={{
                backgroundImage: `url(${`http://localhost:3000/uploads/${item.imagePath}`})`
            }} onClick={() => onClick()} onKeyDown={() => onClick()}>
                <div className={classes.overlay} />
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
            </button>
        )
}