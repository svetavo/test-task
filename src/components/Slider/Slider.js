import ReactSlider from "react-slider";
import sliderStyles from "./Slider.module.css";

const Slider = ({ min, max, value, onChange }) => {
  console.log();
  return (
    <ReactSlider
      className={sliderStyles.slider}
      trackClassName="slider_track"
      min={min}
      max={max}
      onChange={onChange}
      value={value}
      thumbClassName={sliderStyles.slider_thumb}
      renderThumb={(props, state) => <div {...props}></div>}
    />
  );
};

export default Slider;
