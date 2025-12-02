"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

import data from "../Datas/Categories.json";

//logo source
import Logo from "../../public/Assets/logo.png";
import { start } from "repl";
import { TIMEOUT } from "dns";

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState("");

  const categories = data.categories;

  const menCategories = ["Tops", "Bottoms", "Swimwear", "Accesories"];

  const mensTops = ["T-Shirt", "Tank Top", "Linen Shirt", "Short Sleeve Shirt"];

  const mensBottoms = [
    "Beach Shorts",
    "Casual Shorts",
    "Linen Pants",
    "Relaxed Fit Pants",
  ];

  useEffect(() => {
    // set to false if width is less than 1000
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1000);
    };

    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkWidth, 150);
    };

    // calls the function
    checkWidth();

    // add resize listener
    window.addEventListener("resize", handleResize);

    // remove event listener
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const openMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) setActiveDropDown("");
  };

  const toggleDropDwon = (dropdown: string) => {
    setActiveDropDown(activeDropDown === dropdown ? "" : dropdown);
  };

  if (isDesktop) {
    return (
      <nav className="fixed top-0">
        <div className="nav-wrapper w-screen h-24 flex justify-between items-center pe-4 shadow-gray-400 shadow-sm bg-white">
          <Image src={Logo} alt="Logo" className="w-32 h-32" />
          <div className="links flex gap-4 items-center">
            {categories.map((category, index) => (
              <Link
                href=""
                className=" flex gap-1 h-24 items-center"
                onMouseEnter={() => setActiveDropDown(category.name)}
                onMouseLeave={() => setActiveDropDown("")}
              >
                <p>{category.name}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="w-3"
                >
                  <path
                    id="iconPath"
                    className="fill-black"
                    d="M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"
                  />
                </svg>
                <div
                  className={`extended-menu w-screen absolute top-[98px] flex gap-5 justify-center left-0 transition-all duration-200 ease-out mt-3 ${
                    activeDropDown == category.name
                      ? `visible opacity-100 h-[179.2px]`
                      : `invisible opacity-0 h-0`
                  }`}
                  style={{ color: "var(--text-color)" }}
                >
                  <div className="h-full flex gap-6">
                    {category.subcategories.map((subcategory, index) => (
                      <div className="flex flex-col gap-2">
                        <Link href="" className="ms-5 font-bold">
                          {subcategory.name}
                        </Link>

                        <ul>
                          {subcategory.items.map((item, index) => (
                            <li className="ms-5 mt-2">
                              <Link href="">{item}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="links flex gap-4">
            <Link href="">
              <p>About Us</p>
            </Link>
            <Link href="">
              <p>Kontak</p>
            </Link>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="fixed top-0">
        <div
          className={`nav-wrapper w-screen flex justify-between pe-4 shadow-gray-400 shadow-sm bg-white`}
        >
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
          className={`menu-wrapper w-screen duration-200 ease-out transition-all -z-12 ${
            activeDropDown == "mens"
              ? `h-[403.2px]`
              : activeDropDown == "womans"
              ? `h-[448px]`
              : activeDropDown == "accesories"
              ? `h-[448px]`
              : `h-56`
          } bg-[#015fc4] absolute ${isOpen ? `top-20` : `-top-56`}`}
        >
          <div className="link w-full h-[44.8px] flex items-center hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out ">
            <Link href="">
              <p className="ms-4">Mens</p>
            </Link>
            <svg
              onClick={() => toggleDropDwon("mens")}
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
              className={`extended-menu bg-[#015fc4] absolute top-[45px] text-white ${
                activeDropDown == "mens" ? `visible` : `invisible`
              }`}
            >
              {categories
                .find((cat) => cat.name == "Mens")
                ?.subcategories.map((sub) => (
                  <div className="w-screen h-[44.8px] hover:bg-[#feda00] hover:text-black flex items-center">
                    <Link href="" className="ms-5">
                      {sub.name}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <div
            id="menu-dropdown"
            className={`w-full h-[44.8px] flex items-center  hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out gap-2 relative ${
              activeDropDown == "mens" ? `mt-[179.2px]` : `mt-0`
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href="" id="link-dropdown w-full h-[44.8]]">
              <p className="ms-4">Womans</p>
            </Link>
            <svg
              onClick={() => toggleDropDwon("womans")}
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
              className={`extended-menu bg-[#015fc4] absolute top-[45px] text-white ${
                activeDropDown == "womans" ? `visible` : `invisible`
              }`}
            >
              {categories
                .find((cat) => cat.name == "Womans")
                ?.subcategories.map((sub) => (
                  <div className="w-screen h-[44.8px] hover:bg-[#feda00] hover:text-black flex items-center">
                    <Link href="" className="ms-5">
                      {sub.name}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <div
            className={`link w-full h-[44.8px] flex items-center hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out relative ${
              activeDropDown === "womans" ? `mt-56` : `mt-0`
            }`}
          >
            <Link href="">
              <p className="ms-4">Accesories</p>
            </Link>
            <svg
              onClick={() => toggleDropDwon("accesories")}
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
              className={`extended-menu bg-[#015fc4] absolute top-[45px] text-white ${
                activeDropDown == "accesories" ? `visible` : `invisible`
              }`}
            >
              {categories
                .find((cat) => cat.name == "Accesories")
                ?.subcategories.map((sub) => (
                  <div className="w-screen h-[44.8px] hover:bg-[#feda00] hover:text-black flex items-center">
                    <Link href="" className="ms-5">
                      {sub.name}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <div
            className={`link w-full h-[44.8px] flex items-center hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out gap-2 relative ${
              activeDropDown == "accesories" ? `mt-56` : `mt-0`
            }`}
          >
            <Link href="">
              <p className="ms-4">About Us</p>
            </Link>
          </div>
          <div
            className={`link w-full h-[44.8px] flex items-center hover:bg-[#feda00] hover:text-black transition-all duration-100 ease-out ${
              activeDropDown == "media" ? `mt-[89.6px]` : `mt-0`
            }`}
          >
            <Link href="">
              <p className="ms-4">Contact</p>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
};
export default Navbar;
