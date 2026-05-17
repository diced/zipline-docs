import { ogColors, truncateOgText } from '@/lib/og-theme';

export function DocsOGImage({
  title,
  description,
  site,
  logo,
}: {
  title: string;
  description?: string;
  site: string;
  logo: string;
}) {
  const displayTitle = truncateOgText(title, 72);
  const displayDescription = description
    ? truncateOgText(description, 140)
    : undefined;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: ogColors.gray900,
        color: ogColors.gray50,
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        padding: '56px 72px',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          marginBottom: 48,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: 18,
              backgroundColor: ogColors.gray800,
              border: `1px solid ${ogColors.gray700}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt='' width={52} height={52} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p
              style={{
                margin: 0,
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: ogColors.gray50,
              }}
            >
              {site}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 500,
                color: ogColors.gray400,
              }}
            >
              Documentation
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          gap: 20,
          maxWidth: 980,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: displayTitle.length > 42 ? 58 : 68,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: ogColors.gray50,
          }}
        >
          {displayTitle}
        </p>

        <div
          style={{
            width: Math.min(600, 40 * displayTitle.length),
            height: 4,
            borderRadius: 2,
            backgroundColor: ogColors.blue500,
          }}
        />

        {displayDescription ? (
          <p
            style={{
              margin: 0,
              fontSize: 34,
              lineHeight: 1.35,
              fontWeight: 400,
              color: ogColors.gray300,
            }}
          >
            {displayDescription}
          </p>
        ) : null}
      </div>
    </div>
  );
}
