import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"


function Header() {
    return (
        <div className="p-3 px5 flex items-center justify-between shadow-md">
            <div className="flex gap-3 items-center">
                <Image src={'/clipcraft-high-resolution-logo-transparent.png'} height={40} width={40} />
                <h1 className="font-bold text-xl">ClipCraft</h1>
            </div>

            <div className="flex gap-3 items-center">
            <Button>Dashboard</Button>
            <UserButton/>
            </div>
        </div>
        
    )
}

export default Header
