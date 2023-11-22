"use client"
import { Hotel } from "@/interface"
import createHotel from "@/libs/createHotel"
import { TextField, Container, Button, Link, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { redirect, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { useSession } from 'next-auth/react';
import { revalidateTag } from "next/cache"

export default function HotelForm() {

    const { data: session, status } = useSession()
    if (!session) {
        redirect("/signin");
    }
    const router = useRouter();

    const [name, setName] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [district, setDistrict] = useState<string | null>(null);
    const [province, setProvince] = useState<string | null>(null);
    const [postalcode, setPostalCode] = useState<string | null>(null);
    const [tel, setTel] = useState<string | null>(null);
    const [picture, setPicture] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && address && district && province && postalcode && tel && picture) {
            const item: Hotel = {
                name,
                address,
                district,
                province,
                postalcode,
                tel,
                picture,
            };
            const result = await createHotel(session, item);

            if (result.success) {
                router.push("/");
            } else {
                alert(result.error?.message)
                console.error('hotel creation failed:', result.error?.message || 'An unexpected error occurred.');
            }
        } else {
            alert("All fields are required")
            // Show an error or alert to indicate that all fields are required
            console.error('All fields are required');
        }

    };


    return (
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
                    Create New Hotel
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}