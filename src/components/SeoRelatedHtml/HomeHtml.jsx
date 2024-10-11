export function HomeHtml() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none gap-2 p-10 text-[#220140]">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h2 className="text-xl">About</h2>
        <p>
          I’m Eduard, a Full-Stack developer from Romania, with a focus on
          building dynamic and engaging web experiences. I love working at the
          intersection of design and functionality, where I can create seamless
          user interfaces that feel intuitive and look aesthetic. A big part of
          my process involves continuous research and experimentation, which
          lets me bring fresh ideas and solid results to every project I work
          on.
        </p>
        <p>My tech stack, just to name a few examples, includes:</p>
        <ul className="list-disc">
          <li>
            <strong>Front-End:</strong> React, NextJS, Expo
          </li>
          <li>
            <strong>Back-End:</strong> NodeJS, NestJS, Express
          </li>
          <li>
            <strong>Databases:</strong> PostgreSQL, MongoDB
          </li>
          <li>
            <strong>Styling:</strong> TailwindCSS
          </li>
        </ul>
        <p>
          I’m eager to take on new projects, solve problems, and work with
          others to build something meaningful. If you appreciate my work and
          are looking for someone who’s dedicated and adaptable, let us discuss
          how we can work together.
        </p>
        <p>
          Let&apos;s connect and create something that leaves a lasting
          impression!
        </p>
      </div>
    </section>
  );
}
