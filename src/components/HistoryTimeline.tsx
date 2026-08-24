"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const timelineData = [
  {
    title: "Era Pra-Komputer (Komputer Manusia)",
    period: "Abad 17 - 19",
    icon: "🧑‍🏫",
    image: "/images/history/human.png",
    description: "Kata 'Komputer' pada awalnya bukanlah mesin, melainkan nama profesi untuk manusia yang bertugas menghitung secara manual.",
    programmingMethod: "Manusia memberikan instruksi berupa rumus dan langkah-langkah kerja di atas kertas kepada sang 'Komputer'.",
    color: "from-amber-500/20 to-amber-500/5",
    accent: "text-amber-500",
    border: "border-amber-500/30",
    keyPoints: [
      "Perhitungan matematis dilakukan manual oleh manusia.",
      "Sering digunakan untuk navigasi kelautan, tabel astronomi, dan artileri.",
      "Sangat rentan terhadap 'human error'."
    ]
  },
  {
    title: "Era Mekanik",
    period: "Abad 19",
    icon: "⚙️",
    image: "/images/history/mechanical.png",
    description: "Mesin hitung mekanik raksasa bertenaga uap dan roda gigi, dipelopori oleh Charles Babbage dan Ada Lovelace.",
    programmingMethod: "Instruksi tidak diketik, melainkan diprogram secara fisik menggunakan kartu berlubang (Punch Cards).",
    color: "from-stone-500/20 to-stone-500/5",
    accent: "text-stone-500 dark:text-stone-400",
    border: "border-stone-500/30",
    keyPoints: [
      "Menggunakan roda gigi, tuas, dan tenaga uap.",
      "Charles Babbage merancang Analytical Engine (konsep awal komputer umum).",
      "Ada Lovelace adalah programmer pertama di dunia untuk mesin ini."
    ]
  },
  {
    title: "Generasi 1 (Tabung Vakum)",
    period: "1940-an",
    icon: "💡",
    image: "/images/history/vacuum.png",
    description: "Komputer elektronik pertama (seperti ENIAC) yang ukurannya sebesar ruangan kelas dan membutuhkan daya listrik sangat besar.",
    programmingMethod: "Memprogram berarti pekerjaan fisik yang berat: teknisi harus mencolok dan mencabut ratusan kabel (patch cables) untuk mengatur instruksi logika.",
    color: "from-red-500/20 to-red-500/5",
    accent: "text-red-500",
    border: "border-red-500/30",
    keyPoints: [
      "Menggunakan Tabung Vakum (Vacuum Tubes) sebagai saklar logika.",
      "ENIAC berbobot 30 ton dan memakan daya listrik setara perumahan.",
      "Sering terjadi 'bug' secara harfiah (serangga masuk dan membakar tabung)."
    ]
  },
  {
    title: "Generasi 2 & 3 (Transistor & IC)",
    period: "1950 - 1970-an",
    icon: "⌨️",
    image: "/images/history/transistor.png",
    description: "Ukuran komputer mulai mengecil drastis, berkat penemuan transistor. Keyboard dan monitor mulai digunakan menggantikan switch fisik.",
    programmingMethod: "Manusia mulai berinteraksi menggunakan teks. Ditemukannya bahasa Assembly dan awal bahasa tingkat tinggi, membebaskan manusia dari merangkai kabel.",
    color: "from-green-500/20 to-green-500/5",
    accent: "text-green-500",
    border: "border-green-500/30",
    keyPoints: [
      "Transistor membuat komputer lebih kecil, murah, dan efisien.",
      "Integrated Circuit (IC) memadatkan komponen ke dalam satu chip.",
      "Lahirnya bahasa tingkat tinggi seperti FORTRAN, COBOL, dan C."
    ]
  },
  {
    title: "Generasi 4 & 5 (Mikroprosesor & AI)",
    period: "1980-an - Sekarang",
    icon: "📱",
    image: "/images/history/modern.png",
    description: "Era PC (Personal Computer), smartphone, internet, hingga munculnya Kecerdasan Buatan (AI). Komputer ada di genggaman kita.",
    programmingMethod: "Menggunakan bahasa pemrograman modern yang sangat terabstraksi, dekat dengan bahasa Inggris. Bahkan kini mesin mulai dapat diprogram menggunakan percakapan alami (Prompting).",
    color: "from-blue-500/20 to-blue-500/5",
    accent: "text-blue-500",
    border: "border-blue-500/30",
    keyPoints: [
      "Mikroprosesor menggabungkan jutaan transistor ke dalam satu chip silikon.",
      "Komputer menjadi kebutuhan personal (PC) dan mobile (Smartphone).",
      "AI turut membantu kita memprogram dan memecahkan masalah kompleks."
    ]
  }
];

