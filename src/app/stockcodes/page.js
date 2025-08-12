import Link from 'next/link';

export default function Stockcodes() {
  return (
    <main>
      <h1 className="font-bold">Manage Stockcodes</h1> <br />
      <ul>
        <li><Link href="/stockcodes/addemc">Add EMC Stockcode</Link></li>
        <li><Link href="/stockcodes/searchemc">Search EMC Stockcode</Link></li>
        <li><Link href="/stockcodes/editemc">Edit EMC Stockcode</Link></li>
        <li><Link href="/stockcodes/delete">Delete EMC Stockcode</Link></li> <br />
        <li><Link href="/dashboard">Back to Dashboard</Link></li>
      </ul>
    </main>
  );
}
