export async function GET() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/AscendingHeavens/falcon/main/docs.json"
    );

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch docs" }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    
    
    // Parse the full JSON from the remote file
    const data = await res.json();
    console.log("api docs", data);

    // Ensure all nested arrays (methods) are preserved — JSON.parse already does this
    // If you want, you can expand or transform data here, e.g., flatten methods

    return new Response(JSON.stringify(data, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error", details: err }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
