export function ContactHtml() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden w-full h-screen select-none text-[#220140]">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl">Contact</h2>
        <div className="flex flex-col items-center justify-center gap-2">
          <h3>
            <span>Say hello</span>
          </h3>
          <div>
            <p>I look forward to hearing from you</p>
          </div>

          <p>Send me an E-mail at:</p>
          <a href="mailto:eduard.stroescu@gmail.com">
            eduard.stroescu@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
