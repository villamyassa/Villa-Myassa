<div className="flex items-center gap-2">
  {/* Language switcher — now visible on mobile too */}
  <div className="flex items-center gap-1 mr-1">
    <button
      aria-label="Français"
      className={`h-8 px-2 rounded-md border text-xs ${
        lang === "fr" ? "bg-black text-white" : "bg-white"
      }`}
      onClick={() => setLang("fr")}
    >
      🇫🇷 FR
    </button>
    <button
      aria-label="English"
      className={`h-8 px-2 rounded-md border text-xs ${
        lang === "en" ? "bg-black text-white" : "bg-white"
      }`}
      onClick={() => setLang("en")}
    >
      🇬🇧 EN
    </button>
  </div>

  <Button asChild>
    <a href={BESTAY_URL} target="_blank" rel="noreferrer" aria-label={L.nav.book}>
      <CalendarDays className="mr-2 h-4 w-4" />
      {L.nav.book}
    </a>
  </Button>

  {/* WhatsApp bubble (top-right) — hidden on mobile, visible ≥ md */}
  <a
    href={waHrefTop}
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp"
    className="hidden md:inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white hover:scale-105 transition"
  >
    <MessageCircle className="h-5 w-5" />
  </a>
</div>
