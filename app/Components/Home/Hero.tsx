"use client";

import Image from "next/image";
import Hero1 from "../../../public/Assets/hero.jpg";
import Hero2 from "../../../public/Assets/hero2.jpg";
import Hero3 from "../../../public/Assets/Hero3.jpg";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect } from "react";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const covers = [Hero1, Hero2, Hero3];

  useEffect(() => {
    const images = gsap.utils.toArray(".image");

    gsap.set(images, { opacity: 0, inset: 0 });
    gsap.set(images[0], { opacity: 1 });

    const tl = gsap.timeline({ repeat: -1 });

    images.forEach((img, index) => {
      const next = images[index + 1] || images[0];

      tl.to(
        img,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "+=5"
      ).to(
        next,
        {
          opacity: 1,
          duration: 0.5,
        },
        "<"
      );
    });
  }, []);

  useEffect(() => {
    let split = SplitText.create(".hero-title", {
      type: "chars",
    });

    gsap.from(split.chars, {
      duration: 0.5,
      y: 100, // animate from 100px below
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.05,
    });
    return () => split.revert();
  });

  return (
    <>
      {covers.map((cover, index) => (
        <Image
          key={index}
          src={cover}
          alt="Hero Image"
          fill
          className="image object-cover -z-50"
        />
      ))}
      <div
        className="w-screen h-screen bg-black absolute top-0
       opacity-40 -z-50"
      ></div>
      <h1
        className="hero-title text-5xl lg:text-[5rem] font-bold lg:mt-28 mt-64 ms-10 lg:w-245"
        style={{ fontFamily: "var(--font-sora)" }}
      >
        STELLA BALI.
      </h1>
      <h2 className="text-2xl ms-10">
        Relaxed silhouettes made for sun, <br />
        sea, and slow summer days.
      </h2>
      <div className="button-wrapper mt-8 ms-10">
        <button className="w-40 h-20 bg-[#FF6B6B] text-white rounded-lg">
          Explore
        </button>
        <button className="w-40 h-20 bg-transparent border-2 border-[#FF6B6B] ms-6">
          Contact Us
        </button>
      </div>
    </>
  );
};
export default Hero;
