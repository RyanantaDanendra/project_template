"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

//logo source
import Logo from "../../public/Assets/logo.png";
import { start } from "repl";

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [layananDropDown, setLayananDropDOwn] = useState(false);
  const [mediaDropdown, setMediaDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // set to false if width is less than 1000
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1000);
    };

    // calls the function
    checkWidth();

    // add resize listener
    window.addEventListener("resize", checkWidth);

    // remove event listener
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const openMenu = () => {
    const menu = document.getElementById("menu-wrapper");

    if (!isOpen) {
      gsap.to(menu, {
        y: 368,
        opacity: 1,
      });
      setIsOpen(true);
    } else {
      gsap.to(menu, {
        y: 0,
        opacity: 1,
        delay: 0.4,
      });
      if (layananDropDown || mediaDropdown) {
        setLayananDropDOwn(false);
        setMediaDropdown(false);
        openDropdown();
      }
      setIsOpen(false);
    }
  };

  const openDropdown = () => {
    const dropdown = document.getElementById("menu-dropdown");
    const links = document.querySelectorAll(".link");
    const linkDropdown = document.getElementById("link-dropdown");

    if (mediaDropdown) {
      setMediaDropdown(false);
      openMediaDropdown();
    }

    if (!layananDropDown) {
      gsap.to(dropdown, {
        height: 44.8,
      });
      gsap.to(links, {
        height: 44.8,
      });
      gsap.to(links[1], {
        marginTop: 180,
      });
      setLayananDropDOwn(true);
    } else {
      gsap.to(dropdown, {
        height: 44.8,
        alignItems: "center",
      });
      gsap.to(links[1], {
        marginTop: 0,
      });
      setLayananDropDOwn(false);
    }
  };

  const openMediaDropdown = () => {
    const dropdown = document.getElementById("media-dropdown");
    const links = document.querySelectorAll(".link");
    const linkDropdown = document.getElementById("link-dropdown");

    if (layananDropDown) {
      setLayananDropDOwn(false);
      openDropdown();
    }

    if (!mediaDropdown) {
      gsap.to(dropdown, {
        height: 44.8,
      });
      gsap.to(links, {
        height: 44.8,
      });
      gsap.to(links[3], {
        marginTop: 89,
      });
      setMediaDropdown(true);
    } else {
      gsap.to(dropdown, {
        height: 44.8,
        alignItems: "center",
      });
      gsap.to(links[3], {
        marginTop: 0,
      });
      setMediaDropdown(false);
    }
  };

  if (isDesktop) {
    return (
      <nav className="w-screen h-32 bg-white">
        <h1>hello world</h1>
      </nav>
    );
  } else {
    return (
      <nav className="fixed top-0 ">
        <div className="nav-wrapper w-screen flex justify-between pe-4 shadow-gray-400 shadow-sm bg-white">
          <Image src={Logo} alt="Logo" width={80} height={80} />
          <button onClick={openMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-7"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </div>
        {/* menu list */}
        <div
          id="menu-wrapper"
          className={`menu-wrapper w-screen ${
            layananDropDown
              ? `h-[403.2px]`
              : mediaDropdown
              ? `h-[313.6px]`
              : `h-56`
          } bg-[#015fc4] absolute -top-72`}
        >
          <div className="link w-full h-[44.8px] flex items-center hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out ">
            <Link href="">
              <p className="ms-4">Home</p>
            </Link>
          </div>
          <div
            id="menu-dropdown"
            className={`w-full h-[44.8px] flex items-center hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out gap-2 relative`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href="" id="link-dropdown w-full h-[44.8]]">
              <p className="ms-4">Layanan Kami</p>
            </Link>
            <svg
              onClick={openDropdown}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="w-3"
            >
              <path
                id="iconPath"
                className={isHovered ? `fill-black` : `fill-white`}
                d="M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"
              />
            </svg>
            <div
              className={`extended-menu absolute top-[45px] text-white ${
                layananDropDown ? `visible` : `invisible`
              }`}
            >
              <div className="w-screen h-[44.8px] hover:bg-[#feda00] hover:text-black flex items-center">
                <Link href="" className="ms-5">
                  Manajemen Tambang
                </Link>
              </div>
              <div className="w-screen h-[44.8px] hover:bg-[#feda00] hover:text-black flex items-center">
                <p className="ms-5">Kegiatan Eksplorasi</p>
              </div>
              <div className="w-screen h-[44.8px] hover:bg-[#feda00] hover:text-black flex items-center">
                <p className="ms-5">Lingkungan</p>
              </div>
              <div className="w-screen h-[44.8px] hover:bg-[#feda00] hover:text-black flex items-center">
                <p className="ms-5">Air Tanah</p>
              </div>
            </div>
          </div>
          <div className="link w-full h-[44.8px] flex items-center hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out">
            <Link href="">
              <p className="ms-4">Tentang Kami</p>
            </Link>
          </div>
          <div
            id="media-dropdown"
            className="link w-full h-[44.8px] flex items-center hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out gap-2 relative"
          >
            <Link href="">
              <p className="ms-4">Media</p>
            </Link>
            <svg
              onClick={openMediaDropdown}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="w-3"
            >
              <path
                className="fill-white hover:fill-black"
                d="M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"
              />
            </svg>
            <div
              className={`extended-menu absolute top-[45px] text-white ${
                mediaDropdown ? `visible` : `invisible`
              }`}
            >
              <div className="w-screen h-[44.8px] hover:bg-[#feda00] hover:text-black flex items-center">
                <Link href="" className="ms-5">
                  Manajemen Tambang
                </Link>
              </div>
              <div className="w-screen h-[44.8px] hover:bg-[#feda00] hover:text-black flex items-center">
                <p className="ms-5">Kegiatan Eksplorasi</p>
              </div>
            </div>
          </div>
          <div className="link w-full h-[44.8px] flex items-center hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out">
            <Link href="">
              <p className="ms-4">Kontak</p>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
};
export default Navbar;
