import { List } from "postcss/lib/list";
import ProductCard from "./ProductCard"
import Link from "next/link";
import { Hotel } from "@/interface";

export default async function HotelCatalog({ hotels }: { hotels: Hotel[] }) {

    const hotelList = await hotels

    return (
        <div className="bg-inherit w- felx row-auto">
            {
                hotelList.map((hotel: Hotel) => (
                    // <Link href={`/booking/reserve/${hotel.id}`}>
                        <ProductCard
                            hotel={hotel}
                        />
                    // </Link>
                ))
            }
        </div>
    )
}