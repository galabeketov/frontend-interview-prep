// 02 - Components and Props - Examples

// Masala 1 - Flexible Button
function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    loading && "btn-loading",
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <span className="spinner" aria-hidden="true" />
      ) : Icon ? (
        <Icon className="btn-icon" />
      ) : null}
      {children}
    </button>
  );
}

// Masala 2 - DataTable
function DataTable({ columns, data, sortable = false, pageSize = 10 }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const res = String(a[sortKey]).localeCompare(String(b[sortKey]));
      return sortDir === "asc" ? res : -res;
    });
  }, [data, sortKey, sortDir]);

  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} onClick={sortable ? () => handleSort(col.key) : undefined}
                style={{ cursor: sortable ? "pointer" : "default" }}>
                {col.label}
                {sortKey === col.key && (sortDir === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paged.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Oldingi</button>
        <span>Sahifa {page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page * pageSize >= sorted.length}>Keyingi</button>
      </div>
    </div>
  );
}
