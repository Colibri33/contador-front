import { useMemo, useState } from "react";

const BACKEND_URL = "https://contador-back-auxv.onrender.com";

const STORE_COLORS = {
  Jumbo: { bg: "#e8000d", text: "#fff" },
  Éxito: { bg: "#FFD700", text: "#1a1a1a" },
  éxito: { bg: "#FFD700", text: "#1a1a1a" },
  exito: { bg: "#FFD700", text: "#1a1a1a" },
  Carulla: { bg: "#6B3FA0", text: "#fff" },
  carulla: { bg: "#6B3FA0", text: "#fff" },
  Rappi: { bg: "#FF441B", text: "#fff" },
};

function getStoreStyle(store) {
  const key = Object.keys(STORE_COLORS).find(
    (k) => store?.toLowerCase().includes(k.toLowerCase())
  );
  return key ? STORE_COLORS[key] : { bg: "#444", text: "#fff" };
}

function formatCOP(value) {
  if (value === null || value === undefined) return "-";
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value}`;
  }
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nunito:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Nunito', sans-serif;
    background: #f5f5f5;
    min-height: 100vh;
  }

  .mk-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* HEADER */
  .mk-header {
    background: linear-gradient(135deg, #FF5000 0%, #FF2D00 60%, #e8000d 100%);
    padding: 18px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }

  .mk-logo-box {
    border: 3px solid rgba(255,255,255,0.6);
    padding: 6px 18px 6px 12px;
    border-radius: 6px;
  }

  .mk-logo {
    font-family: 'Black Han Sans', sans-serif;
    font-size: 2.4rem;
    color: #fff;
    letter-spacing: 1px;
    line-height: 1;
  }

  .mk-tagline {
    color: rgba(255,255,255,0.85);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .mk-social {
    display: flex;
    gap: 10px;
  }

  .mk-social a {
    width: 40px;
    height: 40px;
    background: rgba(0,0,0,0.25);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.1rem;
    text-decoration: none;
    transition: background 0.2s;
  }

  .mk-social a:hover { background: rgba(0,0,0,0.45); }

  /* HERO SEARCH */
  .mk-hero {
    background: linear-gradient(180deg, #FF6B1A 0%, #FF9A3C 100%);
    padding: 36px 20px 44px;
    text-align: center;
  }

  .mk-hero h2 {
    font-family: 'Black Han Sans', sans-serif;
    color: #fff;
    font-size: 1.8rem;
    letter-spacing: 1px;
    margin-bottom: 20px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .mk-search-bar {
    display: flex;
    max-width: 620px;
    margin: 0 auto 16px;
    background: #fff;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(0,0,0,0.18);
  }

  .mk-search-bar input {
    flex: 1;
    border: none;
    outline: none;
    padding: 14px 22px;
    font-size: 1rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    color: #333;
    background: transparent;
  }

  .mk-search-bar button {
    background: #FF5000;
    border: none;
    padding: 0 22px;
    cursor: pointer;
    color: #fff;
    font-size: 1.2rem;
    transition: background 0.2s;
    display: flex;
    align-items: center;
  }

  .mk-search-bar button:hover { background: #e8000d; }
  .mk-search-bar button:disabled { opacity: 0.6; cursor: not-allowed; }

  .mk-size-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  .mk-size-row label {
    color: rgba(255,255,255,0.9);
    font-weight: 700;
    font-size: 0.9rem;
  }

  .mk-size-row input {
    padding: 8px 14px;
    border-radius: 20px;
    border: none;
    outline: none;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    width: 150px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  /* DIVIDER WAVE */
  .mk-wave {
    background: linear-gradient(180deg, #FF9A3C 0%, #f5f5f5 100%);
    height: 36px;
    clip-path: ellipse(55% 100% at 50% 0%);
  }

  /* MAIN CONTENT */
  .mk-main {
    flex: 1;
    padding: 24px 20px 48px;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  /* CHEAPEST BANNER */
  .mk-cheapest-banner {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: #fff;
    padding: 14px 22px;
    border-radius: 14px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 16px rgba(34,197,94,0.3);
    animation: fadeIn 0.4s ease;
  }

  .mk-cheapest-banner .icon { font-size: 1.6rem; }
  .mk-cheapest-banner .label { font-size: 0.8rem; font-weight: 700; opacity: 0.85; text-transform: uppercase; letter-spacing: 1px; }
  .mk-cheapest-banner .title { font-size: 1rem; font-weight: 800; }
  .mk-cheapest-banner .price { font-size: 1.4rem; font-weight: 800; margin-left: auto; }

  /* PRODUCT GRID */
  .mk-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }

  .mk-card {
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 4px 18px rgba(0,0,0,0.08);
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    animation: fadeUp 0.4s ease both;
  }

  .mk-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 32px rgba(0,0,0,0.14);
  }

  .mk-card.cheapest {
    box-shadow: 0 6px 24px rgba(34,197,94,0.35);
    outline: 3px solid #22c55e;
  }

  .mk-card-img {
    height: 160px;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    position: relative;
  }

  .mk-store-badge {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.5px;
  }

  .mk-best-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #22c55e;
    color: #fff;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.5px;
  }

  .mk-card-body {
    padding: 14px 16px 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .mk-card-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: #222;
    line-height: 1.3;
    flex: 1;
  }

  .mk-card-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .mk-card-ml {
    background: #f0f0f0;
    color: #666;
    border-radius: 10px;
    padding: 2px 8px;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .mk-card-stars { font-size: 0.78rem; color: #f59e0b; }

  .mk-card-price {
    font-size: 1.55rem;
    font-weight: 800;
    color: #FF5000;
    margin-top: 4px;
  }

  .mk-card-price-unit {
    font-size: 0.75rem;
    color: #888;
    font-weight: 600;
  }

  .mk-card-link {
    display: block;
    margin-top: 10px;
    background: #FF5000;
    color: #fff;
    text-align: center;
    padding: 9px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 800;
    font-size: 0.88rem;
    transition: background 0.2s;
  }

  .mk-card-link:hover { background: #e8000d; }

  /* STATES */
  .mk-empty {
    text-align: center;
    padding: 60px 20px;
    color: #aaa;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .mk-error {
    background: #ffe5e5;
    color: #7a0000;
    padding: 14px 18px;
    border-radius: 12px;
    margin-bottom: 20px;
    font-weight: 700;
  }

  .mk-loading {
    display: flex;
    justify-content: center;
    padding: 60px 0;
    gap: 8px;
  }

  .mk-dot {
    width: 14px;
    height: 14px;
    background: #FF5000;
    border-radius: 50%;
    animation: bounce 0.7s infinite alternate;
  }

  .mk-dot:nth-child(2) { animation-delay: 0.15s; }
  .mk-dot:nth-child(3) { animation-delay: 0.3s; }

  @keyframes bounce {
    from { transform: translateY(0); opacity: 0.6; }
    to { transform: translateY(-16px); opacity: 1; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .mk-results-header {
    font-size: 0.9rem;
    color: #888;
    font-weight: 700;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Stagger cards */
  .mk-card:nth-child(1) { animation-delay: 0.05s; }
  .mk-card:nth-child(2) { animation-delay: 0.10s; }
  .mk-card:nth-child(3) { animation-delay: 0.15s; }
  .mk-card:nth-child(4) { animation-delay: 0.20s; }
  .mk-card:nth-child(5) { animation-delay: 0.25s; }
  .mk-card:nth-child(6) { animation-delay: 0.30s; }
`;

