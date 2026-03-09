// 08 — Classes | Examples

// Access modifiers shorthand
class User {
  constructor(
    public  readonly id:    number,
    public           name:  string,
    protected        email: string,
    private          pass:  string,
  ) {}

  getEmail()           { return this.email; }
  checkPass(p: string) { return this.pass === p; }
}

class AdminUser extends User {
  constructor(id: number, name: string, email: string, pass: string, public permissions: string[]) {
    super(id, name, email, pass);
  }
  getAdminEmail() { return this.email; } // protected — accessible
}

// Builder pattern
class QueryBuilder<T extends Record<string, unknown>> {
  private _table   = "";
  private _fields: string[] = [];
  private _wheres: string[] = [];
  private _limit?: number;
  private _offset?: number;

  from(table: string): this        { this._table = table; return this; }
  select(...f: (keyof T)[]): this  { this._fields.push(...f as string[]); return this; }
  where(f: keyof T, v: unknown): this { this._wheres.push(`${String(f)} = '${v}'`); return this; }
  limit(n: number): this           { this._limit = n; return this; }
  offset(n: number): this          { this._offset = n; return this; }

  build(): string {
    const fields = this._fields.length ? this._fields.join(", ") : "*";
    let q = `SELECT ${fields} FROM ${this._table}`;
    if (this._wheres.length) q += ` WHERE ${this._wheres.join(" AND ")}`;
    if (this._limit  !== undefined) q += ` LIMIT ${this._limit}`;
    if (this._offset !== undefined) q += ` OFFSET ${this._offset}`;
    return q;
  }
}

interface UserRecord { id: number; name: string; email: string; role: string }

const query = new QueryBuilder<UserRecord>()
  .from("users")
  .select("id", "name", "email")
  .where("role", "admin")
  .limit(10)
  .offset(0)
  .build();

console.log(query);
// SELECT id, name, email FROM users WHERE role = 'admin' LIMIT 10 OFFSET 0
