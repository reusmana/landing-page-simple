"use client";
import Image from "next/image";
import logo from "../assets/logo.webp";
import phone from "../assets/phone.webp";
import { Tilt } from "react-tilt";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Key } from "react";
import { useQuery } from "@apollo/client";
import { GET_STATION, STATION_DETAIL } from "@/graphql/queries";
import apolloClient from "../lib/apolloClient";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const Home = () => {
  const { data } = useQuery(GET_STATION);
  const position = { lng: 106.8039106, lat: -6.2246691 };
  return (
    <main className="relative bg-green-800  ">
      <nav className="sticky z-[9999] top-10  lg:top-16  max-w-screen-xl w-full bg-purple-300 rounded-full mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex gap-2 items-center pl-4">
          <Image src={logo} alt="image" width={100} height={40} />
          <ul className=" items-center gap-1 pl-4 lg:flex hidden">
            <li className="hover:bg-slate-100 bg-transparent px-4 py-2 hover:text-slate-700 rounded-lg">
              Templates
            </li>
            <li className="hover:bg-slate-100 bg-transparent px-4 py-2 hover:text-slate-700 rounded-lg">
              Marketplace
            </li>
            <li className="hover:bg-slate-100 bg-transparent px-4 py-2 hover:text-slate-700 rounded-lg">
              Discover
            </li>
            <li className="hover:bg-slate-100 bg-transparent px-4 py-2 hover:text-slate-700 rounded-lg">
              Pricing
            </li>
            <li className="hover:bg-slate-100 bg-transparent px-4 py-2 hover:text-slate-700 rounded-lg">
              Learn
            </li>
            <li className="hover:bg-slate-100 bg-transparent px-4 py-2 hover:text-slate-700 rounded-lg">
              Search
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-3 ">
          <button className="md:px-6 sm:px-5 px-4 lg:px-8 lg:py-5 md:py-2 rounded-md bg-slate-200 text-slate-700">
            Log in
          </button>
          <button className="md:px-6 sm:px-5 px-4 lg:px-8 lg:py-5 md:py-2 rounded-full bg-black text-white">
            Sign in free
          </button>
        </div>
      </nav>
      <section className="min-h-screen grid lg:gap-0 gap-20 lg:grid-cols-2 bg-green-800  max-w-screen-2xl mx-auto my-24 lg:my-10">
        <div className="flex flex-col justify-center lg:px-20 px-5 gap-7 flex-wrap">
          <h1 className=" text-lime-200 xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold text-wrap">
            Everything you are. In one, simple link in bio.
          </h1>
          <p className="text-lime-300 lg:text-2xl sm:text-xl text-base">
            Join 40M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className="flex flex-row gap-5 items-center flex-wrap w-full">
            <div className="flex relative w-full">
              <p className="absolute top-5 left-10 text-slate-700 ">
                linktr.ee/
              </p>
              <input
                type="text"
                placeholder="reusmana"
                className="pr-5 py-5 rounded-lg text-slate-500 pl-[106px] focus:ring-0 outline-none w-full"
              />
            </div>
            <button className="px-10 py-5 bg-purple-300 rounded-full text-white text-base lg:text-xl font-semibold w-full">
              Claim your charger
            </button>
          </div>
        </div>
        <div className="flex w-full h-full justify-center items-center">
          <Tilt className="max-w-[420px] max-h-[400px] w-full h-full">
            <Image src={phone} alt="phone" />
          </Tilt>
        </div>
      </section>

      {/* custom your graphql */}
      <section className="min-h-screen bg-green-800 flex justify-center items-center gap-5 py-32 ">
        <div className="w-full">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            {data?.publicChargeStation?.map(
              (val, key: Key | null | undefined) => {
                const { coordinates } = val;
                return (
                  <SwiperSlide key={key} className="my-20 xl:mx-20">
                    <Tilt
                      key={key}
                      className="max-w-lg w-full rounded-lg h-96 bg-green-300 border-green-900 border-2  overflow-hidden p-5 pb-20"
                    >
                      <table className="my-2">
                        <tr>
                          <td className="text-slate-700 text-base font-semibold">
                            Name
                          </td>
                          <td className="text-slate-700 text-base font-semibold">
                            :
                          </td>
                          <td className="text-slate-700 text-base font-semibold">
                            {val.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-slate-700 text-base font-semibold">
                            Location
                          </td>
                          <td className="text-slate-700 text-base font-semibold">
                            :
                          </td>
                          <td className="text-slate-700 text-base font-semibold">
                            {val.state.slice(0, 20)} ...
                          </td>
                        </tr>
                      </table>
                      <APIProvider apiKey="AIzaSyD4dcibVLUdr_7esjtrWpsqBNGcHhMprpA">
                        <div className="w-full h-full">
                          <Map
                            zoom={12}
                            center={{
                              lng: coordinates.coordinates[0],
                              lat: coordinates.coordinates[1],
                            }}
                            mapId={`4bcf5eb555063da8`}
                          >
                            <AdvancedMarker
                              position={{
                                lng: coordinates.coordinates[0],
                                lat: coordinates.coordinates[1],
                              }}
                            ></AdvancedMarker>
                          </Map>
                        </div>
                      </APIProvider>
                    </Tilt>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </div>
      </section>
    </main>
  );
};

export default apolloClient(Home);
