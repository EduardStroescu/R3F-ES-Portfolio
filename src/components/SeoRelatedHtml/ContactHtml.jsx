import { Helmet } from "react-helmet-async";

export function ContactHtml() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://eduardstroescu.com/contact" />
      </Helmet>
      <section className="relative flex flex-col items-center justify-center overflow-hidden w-full h-screen select-none text-[#000f3b]">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-xl">Contact</h1>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2>Say hello</h2>
            <p>I look forward to hearing from you</p>

            <p>Email</p>
            <a
              href={`mailto:${import.meta.env.VITE_OWNER_EMAIL}`}
              aria-label={`Send an email to ${
                import.meta.env.VITE_OWNER_EMAIL
              }`}
            >
              {import.meta.env.VITE_OWNER_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
