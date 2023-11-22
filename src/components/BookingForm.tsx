"use client"
import { useState, FormEvent, ChangeEvent } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormControl, Grid, Paper } from '@mui/material';
import { BookingItem, Hotel } from '@/interface';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import createBooking from '@/libs/createBooking';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function BookingForm({ hotel }: { hotel: Hotel }) {

    const { data: session, status } = useSession()
    if (!session) {
        redirect("/signin");
    }

    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null)
    const [checkoutDate, setCheckoutDate] = useState<Dayjs | null>(null)
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!hotel.id) {
            throw new Error('Invalid hotel ID');
        }

        if (!bookingDate || !checkoutDate) {
            alert("Booking date or checkout date is null");
            console.error('Booking date or checkout date is null');
            return;
        }

        const item = {
            bookingDate: dayjs(bookingDate).format("YYYY/MM/DD"),
            checkoutDate: dayjs(checkoutDate).format("YYYY/MM/DD"),
        };

        try {
            const result = await createBooking(session, hotel.id, item);

            if (result.success) {
                router.push('/booking');
            } else {
                // Show a more user-friendly error message
                alert(result.error?.message || 'An unexpected error occurred while creating the booking.');
                console.error('Booking creation failed:', result.error?.message);
            }
        } catch (error) {
            // Handle other errors (e.g., network issues)
            alert('An unexpected error occurred.');
            console.error('Unexpected error during booking creation:', error);
        }
    };

    return (

        <Grid container component="main" sx={{ height: '50vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${hotel.picture})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {hotel.name}
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <ul className="mt-1 mb-5 space-y-1 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:gap-y-5">
                            <li className="flex  spacitems-start lg:col-span-1">
                                <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="10" r="3" />
                                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                    </svg>

                                </div>
                                <p className="line-clamp-2">{hotel.address} {hotel.district} {hotel.province} {hotel.postalcode}</p>
                            </li>
                            <li className="flex items-start lg:col-span-1">
                                <div className="flex-shrink-0 mr-2">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <p className="line-clamp-2">{hotel.tel}</p>
                            </li>
                        </ul>
                        <div className='mb-3'>
                            <FormControl required fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Booking Date" value={bookingDate} onChange={(value) => { setBookingDate(value) }} />
                                </LocalizationProvider>
                            </FormControl>
                        </div>
                        <div className='mb-3'>
                            <FormControl required fullWidth >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Checkout Date" value={checkoutDate} onChange={(value) => { setCheckoutDate(value) }} />
                                </LocalizationProvider>
                            </FormControl>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reserve
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
