import { BookingItem } from "@/interface";
import BookingCard from "./BookingCard";
import Link from "next/link";

export default async function BookingCatalog({ books }: { books: BookingItem[] }) {

    const bookList = await books

    return (
        <div className="bg-inherit mt-28 max-w-screen-xl felx flex-row mx-20">
            {

                bookList.map((book: BookingItem) => (
                    // <Link href={`/booking/${book._id}`}>
                        <BookingCard
                            Book={book}
                        />
                    // </Link>
                ))
            }
        </div>
    )
}