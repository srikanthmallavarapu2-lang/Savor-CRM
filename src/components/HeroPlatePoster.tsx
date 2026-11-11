interface HeroPlatePosterProps {
  reason?: 'loading' | 'fallback'
}

/**
 * Polished editorial SVG/CSS poster displayed while the lazy 3D scene loads
 * or when WebGL is unavailable on the visitor's device.
 */
export function HeroPlatePoster({ reason = 'loading' }: HeroPlatePosterProps) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#FCF6EB] via-[#F6ECDC] to-[#EFE1CA] p-6 shadow-inner"
      role="img"
      aria-label="Illustrated stoneware serving plate garnished with heirloom tomatoes and sweet basil leaves"
    >
      <svg
        viewBox="0 0 360 360"
        className="h-full max-h-[340px] w-full max-w-[340px] drop-shadow-[0_24px_34px_rgba(34,34,30,0.16)]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="plateRim" cx="42%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="68%" stopColor="#F5EBDC" />
            <stop offset="100%" stopColor="#DFD0B8" />
          </radialGradient>
          <radialGradient id="plateWell" cx="45%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="85%" stopColor="#F3E7D5" />
            <stop offset="100%" stopColor="#E4D4BC" />
          </radialGradient>
        </defs>

        {/* Soft ambient shadow */}
        <ellipse cx="180" cy="212" rx="136" ry="118" fill="#22221E" opacity="0.08" />

        {/* Ceramic plate */}
        <circle cx="180" cy="180" r="134" fill="url(#plateRim)" stroke="#D9C7AD" strokeWidth="2" />
        <circle cx="180" cy="180" r="98" fill="url(#plateWell)" stroke="#E3D4BE" strokeWidth="1.5" />

        {/* Saffron pasta nest */}
        <ellipse cx="176" cy="184" rx="54" ry="44" fill="#E8B955" opacity="0.92" />
        <path
          d="M132 178 C152 152, 206 154, 218 182 C226 202, 198 220, 166 218 C142 216, 124 196, 132 178 Z"
          fill="none"
          stroke="#C88B2B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M144 190 C162 164, 198 168, 208 188"
          fill="none"
          stroke="#F4CF74"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Heirloom tomato slices */}
        <circle cx="146" cy="162" r="24" fill="#D8432E" />
        <circle cx="146" cy="162" r="17" fill="#E55C45" />
        <circle cx="206" cy="196" r="22" fill="#C93824" />
        <circle cx="206" cy="196" r="15" fill="#E15841" />

        {/* Burrata medallion */}
        <ellipse cx="186" cy="160" rx="26" ry="21" fill="#FFFDF7" stroke="#EAE0CE" strokeWidth="1.5" />

        {/* Basil leaves */}
        <path
          d="M168 152 C158 130, 178 118, 190 132 C196 144, 182 156, 168 152 Z"
          fill="#244C35"
        />
        <path
          d="M196 172 C214 156, 232 170, 222 186 C214 196, 196 188, 196 172 Z"
          fill="#2E6144"
        />
        <path
          d="M128 206 C112 198, 114 176, 132 180 C142 184, 140 202, 128 206 Z"
          fill="#244C35"
        />

        {/* Floating accent herbs */}
        <circle cx="62" cy="96" r="9" fill="#D8432E" opacity="0.88" />
        <path
          d="M294 94 C310 82, 322 98, 308 112 C298 118, 286 106, 294 94 Z"
          fill="#244C35"
          opacity="0.85"
        />
        <circle cx="294" cy="272" r="7" fill="#E6B84C" opacity="0.85" />
      </svg>

      <span className="sr-only">
        {reason === 'loading'
          ? 'Loading interactive 3D plate view'
          : 'Static illustrated serving plate fallback'}
      </span>
    </div>
  )
}

