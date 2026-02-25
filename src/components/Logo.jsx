function Logo() {
  return (
    <div className="relative w-9 h-9 shrink-0">
      {/* Spinning conic gradient ring */}
      <div
        className="absolute -inset-0.5 rounded-full spin-slow"
        style={{ background: 'conic-gradient(from 0deg, #16a34a, #4ade80, #a3e635, #16a34a)' }}
      />
      {/* White/dark gap between ring and photo */}
      <div className="absolute inset-0 rounded-full bg-white dark:bg-dark-bg" />
      {/* Photo on top */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <picture>
          <source srcSet="/image.webp" type="image/webp" />
          <img
            src="/image.png"
            alt="Susanth"
            className="w-full h-full object-cover object-top"
            width="36"
            height="36"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  )
}

export default Logo
