"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Alumni {
  name: string
  role: string
  image: string
  batch: string
}

const COLS = 5

export default function AlumniSpotlightSection({ alumni = [] }: { alumni: Alumni[] }) {

  return (
    <section className="relative py-24 bg-black overflow-hidden">

      <div className="max-w-7xl mx-auto relative">

        {/* GRID */}
        <div
          className="grid gap-[2px]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`
          }}
        >

          {alumni.map((profile, index) => (

            <motion.div
              key={`${profile.name}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="aspect-square relative overflow-hidden group"
            >

              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-3">

                <p className="text-white text-sm font-bold">
                  {profile.name}
                </p>

                <p className="text-white/70 text-xs">
                  {profile.role}
                </p>

                <p className="text-white/50 text-xs">
                  Batch {profile.batch}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

        {/* TEXT OVERLAY */}
        <div className="pointer-events-none absolute left-10 top-1/3">

          <h2 className="text-white font-black text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">

            This<br/>
            is<br/>
            Us

          </h2>

        </div>

      </div>

    </section>
  )
}