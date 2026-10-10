import type React from "react";
import { Interactive, type InteractivitySchema } from "remotion";
import { colors, fonts } from "../theme";

type MagazineCoverProps = {
  readonly masthead: string;
  readonly edition: string;
  readonly month: string;
  readonly year: string;
  readonly price: string;
  readonly coverColor: string;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

// Typografisches Platzhalter-Cover im Shop-Look.
// Echte Cover-Fotos können später per <Img src={staticFile(...)} /> ersetzt werden.
const MagazineCoverInner: React.FC<MagazineCoverProps> = ({
  masthead,
  edition,
  month,
  year,
  price,
  coverColor,
  accentColor,
  style,
}) => {
  return (
    <Interactive.Div
      style={{
        position: "absolute",
        width: 560,
        height: 760,
        backgroundColor: coverColor,
        boxShadow: "0 40px 80px rgba(13,13,14,0.35), 0 6px 18px rgba(13,13,14,0.25)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: colors.paper,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontWeight: 800,
          fontSize: 124,
          letterSpacing: -2,
          lineHeight: 1,
          marginTop: 36,
        }}
      >
        {masthead}
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontWeight: 500,
          fontSize: 26,
          letterSpacing: 12,
          textTransform: "uppercase",
          marginTop: 8,
          color: accentColor,
        }}
      >
        {edition}
      </div>
      <div
        style={{
          width: 420,
          height: 2,
          backgroundColor: "rgba(247,244,239,0.5)",
          marginTop: 28,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.serif,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 230,
          letterSpacing: -6,
          color: "rgba(247,244,239,0.92)",
        }}
      >
        {year}
      </div>
      <div
        style={{
          fontFamily: fonts.serif,
          fontStyle: "italic",
          fontSize: 44,
          marginBottom: 48,
        }}
      >
        {month}
      </div>
      <div
        style={{
          position: "absolute",
          right: 24,
          top: 210,
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: colors.red,
          border: `4px solid ${colors.paper}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.sans,
          fontWeight: 500,
          fontSize: 32,
          color: colors.paper,
          rotate: "-12deg",
        }}
      >
        {price}
      </div>
    </Interactive.Div>
  );
};

const magazineCoverSchema = {
  masthead: { type: "text-content", default: "VOGUE", description: "Titel" },
  edition: { type: "text-content", default: "Germany", description: "Ausgabe" },
  month: { type: "text-content", default: "September", description: "Monat" },
  year: { type: "text-content", default: "1984", description: "Jahr" },
  price: { type: "text-content", default: "80 €", description: "Preis" },
  coverColor: { type: "color", default: "#1c1410", description: "Cover-Farbe" },
  accentColor: { type: "color", default: "#cc1a1a", description: "Akzentfarbe" },
} as const satisfies InteractivitySchema;

export const MagazineCover = Interactive.withSchema({
  Component: MagazineCoverInner,
  componentName: "<MagazineCover>",
  schema: magazineCoverSchema,
  wrapInSequence: true,
});