export default function HistoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [hoveredIndexState, setHoveredIndexState] = React.useState<number | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  
  const [isLockedState, setIsLockedState] = React.useState(false);
  const isLockedRef = useRef(false);
  
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setHoveredIndex = (val: number | null) => {
    hoveredIndexRef.current = val;
    setHoveredIndexState(val);
  };

  const setLocked = (locked: boolean) => {
    isLockedRef.current = locked;
    setIsLockedState(locked);
  };

  const handleMouseEnter = (index: number) => {
    if (isLockedRef.current) return;
    
    // Jika ada kartu lain yang sedang dihover (misal overlap), paksa kunci!
    if (hoveredIndexRef.current !== null && hoveredIndexRef.current !== index) {
      setHoveredIndex(null);
      setLocked(true);
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = setTimeout(() => {
        setLocked(false);
      }, 600);
      return;
    }
    
    setHoveredIndex(index);
  };

  const handleMouseLeave = (index: number) => {
    if (hoveredIndexRef.current === index) {
      setHoveredIndex(null);
      setLocked(true);
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = setTimeout(() => {
        setLocked(false);
      }, 550); // 500ms durasi CSS + 50ms buffer
    }
  };
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative py-10" ref={containerRef}>
      {/* Central Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-border/50 rounded-full transform md:-translate-x-1/2 overflow-hidden">
        <motion.div 
          className="w-full bg-primary origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="flex flex-col gap-12 relative z-10">
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          const hasGroupClass = (!isLockedState && hoveredIndexState === null) || hoveredIndexState === index;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className={`flex flex-col md:flex-row items-center gap-6 w-full relative ${hasGroupClass ? 'group' : ''} ${isEven ? 'md:flex-row-reverse' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              tabIndex={0}
            >
              {/* Invisible Hover Hitbox to bridge gaps and prevent scroll flicker */}
              <div className="absolute -inset-y-6 -inset-x-4 z-0" />
              
              {/* Spacer for alternating layout on desktop */}
              <div 
                className={`hidden md:block transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:w-1/2 md:group-hover:w-[10%]`} 
              />
              
              {/* Content Card */}
              <div 
                className={`w-full pl-20 pr-4 md:px-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] relative z-20 md:w-1/2 md:group-hover:w-[90%] ${
                  isEven ? 'md:pr-12 md:group-hover:pr-6' : 'md:pl-12 md:group-hover:pl-6'
                }`}
              >
                <div 
                  className={`p-6 rounded-2xl bg-background border ${item.border} relative overflow-hidden transition-all duration-500 shadow-sm group-hover:shadow-2xl scale-100 group-hover:scale-[1.02] md:group-hover:scale-100 flex flex-col justify-center`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-70`} />
                  
                  {/* Background Icon */}
                  <div className={`absolute -right-6 -bottom-6 text-8xl opacity-[0.03] transition-all duration-500 pointer-events-none group-hover:opacity-10 group-hover:scale-110 ${isEven ? 'md:-left-6 md:-right-auto' : ''}`}>
                    {item.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <h3 className={`text-xl font-bold text-foreground flex items-center gap-2 justify-start md:justify-normal ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-2xl hidden md:inline">{item.icon}</span>
                        <span className={isEven ? 'md:text-right' : 'text-left'}>{item.title}</span>
                      </h3>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-background/80 backdrop-blur border ${item.border} ${item.accent} inline-block w-fit`}>
                        {item.period}
                      </span>
                    </div>

                    {/* Flex Container for Content (Side-by-Side Hover Architecture) */}
                    <div className={`flex flex-col md:flex-row transition-all duration-500 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      
                      {/* Left Side (Text -> Image -> Text. Width stays mathematically identical in absolute pixels: 100% of 50% == 55.5% of 90%) */}
                      <div className={`flex flex-col gap-5 transition-all duration-500 w-full shrink-0 md:group-hover:w-[55.5%]`}>
                        
                        {/* Text (Top: Description) */}
                        <div className={`w-full text-left`}>
                          <p className={`text-sm text-muted-foreground leading-relaxed ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                            {item.description}
                          </p>
                        </div>

                        {/* Image (Middle) */}
                        <div className={`w-full shrink-0`}>
                          <div className={`w-full aspect-video rounded-xl overflow-hidden border ${item.border} shadow-sm relative bg-background/50`}>
                            <Image 
                              src={item.image} 
                              alt={item.title}
                              fill
                              className={`object-cover transition-transform duration-700 scale-100 group-hover:scale-105`}
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                        </div>
                        
                        {/* Text (Bottom: Programming Method) */}
                        <div className={`w-full flex flex-col justify-center`}>
                          <div className={`pt-4 border-t ${item.border}`}>
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${item.accent} block mb-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                              Cara Memberikan Instruksi:
                            </span>
                            <p className={`text-sm font-medium text-foreground leading-relaxed ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                              {item.programmingMethod}
                            </p>
                          </div>
                          
                          {/* Mobile Key Points (Expands downwards on small screens) */}
                          <div className={`md:hidden overflow-hidden transition-all duration-500 max-h-0 opacity-0 mt-0 pt-0 border-transparent group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-4 group-hover:pt-4 group-hover:border-t ${item.border}`}>
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${item.accent} block mb-2`}>
                              Poin Penting:
                            </span>
                            <ul className="space-y-2">
                              {item.keyPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-muted-foreground items-start">
                                  <span className={`${item.accent} mt-0.5`}>•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </div>

                      {/* Right Side (Key Points - Desktop Only, Reveals Sideways taking up the new 40% space) */}
                      <div className={`hidden md:flex flex-col justify-center overflow-hidden transition-all duration-500 w-0 opacity-0 pl-0 pr-0 border-transparent md:group-hover:w-[44.5%] md:group-hover:opacity-100 ${isEven ? 'md:group-hover:pr-6 md:group-hover:border-r' : 'md:group-hover:pl-6 md:group-hover:border-l'} ${item.border} ${isEven ? 'md:text-right' : 'text-left'}`}>
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${item.accent} block mb-2`}>
                          Poin Penting:
                        </span>
                        <ul className="space-y-2">
                          {item.keyPoints.map((point, idx) => (
                            <li key={idx} className={`flex gap-2 text-sm text-muted-foreground items-start ${isEven ? 'flex-row-reverse' : ''}`}>
                              <span className={`${item.accent} mt-0.5`}>•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-[30px] md:left-1/2 top-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center pointer-events-none z-30">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`w-4 h-4 rounded-full bg-background border-4 border-primary shadow-[0_0_0_4px_var(--background)] transition-transform duration-300 scale-100 group-hover:scale-150`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