const STORE_ICONS = {
  jumbo: "🛒",
  éxito: "🛍️",
  exito: "🛍️",
  carulla: "🏪",
  rappi: "🛵",
};

function getStoreIcon(store) {
  const key = Object.keys(STORE_ICONS).find((k) =>
    store?.toLowerCase().includes(k)
  );
  return key ? STORE_ICONS[key] : "🏪";
}

export default function App() {
  const [query, setQuery] = useState("");
  const [sizeMl, setSizeMl] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [searched, setSearched] = useState(false);

  const cheapest = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.reduce((min, item) => {
      if (!min) return item;
      return (item.price_cop ?? Infinity) < (min.price_cop ?? Infinity) ? item : min;
    }, null);
  }, [data]);

  async function handleSearch(e) {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setErr("");
    setSearched(true);

    try {
      const size = sizeMl.trim() ? Number(sizeMl.trim()) : null;
      const url =
        size && !Number.isNaN(size)
          ? `${BACKEND_URL}/compare?query=${encodeURIComponent(query)}&size_ml=${size}`
          : `${BACKEND_URL}/compare?query=${encodeURIComponent(query)}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json.results || []);
    } catch (error) {
      setErr(String(error));
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="mk-root">
        {/* HEADER */}
        <header className="mk-header">
          <div className="mk-logo-box">
            <div className="mk-logo">MARKCOMP</div>
            <div className="mk-tagline">Comparador de precios online</div>
          </div>
          <div className="mk-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="WhatsApp">✆</a>
          </div>
        </header>

        {/* HERO */}
        <section className="mk-hero">
          <h2>¿QUE BUSCAS HOY?</h2>
          <form onSubmit={handleSearch}>
            <div className="mk-search-bar">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej: aceite de oliva, jabón, arroz..."
              />
              <button type="submit" disabled={loading}>
                {loading ? "⏳" : "🔍"}
              </button>
            </div>
            <div className="mk-size-row">
              <label>Tamaño (ml):</label>
              <input
                value={sizeMl}
                onChange={(e) => setSizeMl(e.target.value)}
                placeholder="Ej: 1000"
                type="number"
              />
            </div>
          </form>
        </section>

        <div className="mk-wave" />

        {/* MAIN */}
        <main className="mk-main">
          {err && <div className="mk-error">⚠️ Error: {err}</div>}

          {loading && (
            <div className="mk-loading">
              <div className="mk-dot" />
              <div className="mk-dot" />
              <div className="mk-dot" />
            </div>
          )}

          {!loading && cheapest && (
            <div className="mk-cheapest-banner">
              <span className="icon">🏆</span>
              <div>
                <div className="label">Mejor precio</div>
                <div className="title">{cheapest.title} · {cheapest.store}</div>
              </div>
              <div className="price">{formatCOP(cheapest.price_cop)}</div>
            </div>
          )}

          {!loading && data.length > 0 && (
            <>
              <div className="mk-results-header">
                {data.length} resultado{data.length !== 1 ? "s" : ""} encontrado{data.length !== 1 ? "s" : ""}
              </div>
              <div className="mk-grid">
                {data.map((item, idx) => {
                  const isCheapest =
                    cheapest &&
                    item.store === cheapest.store &&
                    item.url === cheapest.url;
                  const storeStyle = getStoreStyle(item.store);
                  const stars = item.stars || 0;

                  return (
                    <div key={idx} className={`mk-card${isCheapest ? " cheapest" : ""}`}>
                      <div className="mk-card-img">
                        {item.image
                          ? <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }} />
                          : <span style={{ fontSize: "3rem" }}>{getStoreIcon(item.store)}</span>
                        }
                        {isCheapest && <span className="mk-best-badge">⭐ Más barato</span>}
                        <span
                          className="mk-store-badge"
                          style={{ background: storeStyle.bg, color: storeStyle.text }}
                        >
                          {item.store}
                        </span>
                      </div>
                      <div className="mk-card-body">
                        <div className="mk-card-title">{item.title}</div>
                        <div className="mk-card-meta">
                          {item.ml && <span className="mk-card-ml">{item.ml} ml</span>}
                          {stars > 0 && (
                            <span className="mk-card-stars">
                              {"★".repeat(stars)}{"☆".repeat(5 - stars)}
                            </span>
                          )}
                        </div>
                        <div className="mk-card-price">{formatCOP(item.price_cop)}</div>
                        {item.price_per_100ml && (
                          <div className="mk-card-price-unit">
                            {formatCOP(item.price_per_100ml)} / 100ml
                          </div>
                        )}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mk-card-link"
                          >
                            Ver producto →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {!loading && searched && data.length === 0 && !err && (
            <div className="mk-empty">
              😕 No encontramos resultados para "<strong>{query}</strong>".<br />
              Intenta con otro término.
            </div>
          )}

          {!loading && !searched && (
            <div className="mk-empty">
              🔍 Escribe un producto y presiona buscar.
            </div>
          )}
        </main>
      </div>
    </>
  );
}
