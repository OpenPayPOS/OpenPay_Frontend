import { NavLink, Switch, useMantineColorScheme } from "@mantine/core"

import { ROUTES } from "@utils/routes"
import classes from './Navbar.module.css'
import { IconMoon, IconSun } from "@tabler/icons-react";

export function Navbar() {
    console.log(window.location.pathname)
      const { setColorScheme } = useMantineColorScheme();
    function setDark(dark: boolean) {
        if (dark) {
            setColorScheme('dark')
        }
        else {
            setColorScheme('light')
        }
    }

    return (<div className={classes.navbar}>
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
        <Switch
            size='xl'
            color='dark.4'
            onLabel={<IconSun color="var(--mantine-color-yellow-4)" />}
            offLabel={<IconMoon color="var(--mantine-color-blue-6)" />}
            onChange={(event) => setDark(event.currentTarget.checked)}
        />
    </div>)
}