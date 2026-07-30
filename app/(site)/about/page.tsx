function About() {
  return (
    <div className="flex items-center justify-center flex-1 px-6 py-16">
      <div className="max-w-xl space-y-6 text-center">
        <h1 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-gray-800 font-heading">
          About ReactShop
        </h1>

        <div className="w-12 h-px mx-auto bg-gray-300" />

        {/* Description */}
        <p className="leading-relaxed text-gray-600">
          ReactShop is a pet project where I apply my frontend skills in
          practice, building a modern e-commerce app while improving UI/UX.
        </p>

        {/* Tech / purpose */}
        <p className="text-sm text-gray-500">
          Built with React, TypeScript and Tailwind
        </p>

        {/* Accent */}
        <p className="pt-2 text-gray-600">
          Made with <span className="text-red-500">❤</span> for clean UI
        </p>

        {/* Signature */}
        <p className="pt-4 text-sm italic text-gray-400">
          ~ by{" "}
          <a
            href="https://github.com/KIB101D"
            target="_blank"
            className="underline transition hover:text-indigo-600"
          >
            KIB101D
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
