"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // menggunakan useEffect untuk mengambil data dari API secara dinamis saat komponen dimuat.
  // Mengapa pakai useEffect dan bukan getStaticProps?
  // Karena komponen ini membutuhkan interaktivitas (state dan event handling),
  // sehingga data harus di-fetch setelah komponen ter-render, bukan pada build time.
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/faq`)
      .then((res) => res.json())
      .then((data) => setFaqs(data.data))
      .catch((err) => console.error("Terjadi Error:", err));
  });

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-2xl mb-5">FAQ</h2>

      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            className={`border
              ${isOpen ? "border-blue-500" : "border-gray-300"}
              transition
              rounded-lg overflow-hidden`}
          >
            <button
              onClick={() => toggle(i)}
              className="
              flex justify-between items-center
              w-full px-4 py-3
              text-left font-medium bg-white
              hover:bg-gray-50 transition"
            >
              <span>{faq.question}</span>
              {isOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Minus />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus />
                </motion.div>
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-4 py-3 bg-white border-t border-gray-200 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
