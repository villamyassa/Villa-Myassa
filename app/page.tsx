"use client";

import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ReservationMenu() {
  const [open, setOpen] = useState(false);

  const platforms = [
    {
      name: "Bestay (site partenaire)",
      logo: "/logos/bestay.svg",
      url: "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336",
    },
    {
      name: "Airbnb",
      logo: "/logos/airbnb.svg",
      url: "https://www.airbnb.com/rooms/1505417552730386824",
    },
    {
      name: "Booking.com",
      logo: "/logos/booking.svg",
      url: "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html",
    },
    {
      name: "Trip.com",
      logo: "/logos/trip.svg",
      url: "https://fr.trip.com/hotels/detail/?cityEnName=Bali&cityId=723&hotelId=131766860",
    },
    {
      name: "WingOnTravel",
      logo: "/logos/wingontravel.svg",
      url: "https://www.wingontravel.com/hotel/detail-bali-131766860/villa-myassa-by-balisuperhost/",
    },
    {
      name: "Réservation directe",
      logo: "/logos/direct.svg",
      url: "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336",
    },
  ];

  return (
    <div className="relative flex justify-center md:justify-end">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setOpen(!open)}
            variant="default"
            size="lg"
            className="flex items-center gap-2 rounded-full bg-black text-white px-5 py-2 hover:bg-gray-800"
          >
            <Image
              src="/logos/direct.svg"
              alt="Réserver"
              width={20}
              height={20}
              className="mr-1"
            />
            Réserver ▾
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="bg-white shadow-xl rounded-xl p-2 w-72 md:w-80"
        >
          <div className="px-3 py-2 text-gray-500 text-sm">
            Choisir une plateforme
          </div>
          {platforms.map((p) => (
            <DropdownMenuItem
              key={p.name}
              onClick={() => window.open(p.url, "_blank")}
              className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="text-gray-800 text-sm">{p.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 ml-auto text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12l-7.5 7.5M3 12h18"
                />
              </svg>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
