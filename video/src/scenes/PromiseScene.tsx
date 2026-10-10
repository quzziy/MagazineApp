import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const PromiseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: 40,
    borderTop: `2px solid ${colors.ink}`,
    padding: "40px 0",
  };
  const noStyle: React.CSSProperties = {
    fontFamily: fonts.sans,
    fontWeight: 500,
    fontSize: 36,
    color: colors.red,
    letterSpacing: 4,
  };
  const textStyle: React.CSSProperties = {
    fontFamily: fonts.serif,
    fontWeight: 600,
    fontSize: 80,
    lineHeight: 1.05,
    letterSpacing: -2,
    color: colors.ink,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.paper, padding: "0 90px", justifyContent: "center" }}>
      <div
        style={{
          ...rowStyle,
          opacity: interpolate(frame, [0, 0.35 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [0, 0.6 * fps], ["0px 60px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      >
        <span style={noStyle}>01</span>
        <span style={textStyle}>Persönlich geprüft</span>
      </div>
      <div
        style={{
          ...rowStyle,
          opacity: interpolate(frame, [0.3 * fps, 0.65 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [0.3 * fps, 0.9 * fps], ["0px 60px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      >
        <span style={noStyle}>02</span>
        <span style={textStyle}>Archivgerecht verpackt</span>
      </div>
      <div
        style={{
          ...rowStyle,
          borderBottom: `2px solid ${colors.ink}`,
          opacity: interpolate(frame, [0.6 * fps, 0.95 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [0.6 * fps, 1.2 * fps], ["0px 60px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      >
        <span style={noStyle}>03</span>
        <span style={textStyle}>
          Direkt aus <em style={{ fontWeight: 400, color: colors.red }}>Bonn</em>
        </span>
      </div>
    </AbsoluteFill>
  );
};
