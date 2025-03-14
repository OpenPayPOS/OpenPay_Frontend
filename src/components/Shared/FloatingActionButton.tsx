import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export function FloatingActionButton() {
    return (<div style={{
        position: 'absolute',
        right: '20px',
        bottom: '20px'
    }}>
        <a href="/settings/items/create">
        <ActionIcon variant="filled" size='40px'>
            <IconPlus stroke={3} />
        </ActionIcon>
        </a>
    </div>)
}