import Link from 'next/link';

export default function Dashboard() {
  return (
    <main>
      <h1 className="font-bold">Welcome to Dashboard</h1> <br />
      <nav>
        <ul>
          <li><Link href="/stockcodes">Manage Stockcodes</Link></li>
        </ul>
      </nav>
    </main>
  );
}
