import blend_colors from '../blend_colors';

const basicColorMapping = {
  "joyful": "#FFF27A",
  "anxious":"#FF7A8C",
  "angry":"#CA7AFF",
  "sad":"#7AFF8C",
  "surprised":"#FFA07A",
};

function mapAllColors(basicColorMapping) {
  colorMapping = basicColorMapping;

  // colorMapping["content"] = blend_colors(colorMapping["joyful"], colorMapping["surprised"], 0.3);
  colorMapping["content"] = '#ffd97a';
  colorMapping["peaceful"] = "#ffea7a";
  colorMapping["playful"] = "#ffe67c";
  colorMapping["powerful"] = "#ffce7f";

  colorMapping["stressed"] = "#ff9e87";
  colorMapping["eager"] = "#ff868a";
  colorMapping["interested"] = "#fa7a98";
  colorMapping["excited"] = "#ef7aaf";

  colorMapping["dismayed"] = "#da7add";
  colorMapping["aggressive"] = "#cf7af4";
  colorMapping["bored"] = "#c287f4";
  colorMapping["frustrated"] = "#b2a2dd";

  colorMapping["hurt"] = "#92d7af";
  colorMapping["discouraged"] = "#82f298";
  colorMapping["melancholy"] = "#87f68a";
  colorMapping["small"] = "#a2e387";

  colorMapping["amazed"] = "#d7bd7f";
  colorMapping["stunned"] = "#f2aa7c";
  colorMapping["shocked"] = "#ffa87a";
  colorMapping["frightened"] = "#ffb97a";
  
  return colorMapping;
}

let colorMapping = mapAllColors(basicColorMapping);



const basicFeelings = ['joyful', 'anxious', 'angry', 'sad', 'surprised'];

const basicToSecondary = {"joyful": ["content","peaceful","playful","powerful"], 
                        "anxious": ["stressed","eager","interested","excited"],
                        "angry": ["dismayed","aggressive","bored","frustrated"],
                        "sad": ["hurt","discouraged","melancholy","small"],
                        "surprised": ["amazed","stunned","shocked","frightened"],};
                        
export { colorMapping, basicColorMapping, mapAllColors, basicFeelings, basicToSecondary };