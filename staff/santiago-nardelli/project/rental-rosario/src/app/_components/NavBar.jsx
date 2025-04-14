import { Link, Image } from 'next/link';
export default function NavBar(){
    return (
        <nav style={{ backgroundColor: "#f8f9fa", padding: "10px" }}>
            <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
                <li style={{ marginRight: "20px" }}>
                    <Link href="/dashboard">
                        <Image
                            src="/path-to-your-logo/dashboard-icon.png"
                            alt="Dashboard"
                            style={{ width: "20px", height: "20px" }}
                        />
                    </Link>
                </li>
                <li style={{ marginRight: "20px" }}>
                    <Link href="/rental">Home</Link>
                </li>
                <li style={{ marginRight: "20px" }}>
                    <Link href="/propieties">Propiedades</Link>
                </li>
            </ul>
        </nav>
    );
}