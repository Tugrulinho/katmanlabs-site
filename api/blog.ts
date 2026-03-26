console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5175");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return res.status(500).json({
        error: "Missing server env",
        hasSupabaseUrl: !!supabaseUrl,
        hasServiceRoleKey: !!serviceRoleKey,
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // GET → blog getir
    if (req.method === "GET") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Blog id gerekli" });
      }

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return res.status(404).json({ error: "Blog bulunamadı" });
      }

      return res.status(200).json({ blog: data });
    }
    if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Blog id gerekli" });
      }

      const { error } = await supabase.from("blogs").delete().eq("id", id);

      if (error) throw error;

      return res.status(200).json({ success: true });
    }
    // POST → create / update
    if (req.method === "POST") {
      console.log("BODY:", req.body);
      const { id, blogData, isEdit } = req.body;

      if (!blogData) {
        return res.status(400).json({ error: "blogData gerekli" });
      }

      if (isEdit) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("blogs").insert([blogData]);

        if (error) throw error;
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("API /api/blog crash:", err);
    return res.status(500).json({
      error: err?.message || "Internal server error",
    });
  }
}
