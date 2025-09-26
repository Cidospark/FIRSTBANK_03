// React import not required for JSX with new JSX transform

type Props = {
  itemsLeft: number;
  filter: "all" | "active" | "completed";
  setFilter: (f: "all" | "active" | "completed") => void;
  query: string;
  setQuery: (q: string) => void;
  total: number;
};

export default function Footer({ itemsLeft, filter, setFilter, query, setQuery }: Props) {
  return (
    <footer className="footer">
      <div className="left">
        <button className="icon-btn" aria-hidden>
          ＋
        </button>

        <div className="search">
          <span className="magnifier">🔍</span>
          <input className="search-input"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search todos"
          />
        </div>

        <div className="items-left">{itemsLeft} {itemsLeft === 1 ? "item" : "items"} left</div>
      </div>

      <div className="filters" role="tablist" aria-label="Filters">
        <button
          className={`filter ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
        >
          All
        </button>
        <button
          className={`filter ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
          aria-pressed={filter === "active"}
        >
          Active
        </button>
        <button
          className={`filter ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
          aria-pressed={filter === "completed"}
        >
          Completed
        </button>
      </div>

      <div className="right" />
    </footer>
  );
}