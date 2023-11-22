import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BookingItem } from "@/interface"

type BookState = {
    bookingItems: BookingItem[]
}

const initialState: BookState = { bookingItems: [] }
export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookingItems = [action.payload]
        },
        removeBooking: (state) => {
            state.bookingItems = []
        }
    }

})

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer