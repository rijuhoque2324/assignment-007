import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CurrentDate from '../CurrentDate';

const HeroSection = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-white p-6 md:flex-row md:p-10">

                {/* Left Side */}
                <div className="flex-1 space-y-4">

                {/* Badge */}
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <CurrentDate/>
                </span>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                {/* Paragraph */}
                <p className="max-w-xl text-sm leading-7 text-gray-500 md:text-base">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য
                    নিত্যপ্রয়োজনীয় জিনিসের আজকের দাম, সর্বশেষ
                    পরিবর্তন এবং বাজার পরিস্থিতি জানুন।
                </p>

                {/* Button */}
                <Link
                    href="#all-products"
                    className="inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                >
                    সব পণ্য দেখুন
                </Link>
                </div>

                {/* Right Side */}
                <div className="flex flex-1 justify-center md:justify-end">
                <Image
                    src="/bazar-hero.png"
                    alt="Fresh vegetables basket"
                    width={320}
                    height={260}
                    className="h-auto w-56 object-contain md:w-72"
                    priority
                />
                </div>

            </div>
        </div>
    );
};

export default HeroSection;