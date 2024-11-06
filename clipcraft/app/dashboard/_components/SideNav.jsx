import { CircleUserIcon, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react"
import Link from "next/link"


function SideNav() {
    const MenuOption = [
        {
            id: 1,
            name: 'Dashboard',
            path: '/dashboard',
            icon: PanelsTopLeft
        },
        {
            id: 2,
            name: 'Create New',
            path: '/create-new',
            icon: FileVideo
        },
        {
            id: 3,
            name: 'Upgrade',
            path: '/upgrade',
            icon: ShieldPlus
        },
        {
            id: 4,
            name: 'Account',
            path: '/account',
            icon: CircleUserIcon
        },
    ]
    return (
        <div className="w-64 h-screen shadow-md p-5">
            <div className="grid gap-2">
                {MenuOption.map((item, index) => (
                    <Link href={item.path} key={index}>
                    <div className="flex items-center gap-3 p-3 hover:bg-primary hover:text-white rounded-md cursor-pointer">
                        <item.icon />
                        <h2>{item.name}</h2>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav
