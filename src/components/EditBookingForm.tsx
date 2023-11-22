"use client"
import { useState, FormEvent, ChangeEvent } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormControl, Grid, Paper, Stack } from '@mui/material';
import { BookingItem, Hotel } from '@/interface';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import createBooking from '@/libs/createBooking';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import editBooking from '@/libs/editBooking';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import deleteBooking from '@/libs/deleteBooking';

export default function BookingForm({ book }: { book: BookingItem }) {
    const { data: session, status } = useSession()
    if (!session) {
        redirect("/signin");
    }

    const initBookingDate = dayjs(book.bookingDate);
    const initCheckoutDate = dayjs(book.checkoutDate);
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(initBookingDate);
    const [checkoutDate, setCheckoutDate] = useState<Dayjs | null>(initCheckoutDate);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!book._id) {
            throw new Error('Invalid booking ID');
        }

        if (
            dayjs(book.bookingDate).format('YYYY/MM/DD') !== dayjs(bookingDate).format('YYYY/MM/DD') ||
            dayjs(book.checkoutDate).format('YYYY/MM/DD') !== dayjs(checkoutDate).format('YYYY/MM/DD')
        ) {
            const item: BookingItem = {
                bookingDate: dayjs(bookingDate).format('YYYY/MM/DD'),
                checkoutDate: dayjs(checkoutDate).format('YYYY/MM/DD'),
            };

            const result = await editBooking(session, book._id, item);

            if (result.success) {
                router.push('/booking',{ shallow: false });
            } else {
                alert(result.error?.message || 'An unexpected error occurred while updating the booking.');
                console.error('Booking update failed:', result.error?.message);
            }
        } else {
            alert('Booking date or checkout date is not modified');
            console.error('Booking date or checkout date is not modified');
            // You might want to inform the user that no changes were made
        }

    };


    const handleDelete = async () => {
        if (!book._id) {
            throw new Error('Invalid booking ID');
        }
        const result = await deleteBooking(session, book._id);

        if (result && !result.error) {
            router.push("/booking");
        } else {
            console.error('Error deleting booking:');
        }
    };

    return (

        <Box
            sx={{
                my: 3,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box component="form" noValidate onSubmit={handleSubmit}>

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
                <Stack direction="row" spacing={2} padding={2}>
                    <Button onClick={handleDelete} size="medium" variant="contained" color="error" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                    <Button type="submit" size="medium" variant="contained" startIcon={<EditIcon />}>
                        Save
                    </Button>

                </Stack>
            </Box>
        </Box>
    );
}
