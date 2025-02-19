"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signIn } from "next-auth/react";
import "../utils/popup.css";

export const Navbar = () => {
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  const actionHandler = () => {
    if (!session) return setShowPopup(true);
    setActiveMenu(activeMenu === "action" ? null : "action");
  };

  const reportHandler = () => {
    if (!session) return setShowPopup(true);
    setActiveMenu(activeMenu === "report" ? null : "report");
  };

  const handleSearch = (event) => {
    if (!session) return setShowPopup(true);
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/applicationdetail?trackingCode=${searchValue}`);
    }
  };

  const handleUnauthorizedClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        <li className={`nav-item ${!session ? "disabled" : ""}`}>
          {session ? (
            <Link href="/dropoff">Dropoff</Link>
          ) : (
            <span onClick={handleUnauthorizedClick}>Dropoff</span>
          )}
        </li>

        <li className={`nav-item ${!session ? "disabled" : ""}`}>
          {session ? (
            <Link href="/pickup">Pickup</Link>
          ) : (
            <span onClick={handleUnauthorizedClick}>Pickup</span>
          )}
        </li>

        <li onClick={actionHandler} className={`nav-item ${!session ? "disabled" : ""}`}>
          Action
          {session && activeMenu === "action" && (
            <div className="subMenuContainer">
              <div className="subMenu">
                {pathname === "/dropoff" ? (
                  <>
                    <span>SENT TO EMBASSY</span>
                    <span>UPLOAD DHL REPORT</span>
                  </>
                ) : (
                  <>
                    <span>Received From Embassy</span>
                    <span>Passport Not Received</span>
                    <span>Ready For Pickup</span>
                    <span>Deliver To DHL</span>
                    <span>Return To Embassy</span>
                  </>
                )}
              </div>
            </div>
          )}
        </li>

        <li onClick={reportHandler} className={`nav-item ${!session ? "disabled" : ""}`}>
          Report
          {session && activeMenu === "report" && (
            <div className="subMenuContainer">
              <div className="subMenu">
                <span>DROPOFF/ COLLECTION REPORT</span>
                <span>OFFICER REPORT OIS</span>
                <span>OFFICER REPORT DHL</span>
              </div>
            </div>
          )}
        </li>

        <input
          className={`searchInput ${!session ? "disabled" : ""}`}
          type='search'
          placeholder='Search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          disabled={!session}
        />
      </ul>

      {/* Unauthorized Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>You must sign in to access this page.</p>
            <button onClick={() => signIn("keycloak", { prompt: "login" })}>Sign In</button>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};
