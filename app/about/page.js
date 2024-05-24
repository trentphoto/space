import Link from "next/link";

export default function AboutPage() {
    return (
        <div>
            <h1 className="font-bold text-2xl">About</h1>
            <p className="my-4">
                A simple demo application that uses the SpaceX API to display information about SpaceX launches.
            </p>
            <p>By <Link href="https://jamestrent.net" className="text-blue-500 hover:underline">James Trent</Link></p>
        </div>
    );
}