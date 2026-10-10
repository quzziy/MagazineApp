import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MagazineCover } from "../components/MagazineCover";
import { colors, fonts } from "../theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Ausgaben aus dem Shop (Shopify-Produkte, Stand Okt. 2026)
export const CoversScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.surface }}>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 90,
          right: 90,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: fonts.sans,
          fontSize: 32,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: colors.ink,
        }}
      >
        <span style={{ color: colors.red, fontWeight: 500 }}>N° 01</span>
        <span>Aus dem Archiv</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 90,
          fontFamily: fonts.serif,
          fontSize: 120,
          fontWeight: 600,
          letterSpacing: -3,
          color: colors.ink,
          lineHeight: 1,
        }}
      >
        Ausgewählte <em style={{ fontWeight: 400, color: colors.red }}>Stücke</em>
      </div>

      <MagazineCover
        name="Vogue UK 1973"
        premountFor={fps}
        masthead="VOGUE"
        edition="UK"
        month="March"
        year="1973"
        price="80 €"
        coverColor="#6b4a2b"
        accentColor="#f0d9a8"
        style={{
          left: 260,
          top: 600,
          rotate: interpolate(frame, [0.2 * fps, 1.2 * fps], ["0deg", "-14deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          translate: interpolate(frame, [0.2 * fps, 1.2 * fps], ["0px 900px", "-180px 40px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      />
      <MagazineCover
        name="Vogue Germany 1979"
        premountFor={fps}
        masthead="VOGUE"
        edition="Germany"
        month="November"
        year="1979"
        price="250 €"
        coverColor="#2f3b2f"
        accentColor="#e7c873"
        style={{
          left: 260,
          top: 600,
          rotate: interpolate(frame, [0.6 * fps, 1.6 * fps], ["0deg", "10deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          translate: interpolate(frame, [0.6 * fps, 1.6 * fps], ["0px 900px", "190px 20px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      />
      <MagazineCover
        name="Vogue Germany 1993"
        premountFor={fps}
        masthead="VOGUE"
        edition="Germany"
        month="Juli"
        year="1993"
        price="175 €"
        coverColor={colors.ink}
        accentColor={colors.red}
        style={{
          left: 260,
          top: 600,
          rotate: interpolate(frame, [1 * fps, 2 * fps], ["0deg", "-4deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          translate: interpolate(frame, [1 * fps, 2 * fps], ["0px 900px", "-40px 120px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      />
      <MagazineCover
        name="Vogue Paris 1984"
        premountFor={fps}
        masthead="VOGUE"
        edition="Paris"
        month="Septembre"
        year="1984"
        price="80 €"
        coverColor={colors.red}
        accentColor={colors.paper}
        style={{
          left: 260,
          top: 600,
          rotate: interpolate(frame, [1.4 * fps, 2.4 * fps], ["0deg", "3deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          translate: interpolate(frame, [1.4 * fps, 2.4 * fps], ["0px 900px", "40px 200px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          scale: interpolate(frame, [2.4 * fps, 5 * fps], [1, 1.06], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 170,
          left: 90,
          right: 90,
          textAlign: "center",
          fontFamily: fonts.sans,
          fontWeight: 400,
          fontSize: 44,
          letterSpacing: 2,
          color: colors.ink,
          opacity: interpolate(frame, [2.4 * fps, 3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Vogue Germany · UK · Paris — <span style={{ color: colors.red }}>Originale</span>
      </div>
    </AbsoluteFill>
  );
};
