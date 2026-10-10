import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

type DecadeProps = {
  readonly decade: string;
  readonly keywords: string;
};

const Decade: React.FC<DecadeProps> = ({ decade, keywords }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: fonts.serif,
          fontStyle: "italic",
          fontSize: 420,
          lineHeight: 1,
          letterSpacing: -12,
          color: colors.paper,
          opacity: interpolate(frame, [0, 0.25 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 1.1 * fps], [1.15, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
            output: "perceptual-scale",
          }),
        }}
      >
        {decade}
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontWeight: 400,
          fontSize: 46,
          letterSpacing: 4,
          color: colors.paper,
          marginTop: 40,
          opacity: interpolate(frame, [0.15 * fps, 0.45 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {keywords}
      </div>
    </AbsoluteFill>
  );
};

export const DecadesScene: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 90,
          right: 90,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: fonts.sans,
          fontSize: 32,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: colors.paper,
        }}
      >
        <span style={{ color: colors.red, fontWeight: 500 }}>N° 02</span>
        <span>Wähle deine Ära</span>
      </div>
      <Sequence name="70er" durationInFrames={Math.round(1.1 * fps)} premountFor={fps}>
        <Decade decade="70er" keywords="Boho · Disco · Studio 54" />
      </Sequence>
      <Sequence name="80er" from={Math.round(1.1 * fps)} durationInFrames={Math.round(1.1 * fps)} premountFor={fps}>
        <Decade decade="80er" keywords="Power Dressing · Lagerfeld" />
      </Sequence>
      <Sequence name="90er" from={Math.round(2.2 * fps)} premountFor={fps}>
        <Decade decade="90er" keywords="Supermodels · Minimalismus" />
      </Sequence>
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 90,
          right: 90,
          height: 2,
          backgroundColor: colors.red,
        }}
      />
    </AbsoluteFill>
  );
};
