import Link from 'next/link';

export default function Stockcodes() {
  return (
    <main>
      <h1 className="font-bold">Manage Stockcodes</h1> <br />
      <ul>
        <li><Link href="/stockcodes/addemc">Register New Part Number</Link></li>
        <li><Link href="/stockcodes/searchemc">Search Part Number</Link></li>
        <li><Link href="/stockcodes/editemc">Edit Data</Link></li>
        <li><Link href="/stockcodes/deleteemc">Delete Part Number</Link></li> <br />
        <li><Link href="/dashboard">Back to Dashboard</Link></li>
      </ul>
    </main>
  );
}
