import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Wortmarke nach assets/logo-wordmark-dark.svg aus dem Shop-Theme
export const EndCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: interpolate(frame, [0, 0.8 * fps], [0, 900], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          height: 6,
          backgroundColor: colors.red,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 70,
          marginBottom: 70,
          opacity: interpolate(frame, [0.2 * fps, 0.7 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          scale: interpolate(frame, [0.2 * fps, 1.2 * fps], [0.94, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
            output: "perceptual-scale",
          }),
        }}
      >
        <div style={{ fontFamily: fonts.serif, fontWeight: 800, fontSize: 120, letterSpacing: 36, marginRight: -36, color: colors.paper }}>
          VINTAGE
        </div>
        <div style={{ fontFamily: fonts.serif, fontStyle: "italic", fontSize: 200, lineHeight: 1, color: colors.red }}>
          Fashion
        </div>
        <div style={{ fontFamily: fonts.serif, fontWeight: 800, fontSize: 64, letterSpacing: 26, marginRight: -26, marginTop: 20, color: colors.paper }}>
          MAGAZINES
        </div>
      </div>
      <div
        style={{
          width: interpolate(frame, [0, 0.8 * fps], [0, 900], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          height: 2,
          backgroundColor: colors.red,
        }}
      />
      <div
        style={{
          marginTop: 120,
          padding: "34px 70px",
          backgroundColor: colors.paper,
          color: colors.ink,
          fontFamily: fonts.sans,
          fontWeight: 500,
          fontSize: 44,
          letterSpacing: 6,
          textTransform: "uppercase",
          opacity: interpolate(frame, [0.9 * fps, 1.3 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [0.9 * fps, 1.5 * fps], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      >
        Sammlung entdecken
      </div>
      <div
        style={{
          marginTop: 50,
          fontFamily: fonts.sans,
          fontWeight: 300,
          fontSize: 44,
          color: colors.paper,
          opacity: interpolate(frame, [1.1 * fps, 1.5 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        vintagefashionmagazines.com
      </div>
    </AbsoluteFill>
  );
};
