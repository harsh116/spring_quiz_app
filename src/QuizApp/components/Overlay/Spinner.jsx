import "./Spinner.css";

// use 'npm i react-loader-spinner@4.0.0
import Loader from "react-loader-spinner";

// expected props:
// visible: boolean ,
// classes: string,
// color: string,
// text: string
// https://mhnpd.github.io/react-loader-spinner/docs/category/components/
/* text : Radio,Audio,Ball Triangle,Bars,Blocks,Circles With Bar,Circles,Color Ring,Comment,Discuss,
DNA,Falling Lines,Fidget Spinner,Grid,Hearts,Hourglass,
Infinity Spin,LineWave,MagnifyingGlass,Mutating Dots,Oval,Progress Bar,Puff,
RevolvingDot,Rings,Rotating Lines,Rotating Square,
Rotating Triangles,Tail Spin,Three Circles,Three Dots,Triangle, Vortex
, Watch*/
function Spinner(props) {
  const { visible, text, type } = props;
  let classes = props.classes || "";
  const color = props.color || "#fff";
  let color1 = props.color;
  //   console.log("is spinner visible: ", visible);
  return (
    <div className={`Spinner ${classes} ${visible ? "" : "none"}`}>
      <Loader
        type={type}
        color={color}
        height={50}
        width={50}
        timeout={0} //30 secs
      />
      <span style={color1 ? { color: color } : {}} class="Loading_Text">
        {text}
      </span>
    </div>
  );
}

export default Spinner;
