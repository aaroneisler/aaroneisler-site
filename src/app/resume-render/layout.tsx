import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Render | Internal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResumeRenderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
