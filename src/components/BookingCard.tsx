import { BookingItem } from "@/interface";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { Button, Divider, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useCallback } from "react";
import deleteBooking from "@/libs/deleteBooking";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

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
        <div className="mb-8 flex bg-white border border-gray-300 hover:scale-105 transition-transform rounded-xl overflow-hidden shadow-sm items-center">

            {/* <Stack direction={"row"} spacing={2} padding={2} divider={<Divider orientation="vertical" flexItem />}> */}
                <Stack direction={"column"} spacing={2} padding={2}>
                    <Stack direction={"row"} spacing={2}>
                        <h3>Hotel</h3>
                        <div>{Book.hotel?.name}</div>
                        {/* <div>{Book.hotel?.address}</div>
                        <div>{Book.hotel?.tel}</div> */}
                    </Stack>
                    {
                        (profile?.data.role == "admin") ?
                            <Stack direction={"row"} spacing={2}>
                                <h3>User</h3>
                                <div>{Book.user?.name}</div>
                                {/* <div>{Book.user?.email}</div>
                                <div>{Book.user?.tel}</div> */}
                            </Stack> : null
                    }
                    <Stack direction={"row"} spacing={2}>
                        <h3>Date</h3>
                        <div> {dayjs(Book.bookingDate).format("MM/DD/YYYY")} to {dayjs(Book.checkoutDate).format("MM/DD/YYYY")}</div>
                        {/* <div>{Book.hotel?.address}</div>
                        <div>{Book.hotel?.tel}</div> */}
                    </Stack>

                </Stack>

            {/* </Stack> */}

            {/* <Stack direction="column" spacing={2} padding={2}>
                <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
                    Delete
                </Button>
                <Button size="small" variant="outlined" startIcon={<EditIcon />}>
                    Edit
                </Button>
            </Stack> */}
        </div>
    );
}