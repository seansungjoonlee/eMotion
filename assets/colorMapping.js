import blend_colors from '../blend_colors';

const colorMapping = {
  "joyful": "#FFF27A",
  "anxious":"#FF7A8C",
  "angry":"#CA7AFF",
  "sad":"#7AFF8C",
  "surprised":"#FFA07A"
};
colorMapping["joyful1"] = blend_colors(colorMapping["joyful"], colorMapping["surprised"], 0.3);
colorMapping["joyful2"] = blend_colors(colorMapping["joyful"], colorMapping["surprised"], 0.1);
colorMapping["joyful3"] = blend_colors(colorMapping["joyful"], colorMapping["anxious"], 0.1);
colorMapping["joyful4"] = blend_colors(colorMapping["joyful"], colorMapping["anxious"], 0.3);

colorMapping["anxious1"] = blend_colors(colorMapping["anxious"], colorMapping["joyful"], 0.3);
colorMapping["anxious2"] = blend_colors(colorMapping["anxious"], colorMapping["joyful"], 0.1);
colorMapping["anxious3"] = blend_colors(colorMapping["anxious"], colorMapping["angry"], 0.1);
colorMapping["anxious4"] = blend_colors(colorMapping["anxious"], colorMapping["angry"], 0.3);

colorMapping["angry1"] = blend_colors(colorMapping["angry"], colorMapping["anxious"], 0.3);
colorMapping["angry2"] = blend_colors(colorMapping["angry"], colorMapping["anxious"], 0.1);
colorMapping["angry3"] = blend_colors(colorMapping["angry"], colorMapping["sad"], 0.1);
colorMapping["angry4"] = blend_colors(colorMapping["angry"], colorMapping["sad"], 0.3);

colorMapping["sad1"] = blend_colors(colorMapping["sad"], colorMapping["angry"], 0.3);
colorMapping["sad2"] = blend_colors(colorMapping["sad"], colorMapping["angry"], 0.1);
colorMapping["sad3"] = blend_colors(colorMapping["sad"], colorMapping["surprised"], 0.1);
colorMapping["sad4"] = blend_colors(colorMapping["sad"], colorMapping["surprised"], 0.3);

colorMapping["surprised1"] = blend_colors(colorMapping["surprised"], colorMapping["sad"], 0.3);
colorMapping["surprised2"] = blend_colors(colorMapping["surprised"], colorMapping["sad"], 0.1);
colorMapping["surprised3"] = blend_colors(colorMapping["surprised"], colorMapping["joyful"], 0.1);
colorMapping["surprised4"] = blend_colors(colorMapping["surprised"], colorMapping["joyful"], 0.3);

export default colorMapping;