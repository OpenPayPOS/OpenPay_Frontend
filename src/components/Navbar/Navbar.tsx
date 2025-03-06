import { NavLink } from "@mantine/core"

import { ROUTES } from "@utils/routes"

export function Navbar() {
    console.log(window.location.pathname)

    return (<div style={{
        backgroundColor: 'var(--mantine-color-gray-2)',
        height: '100%',
    }}>
        {
            ROUTES.map((route, index) => {
                if (route.show === undefined || route.show === false) {
                    return null
                }
                if (route.icon == null) {
                    return <NavLink
                        key={index}
                        href={route.path}
                        label={route.name} />
                }
                return <NavLink
                    key={index}
                    href={route.path}
                    label={route.name}
                    leftSection={<route.icon size={16} stroke={1.5} />} />})
        }
        
    </div>)
}