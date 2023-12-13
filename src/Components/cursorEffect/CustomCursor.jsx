import { useEffect, useState } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [interacting, setInteracting] = useState(false);

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const interactable = e.target.closest(".interactable");
      const isInteracting = interactable !== null;
      setInteracting(isInteracting);
      onMouseMove(e);
    };

    const updateCursor = () => {
      const cursor = document.querySelector(".custom-cursor");
      cursor.style.transform = `translate(${position.x}px, ${position.y}px) scale(${interacting ? 2 : 1})`;
      cursor.style.backgroundColor = interacting ? "" : "#FF554A";
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animateCursor = () => {
      updateCursor();
      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [position, interacting]);

  return <div className="custom-cursor"></div>;
};

export default CustomCursor;
