export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Prompt CEO</h1>
      <p>Choose your app:</p>

      <div style={{ marginTop: 20 }}>
        <a href="/prompt-v2">👉 Photo App</a>
      </div>

      <div style={{ marginTop: 10 }}>
        <a href="/video">👉 Video App</a>
      </div>
    </main>
  );
}
