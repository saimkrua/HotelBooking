"use client"
import { Hotel } from "@/interface"
import createHotel from "@/libs/createHotel"
import { TextField, Container, Button, Link, Typography, Stack, ThemeProvider } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { redirect, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { useSession } from 'next-auth/react';
import editHotel from "@/libs/editHotel"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import deleteHotel from "@/libs/deleteHotel"
import { theme } from "./MuiThemeProvider"

export default function EditHotelForm({ hotel }: { hotel: Hotel }) {

    const { data: session, status } = useSession()
    if (!session) {
        redirect("/signin");
    }
    const router = useRouter();
    const initName = hotel.name
    const initAdress = hotel.address
    const initDistrict = hotel.district
    const initProvince = hotel.province
    const initPostalcode = hotel.postalcode
    const initTel = hotel.tel
    const initPicture = hotel.picture

    const [name, setName] = useState<string | null>(initName);
    const [address, setAddress] = useState<string | null>(initAdress);
    const [district, setDistrict] = useState<string | null>(initDistrict);
    const [province, setProvince] = useState<string | null>(initProvince);
    const [postalcode, setPostalCode] = useState<string | null>(initPostalcode);
    const [tel, setTel] = useState<string | null>(initTel);
    const [picture, setPicture] = useState<string | null>(initPicture);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name && address && district && province && postalcode && tel && picture) {
            if (!hotel?.id) {
                throw new Error('Invalid hotel ID');
            }

            const item: Hotel = {
                name,
                address,
                district,
                province,
                postalcode,
                tel,
                picture,
            };

            const result = await editHotel(session, hotel.id, item);

            if (result.success) {
                router.push('/home');
            } else {
                // Handle error
                alert(result.error?.message)
                console.error('Hotel update failed:', result.error?.message || 'An unexpected error occurred.');
                // Show user-friendly feedback, e.g., set an error state or display an alert
            }
        } else {
            alert("All fields are required")
            // Show an error or alert to indicate that all fields are required
            console.error('All fields are required');
        }

    };

    const handleDelete = async () => {
        if (!hotel.id) {
            throw new Error('Invalid booking ID');
        }
        const result = await deleteHotel(session, hotel.id);

        if (result && !result.error) {
            router.push("/home");
        } else {
            alert("Error deleting home")
            console.error('Error deleting home');
        }
    };


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
                <Typography component="h1" variant="h5">
                    Edit Hotel
                </Typography>
                <Box className="flex flex-col items-center" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                value={name}
                                onChange={(e) => { setName(e.target.value as string) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="address"
                                label="Address"
                                id="address"
                                autoComplete="address"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value as string) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="district"
                                label="District"
                                id="district"
                                autoComplete="district"
                                value={district}
                                onChange={(e) => { setDistrict(e.target.value as string) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="province"
                                label="Province"
                                id="province"
                                autoComplete="province"
                                value={province}
                                onChange={(e) => { setProvince(e.target.value as string) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="postalcode"
                                label="Postal code"
                                id="postalcode"
                                autoComplete="postalcode"
                                value={postalcode}
                                onChange={(e) => { setPostalCode(e.target.value as string) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="tel"
                                label="Phone number"
                                name="tel"
                                autoComplete="tel"
                                value={tel}
                                onChange={(e) => { setTel(e.target.value as string) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="picture"
                                label="Picture"
                                name="picture"
                                autoComplete="picture"
                                value={picture}
                                onChange={(e) => { setPicture(e.target.value as string) }}
                            />
                        </Grid>
                    </Grid>
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
        </Container>
        </ThemeProvider>
    )
}