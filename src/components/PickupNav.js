"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const PickupNav = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/applicationdetail?trackingCode=${searchValue}`);
    }
  };

  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        {/* <li className='nav-item'><Link href="/dashboard">Dashboard</Link></li> */}
        <li className='nav-item'><Link href="/action">P-Action</Link></li>
        <li className='nav-item'><Link href="/dropoff">Dropoff</Link></li>
        <li className='nav-item'><Link href="/pickup">Pickup</Link></li>
        <li className='nav-item'><Link href="/report">P-Report</Link></li>
        {/* <li className='nav-item'><Link href="/appointment">Appointment</Link></li> */}
        <input
          className='searchInput'
          type='search'
          placeholder='Search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
        />
      </ul>
    </nav>
  );
};
