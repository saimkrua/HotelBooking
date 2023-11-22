import Link from "next/link"

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {
    return (
        <Link className="block px-4 py-2 p text-black hover:font-medium transition duration-00 ease-in-out" href={pageRef}>
            {title}
        </Link>
    );
}

