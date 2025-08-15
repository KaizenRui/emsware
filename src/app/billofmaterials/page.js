
"use client";
import Link from "next/link";

export default function billofmaterials() {
  return (
    <main>
      <h1 className="font-bold">TEST STRINGS</h1> <br />
      <nav>
        <ul>
          <li><Link href="/billofmaterials/uploadbom">Upload Bill of Material</Link></li>
        </ul>
      </nav> <br />
      <div>
        <Link href="/dashboard">Back to Dashboard</Link>
      </div>
    </main>
  );
}
