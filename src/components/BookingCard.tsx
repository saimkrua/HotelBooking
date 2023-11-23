import { BookingItem } from "@/interface";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { Button, Divider, Stack, ThemeProvider } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useCallback } from "react";
import deleteBooking from "@/libs/deleteBooking";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { theme } from "./MuiThemeProvider";

export default async function BookingCard({
    Book,
}: {
    Book: BookingItem;
}) {

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/signin");
    }
    const profile = await getUserProfile(session.user.token)


    return (
        <div className="mb-8 flex bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm items-center">
            <ThemeProvider theme={theme}>

                <Stack className="w-4/5" direction={"row"} spacing={2} padding={2} divider={<Divider orientation="vertical" flexItem />}>
                    <div className="p-4 w-1/2">
                        <h3 className="line-clamp-1">{Book.hotel?.name}</h3>
                        <ul className="mt-1 space-y-1 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:gap-y-5">
                            <li className="flex items-start lg:col-span-1">
                                <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="10" r="3" />
                                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                    </svg>

                                </div>
                                <p className="line-clamp-2">{Book.hotel?.address}</p>
                            </li>
                            <li className="flex items-start lg:col-span-1">
                                <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <p className="line-clamp-2">{Book.hotel?.tel}</p>
                            </li>
                        </ul>
                    </div>
                    {
                        (profile?.data.role == "admin") ?
                            <div className="p-4 w-1/2">

                                <h3>{Book.user?.name}</h3>
                                <div>
                                    <p>Check-in : {dayjs(Book.bookingDate).format("MM/DD/YYYY")}</p>
                                    <p>Check-out : {dayjs(Book.checkoutDate).format("MM/DD/YYYY")}</p>
                                </div>

                            </div>
                            : <div className="p-4 w-1/2">

                                <h3>User</h3>
                                <div>
                                    <p>Check-in : {dayjs(Book.bookingDate).format("MM/DD/YYYY")}</p>
                                    <p>Check-out : {dayjs(Book.checkoutDate).format("MM/DD/YYYY")}</p>
                                </div>

                            </div>
                    }

                </Stack>
                <Stack className="w-1/5" direction="column" justifyContent="center" alignItems="center" spacing={2} padding={2}>

                    <Button size="small" variant="outlined" href={`/booking/${Book._id}`}>
                        Manage
                    </Button>
                </Stack>
            </ThemeProvider>
        </div>
    );
}