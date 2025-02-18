import { Helmet } from "react-helmet";

export function ContactHtml() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://eduardstroescu.com/contact" />
      </Helmet>
      <section className="relative flex flex-col items-center justify-center overflow-hidden w-full h-screen select-none text-[#220140]">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-xl">Contact</h2>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>
              <span>Say hello</span>
            </h3>
            <p>I look forward to hearing from you</p>

            <p>Email</p>
            <a href={`mailto:${import.meta.env.VITE_OWNER_EMAIL}`}>
              {import.meta.env.VITE_OWNER_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
