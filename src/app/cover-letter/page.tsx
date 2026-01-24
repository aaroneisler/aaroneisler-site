import React from 'react';
import data from '../../data/cover_letter.json';

// Define the data interface
interface CoverLetterData {
  date: string;
  addressee: string;
  paragraphs: string[];
}

function getCoverLetterData(): CoverLetterData {
  return data as CoverLetterData;
}

export default function CoverLetterPage() {
  const data = getCoverLetterData();

  return (
    <div className="cover-letter font-serif text-gray-800 max-w-[8.5in] mx-auto p-12 bg-white min-h-screen">
      {/* Header - matches resume style */}
      <header className="border-b-2 border-teal-600 pb-4 mb-8">
        <h1 className="text-2xl font-bold text-teal-600">AARON EISLER</h1>
        <p className="text-sm text-gray-600">
          aaroneisler.com.au | Sydney, Australia
        </p>
        <p className="text-sm text-gray-500 mt-2">{data.date}</p>
      </header>

      {/* Body */}
      <div className="space-y-4 text-[10.5pt] leading-relaxed">
        <p>Dear {data.addressee || "Hiring Team"},</p>
        {data.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

        {/* CTA */}
        <p className="mt-6 text-teal-700 font-medium">
          Questions? Feel free to ask me anything at aaroneisler.com.au
        </p>

        <p className="mt-8">Regards,</p>
        <p className="font-semibold">Aaron Eisler</p>
      </div>
    </div>
  );
}