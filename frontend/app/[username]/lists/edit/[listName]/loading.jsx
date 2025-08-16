export default function Loading() {
  const shimmerStyle = {
    background: 'linear-gradient(90deg, var(--color-surface) 25%, var(--color-bg) 37%, var(--color-surface) 63%)',
    backgroundSize: '400% 100%',
    animation: 'shimmer 2s ease infinite',
    borderRadius: 4,
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400% 0; }
          100% { background-position: 400% 0; }
        }
      `}</style>

      <main style={{ padding: '1rem', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ width: 160, height: 32, ...shimmerStyle }} />
        </div>

        <form style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ width: '60%', height: 24, marginBottom: 8, ...shimmerStyle }} />
              <div style={{ width: '90%', height: 36, borderRadius: 4, ...shimmerStyle }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ width: '80%', height: 24, marginBottom: 8, ...shimmerStyle }} />
              <div style={{ width: '95%', height: 36, borderRadius: 4, ...shimmerStyle }} />
            </div>
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', ...shimmerStyle }} />
              <div style={{ width: '70%', height: 24, borderRadius: 4, ...shimmerStyle }} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ width: '50%', height: 24, marginBottom: 8, ...shimmerStyle }} />
              <div style={{ width: '100%', height: 120, borderRadius: 4, ...shimmerStyle }} />
            </div>
            <div style={{ marginTop: 40 }}>
              <div style={{ width: '40%', height: 36, borderRadius: 4, marginBottom: 8, ...shimmerStyle }} />
              <div style={{ width: '70%', height: 14, borderRadius: 4, ...shimmerStyle }} />
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
