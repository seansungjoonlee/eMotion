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

  colorMapping["content"] = blend_colors(colorMapping["joyful"], colorMapping["surprised"], 0.3);
  colorMapping["peaceful"] = blend_colors(colorMapping["joyful"], colorMapping["surprised"], 0.1);
  colorMapping["playful"] = blend_colors(colorMapping["joyful"], colorMapping["anxious"], 0.1);
  colorMapping["powerful"] = blend_colors(colorMapping["joyful"], colorMapping["anxious"], 0.3);

  colorMapping["stressed"] = blend_colors(colorMapping["anxious"], colorMapping["joyful"], 0.3);
  colorMapping["eager"] = blend_colors(colorMapping["anxious"], colorMapping["joyful"], 0.1);
  colorMapping["interested"] = blend_colors(colorMapping["anxious"], colorMapping["angry"], 0.1);
  colorMapping["excited"] = blend_colors(colorMapping["anxious"], colorMapping["angry"], 0.3);

  colorMapping["dismayed"] = blend_colors(colorMapping["angry"], colorMapping["anxious"], 0.3);
  colorMapping["aggressive"] = blend_colors(colorMapping["angry"], colorMapping["anxious"], 0.1);
  colorMapping["bored"] = blend_colors(colorMapping["angry"], colorMapping["sad"], 0.1);
  colorMapping["frustrated"] = blend_colors(colorMapping["angry"], colorMapping["sad"], 0.3);

  colorMapping["hurt"] = blend_colors(colorMapping["sad"], colorMapping["angry"], 0.3);
  colorMapping["discouraged"] = blend_colors(colorMapping["sad"], colorMapping["angry"], 0.1);
  colorMapping["melancholy"] = blend_colors(colorMapping["sad"], colorMapping["surprised"], 0.1);
  colorMapping["small"] = blend_colors(colorMapping["sad"], colorMapping["surprised"], 0.3);

  colorMapping["amazed"] = blend_colors(colorMapping["surprised"], colorMapping["sad"], 0.3);
  colorMapping["stunned"] = blend_colors(colorMapping["surprised"], colorMapping["sad"], 0.1);
  colorMapping["shocked"] = blend_colors(colorMapping["surprised"], colorMapping["joyful"], 0.1);
  colorMapping["frightened"] = blend_colors(colorMapping["surprised"], colorMapping["joyful"], 0.3);
  
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