import { useSQLiteContext } from "expo-sqlite";

export type TargetCreate = {
  name: string;
  amount: number;
};

export type TargetUpdate = TargetCreate & {
  id: number;
};

export type TargetResponse = {
  id: number;
  name: string;
  amount: number;
  current: number;
  percentage: number;
  created_at: Date;
  updated_at: Date;
};

export function useTargetDatabase() {
  const database = useSQLiteContext();

  async function create(data: TargetCreate) {
    const statement = await database.prepareAsync(
      "INSERT INTO targets (name, amount) VALUES ($name, $amount)"
    );

    await statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    });
  }

  function listBySavedValue() {
    return database.getAllAsync<TargetResponse>(`
      SELECT
        t.id,
        t.name,
        t.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE(SUM(transactions.amount) / t.amount * 100, 0) AS percentage,
        t.created_at,
        t.updated_at
      FROM targets AS t
      LEFT JOIN transactions ON t.id = transactions.target_id
      GROUP BY t.id
      ORDER BY t.created_at DESC
    `);
  }

  function show(id: number) {
    return database.getFirstAsync<TargetResponse>(`
      SELECT
        t.id,
        t.name,
        t.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE(SUM(transactions.amount) / t.amount * 100, 0) AS percentage,
        t.created_at,
        t.updated_at
      FROM targets AS t
      LEFT JOIN transactions ON t.id = transactions.target_id
      WHERE t.id = ${id}
    `);
  }

  async function update(data: TargetUpdate) {
    const statement = await database.prepareAsync(`
      UPDATE targets SET 
        name = $name, 
        amount = $amount,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $id`);

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
      $id: data.id,
    });
  }

  async function remove(id: number) {
    await database.runAsync("DELETE FROM targets WHERE id = ?", id);
  }

  return {
    create,
    listBySavedValue,
    show,
    update,
    remove,
  };
}
