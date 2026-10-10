import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.paper, padding: "0 90px", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: fonts.sans,
          fontWeight: 500,
          fontSize: 34,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: colors.red,
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Kuratiert · Geprüft · Authentisch
      </div>
      <div
        style={{
          height: 3,
          backgroundColor: colors.ink,
          marginTop: 36,
          marginBottom: 48,
          width: interpolate(frame, [0.2 * fps, 1 * fps], [0, 900], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      />
      <div style={{ fontFamily: fonts.serif, color: colors.ink, fontSize: 136, lineHeight: 1.04, letterSpacing: -4 }}>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontWeight: 600,
              translate: interpolate(frame, [0.4 * fps, 1.1 * fps], ["0px 200px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              }),
            }}
          >
            Mode,
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontWeight: 600,
              translate: interpolate(frame, [0.6 * fps, 1.3 * fps], ["0px 200px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              }),
            }}
          >
            die Geschichte
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: colors.red,
              translate: interpolate(frame, [0.8 * fps, 1.5 * fps], ["0px 200px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              }),
            }}
          >
            schrieb.
          </div>
        </div>
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontWeight: 300,
          fontSize: 46,
          lineHeight: 1.35,
          color: colors.ink,
          marginTop: 64,
          opacity: interpolate(frame, [1.6 * fps, 2.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Originale Modemagazine aus fünf Jahrzehnten.
      </div>
    </AbsoluteFill>
  );
};
