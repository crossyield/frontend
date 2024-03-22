/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const Header = () => {
  return (
    <div className="justify-center items-center flex flex-col border-b-2 border-zinc-500 dropshadow">
      <div className="max-w-screen-2xl navbar bg-transparent h-[95px]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-3 z-[1] p-2 mx-4 shadow bg-base-100 rounded-box w-52 font-bold"
            >
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>

              <li>
                <a href="/repay">Repay</a>
              </li>
            </ul>
          </div>
          <a href="/">
            <img
              src="/logo.png"
              className="lg:max-w-[50%] w-[80%] md:max-w-[40%] h-full"
              alt="logo"
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold gap-4">
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>

            <li>
              <a href="/repay">Repay</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ConnectWallet
            theme={"dark"}
            modalTitle={"CrossYield"}
            switchToActiveChain={true}
            modalSize={"compact"}
            modalTitleIconUrl={"/favicon.ico"}
            showThirdwebBranding={false}
            hideTestnetFaucet={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
