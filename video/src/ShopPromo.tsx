import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { useVideoConfig } from "remotion";
import { CoversScene } from "./scenes/CoversScene";
import { DecadesScene } from "./scenes/DecadesScene";
import { EndCardScene } from "./scenes/EndCardScene";
import { OpeningScene } from "./scenes/OpeningScene";
import { PromiseScene } from "./scenes/PromiseScene";

// 100 + 150 + 100 + 70 + 90 − 4 × 15 (Übergänge) = 450 Frames = 15 s
export const ShopPromo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Auftakt" durationInFrames={100} premountFor={fps}>
        <OpeningScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence name="Cover" durationInFrames={150} premountFor={fps}>
        <CoversScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence name="Jahrzehnte" durationInFrames={100} premountFor={fps}>
        <DecadesScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence name="Versprechen" durationInFrames={70} premountFor={fps}>
        <PromiseScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence name="Abschluss" durationInFrames={90} premountFor={fps}>
        <EndCardScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
