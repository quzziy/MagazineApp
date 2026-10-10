import { Composition, Folder } from "remotion";
import { MagazineCover } from "./components/MagazineCover";
import { CoversScene } from "./scenes/CoversScene";
import { DecadesScene } from "./scenes/DecadesScene";
import { EndCardScene } from "./scenes/EndCardScene";
import { OpeningScene } from "./scenes/OpeningScene";
import { PromiseScene } from "./scenes/PromiseScene";
import { ShopPromo } from "./ShopPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="ShopPromo" component={ShopPromo} durationInFrames={450} fps={30} width={1080} height={1920} />
      <Folder name="Szenen">
        <Composition id="Auftakt" component={OpeningScene} durationInFrames={100} fps={30} width={1080} height={1920} />
        <Composition id="Cover" component={CoversScene} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="Jahrzehnte" component={DecadesScene} durationInFrames={100} fps={30} width={1080} height={1920} />
        <Composition id="Versprechen" component={PromiseScene} durationInFrames={70} fps={30} width={1080} height={1920} />
        <Composition id="Abschluss" component={EndCardScene} durationInFrames={90} fps={30} width={1080} height={1920} />
      </Folder>
      <Folder name="Elemente">
        <Composition
          id="MagazinCover"
          component={MagazineCover}
          durationInFrames={60}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            masthead: "VOGUE",
            edition: "Paris",
            month: "Septembre",
            year: "1984",
            price: "80 €",
            coverColor: "#cc1a1a",
            accentColor: "#f7f4ef",
            style: { left: 260, top: 580 },
          }}
        />
      </Folder>
    </>
  );
};
