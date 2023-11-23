import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Grid, Paper, ThemeProvider } from '@mui/material';
import { BookingItem } from '@/interface';
import { redirect } from 'next/navigation';
import getUserProfile from '@/libs/getUserProfile';
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditBookingForm from './EditBookingForm';

export default async function EditBooking({ book }: { book: BookingItem }) {

    const hotel = book.hotel
    const user = book.user

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/signin");
    }

    const profile = await getUserProfile(session.user.token)

    return (
        <ThemeProvider theme={theme}>

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box className="flex flex-col items-center" sx={{ mt: 3 }}>
                        <Typography component="h1" variant="h5">
                            {hotel?.name}
                        </Typography>
                        <ul className="mt-3 mb-10 space-y-1 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:gap-y-5">
                            <li className="flex  spacitems-start lg:col-span-1">
                                <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="10" r="3" />
                                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                    </svg>

                                </div>
                                <p className="line-clamp-2">{hotel?.address}</p>
                            </li>
                            <li className="flex items-start lg:col-span-1">
                                <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <p className="line-clamp-2">{hotel?.tel}</p>
                            </li>
                        </ul>
                        {
                            (profile?.data.role == "admin") ?

                                <Typography component="h1" variant="h5">
                                    {user?.name}
                                </Typography> : null
                        }
                        {
                            (profile?.data.role == "admin") ?

                                <ul className="mt-3 mb-5 space-y-1 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:gap-y-5">
                                    <li className="flex  spacitems-start lg:col-span-1">
                                        <div className="flex-shrink-0 mr-2">
                                            {/* <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="12" cy="10" r="3" />
                                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                            </svg> */}
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </div>
                                        <p className="line-clamp-2">{user?.email}</p>
                                    </li>
                                    <li className="flex items-start lg:col-span-1">
                                        <div className="flex-shrink-0 mr-2">
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </div>
                                        <p className="line-clamp-2">{user?.tel}</p>
                                    </li>
                                </ul> : null
                        }
                    </Box>

                    <EditBookingForm book={book} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}
