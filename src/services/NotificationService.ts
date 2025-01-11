import {
  createClient,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

const supabaseUrl = "https://qotmjrkdyunyrzfyrmny.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error("Missing Supabase anon key");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

interface WaiterCallPayload {
  table_number: string;
  status: string;
  timestamp: string;
}

export const NotificationService = {
  async callWaiter(tableNumber: string) {
    try {
      const { data, error } = await supabase.from("waiter_calls").insert([
        {
          table_number: tableNumber,
          status: "pending",
          timestamp: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Waiter call created:", data);
    } catch (error) {
      console.error("Error calling waiter:", error);
      throw error;
    }
  },

  async completeCall(tableNumber: string) {
    await supabase
      .from("waiter_calls")
      .update({ status: "completed" })
      .eq("table_number", tableNumber);
  },

  subscribeToWaiterCalls(
    callback: (
      payload: RealtimePostgresChangesPayload<WaiterCallPayload>
    ) => void
  ) {
    return supabase
      .channel("waiter_calls")
      .on(
        "postgres_changes" as const,
        { event: "INSERT", schema: "public", table: "waiter_calls" },
        callback
      )
      .subscribe();
  },

  async getActiveCalls() {
    const { data, error } = await supabase
      .from("waiter_calls")
      .select("*")
      .eq("status", "pending")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching calls:", error);
      throw error;
    }

    return data;
  },
};
