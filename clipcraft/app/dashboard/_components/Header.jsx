import { UserDetailContext } from "@/app/_context/UserDetailContext"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import { useContext } from "react"


function Header() {

    const {userDetail, setUserDetail} = useContext(UserDetailContext);

    return (
        <div className="p-3 px5 flex items-center justify-between shadow-md">
            <div className="flex gap-3 items-center">
                <Image src={'/clipcraft-high-resolution-logo-transparent.png'} height={40} width={40} />
                <h1 className="font-bold text-xl">ClipCraft</h1>
            </div>

            <div className="flex gap-3 items-center">
                <div className="flex gap-2 items-center">
                    <Image src="/coin.png" alt="Credits" width={20} height={20}/>
                    <h2>{userDetail.credits}</h2>
                </div>
            <Button>Dashboard</Button>
            <UserButton/>
            </div>
        </div>
        
    )
}

export default Header
