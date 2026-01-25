import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Hunter | Private Tool",
  description: "Private job application tool",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function JobHunterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
