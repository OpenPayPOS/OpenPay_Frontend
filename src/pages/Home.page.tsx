import { Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function HomePage() {
    const navigate = useNavigate()

    return (
        <Group justify="center" align="center" style={{
            height: '100%'
        }}>
            <Button variant="filled" onClick={() => navigate("/order")}>Create new order</Button>
        </Group>
    )
}