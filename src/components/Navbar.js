"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const [activeMenu, setActiveMenu] = useState(null);

  const actionHandler = () => {
    setActiveMenu(activeMenu === "action" ? null : "action");
  };

  const reportHandler = () => {
    setActiveMenu(activeMenu === "report" ? null : "report");
  };


  // Stop menu from closing when clicking inside it
  const handleSubMenuClick = (event) => {
    event.stopPropagation();
  };


  // Define routes where Navbar should be hidden
  const showPickUpNavOption = ['/pickup'];
  const showDropOffNavOption = ['/dropoff'];

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

        <li className='nav-item'><Link href="/dropoff">Dropoff</Link></li>
        <li className='nav-item'><Link href="/pickup">Pickup</Link></li>

        {
          showDropOffNavOption.includes(pathname)

            ?
            <>
              <li onClick={() => actionHandler()} className='nav-item'>Action

                <div
                  className={activeMenu === "action" ? "subMenuContainer" : "subMenuHide"}
                  onClick={handleSubMenuClick}
                >
                  <div className="subMenu">
                    <span>SENT TO EMBASSY</span>
                    <span>UPLOAD DHL REPORT</span>
                  </div>
                </div>
              </li>

            </>
            
            :


            <li onClick={() => actionHandler()} className='nav-item'>Action

              <div
                className={activeMenu === "action" ? "subMenuContainer" : "subMenuHide"}
                onClick={handleSubMenuClick}
              >
                <div className="subMenu">
                  <span>Received From Embassy</span>
                  <span>Passport Not Received</span>
                  <span>Ready For Pickup</span>
                  <span>Deliver To DHL</span>
                  <span>Return To Embassy</span>

                </div>
              </div>
            </li>

        }

        {
          showDropOffNavOption.includes(pathname)

            ?

            <li onClick={reportHandler} className='nav-item'>Report
              <div
                className={activeMenu === "report" ? "subMenuContainer" : "subMenuHide"}
                onClick={handleSubMenuClick}
              >
                <div className="subMenu">
                  <span>DROPOFF/ COLLECTION REPORT</span>
                  <span>OFFICER REPORT OIS</span>
                  <span>OFFICER REPORT DHL</span>
                </div>
              </div>
            </li>

            :

            <li onClick={reportHandler} className='nav-item'>Report
            <div
              className={activeMenu === "report" ? "subMenuContainer" : "subMenuHide"}
              onClick={handleSubMenuClick}
            >
              <div className="subMenu">
                <span>DROPOFF/ COLLECTION REPORT</span>
                <span>OFFICER REPORT OIS</span>
                <span>OFFICER REPORT DHL</span>
              </div>
            </div>
          </li>



        }
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
