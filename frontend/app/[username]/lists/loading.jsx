import React from 'react';

const shimmerBackground = {
  background: 'linear-gradient(90deg, var(--color-bg) 25%, var(--color-surface) 37%, var(--color-bg) 63%)',
  backgroundSize: '400% 100%',
  animation: 'shimmer 1.4s ease infinite',
  borderRadius: 4,
};

const shimmerKeyframes = `
  @keyframes shimmer {
    0% { background-position: -400% 0; }
    100% { background-position: 400% 0; }
  }
`;

export default function Loading() {
  return (
    <>
      <style>{shimmerKeyframes}</style>

      <main
        style={{
          margin:'0 auto',
          marginTop:'6em',
          maxWidth:'1100px'
        }}
      >
        <div
          style={{
            width: 1000,
            height: 50,
            display: 'flex',
            gap: 10,
            marginBottom: 20,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 20,
                ...shimmerBackground,
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 20,
                maxWidth: 1000,
                border: '1px solid #ddd',
                padding: 10,
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 5,
                }}
              >
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 80,
                      height: 120,
                      ...shimmerBackground,
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 200,
                      height: 20,
                      ...shimmerBackground,
                    }}
                  />
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      ...shimmerBackground,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 120,
                      height: 14,
                      borderRadius: 3,
                      ...shimmerBackground,
                    }}
                  />
                  <div
                    style={{
                      width: 80,
                      height: 14,
                      borderRadius: 3,
                      ...shimmerBackground,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
