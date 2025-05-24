interface BubbleTextProps {
    text: string;
    style?: string;
}

const BubbleText = ({text, style}: BubbleTextProps) => {
  return (
    <Text text={text} style={style}/>
  );
};

const Text = ({text, style}: BubbleTextProps) => {
  return (
    <h2 className={style}>
      {text.split("").map((child, idx) => (
        <span className="hoverText" key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default BubbleText;