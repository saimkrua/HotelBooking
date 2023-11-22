import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { redirect } from "next/navigation";

export default async function TopMenu() {


    const session = await getServerSession(authOptions)
    if(!session){
        redirect("/home")
    }
    const profile = session ? await getUserProfile(session.user.token) : null

    return (

        <div className="menucontainer fixed px-9 top-0 left-0 right-0 h-20 bg-gray3 z-30 flex justify-between">
            <div className="flex justify-start items-center z-30 flex-row h-full">
                <TopMenuItem title="Home" pageRef="/home" />
                {
                    (profile?.data.role == "admin") ?
                        <TopMenuItem title="Manage Booking" pageRef="/booking" /> : null

                }
                {
                    (profile?.data.role == "user") ?
                        <TopMenuItem title="My Booking" pageRef="/booking" /> : null
                }
            </div>
            <div className="flex justify-start items-center z-30 flex-row-reverse h-full">
                {
                    session ?
                        <TopMenuItem title={`Sign-Out of ${session.user?.name}`} pageRef="/api/auth/signout" />
                        : <TopMenuItem title={`Sign-In`} pageRef="/api/auth/signin" />
                }
            </div>
        </div>
    );
}
