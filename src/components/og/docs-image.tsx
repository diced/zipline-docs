import { getMethodOgColors, ogColors, truncateOgText } from '@/lib/og-theme';

const METHOD_BADGE_GAP = 20;

function getMethodBadgeWidth(method: string) {
  const label = method.toUpperCase();
  return 44 + label.length * 15;
}

function MethodBadge({ method }: { method: string }) {
  const label = method.toUpperCase();
  const colors = getMethodOgColors(label);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: '8px 14px',
        borderRadius: 10,
        backgroundColor: colors.bg,
        color: colors.text,
        fontSize: 26,
        fontWeight: 800,
        letterSpacing: '0.06em',
        fontFamily: 'ui-monospace, monospace',
      }}
    >
      {label}
    </div>
  );
}

export function DocsOGImage({
  title,
  description,
  site,
  method,
}: {
  title: string;
  description?: string;
  site: string;
  method?: string;
}) {
  const displayTitle = truncateOgText(title, 72);
  const displayDescription = description
    ? truncateOgText(description, 140)
    : undefined;
  const isApiPage = Boolean(method);
  const methodBadgeWidth = method
    ? getMethodBadgeWidth(method) + METHOD_BADGE_GAP
    : 0;
  const titleLengthThreshold = method ? 36 : 42;
  const titleFontSize =
    displayTitle.length > titleLengthThreshold ? 58 : method ? 62 : 68;
  const accentLineWidth = Math.min(
    600,
    methodBadgeWidth + 40 * displayTitle.length,
  );

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
              {isApiPage ? 'API Reference' : 'Documentation'}
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: METHOD_BADGE_GAP,
          }}
        >
          {method ? <MethodBadge method={method} /> : null}
          <p
            style={{
              margin: 0,
              flex: 1,
              minWidth: 0,
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: ogColors.gray50,
            }}
          >
            {displayTitle}
          </p>
        </div>

        <div
          style={{
            width: accentLineWidth,
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
