function Newsletter() {
  return (
    <section className="bg-black px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto max-w-4xl text-center">

        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/50">
          Stay in the know
        </p>

        <h2 className="text-4xl font-light tracking-tight md:text-6xl">
          Join the LUMÉ world.
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/60">
          Be the first to discover new collections, exclusive releases
          and stories from LUMÉ.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="min-h-12 flex-1 border border-white/30 bg-transparent px-5 text-sm outline-none placeholder:text-white/40 focus:border-white"
          />

          <button
            type="submit"
            className="min-h-12 bg-white px-7 text-xs uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-80"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  )
}

export default Newsletter