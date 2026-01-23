import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applied Jobs | Aaron Eisler",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppliedJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
