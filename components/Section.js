import React from "react";
import Section_Text from "./Section_Text";
import Section_Tile from "./Section_Tile";


const Section = ({ content }) => {
  console.log(content.type);
  {
    switch (content.type) {
      case "text":
        return <Section_Text content={content} />;
        break;
      case "tile":
        return <Section_Tile content={content} />;
        break;
      default:
        return "invalid section type";
    }
  }
};

export default Section;
