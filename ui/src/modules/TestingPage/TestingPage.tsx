import React, { useRef, useState, useEffect } from "react";

import blurred from "../../resources/assets/blurred2.jpg";
import normal from "../../resources/assets/norma2.png";

const radius = 64;

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor fermentum nibh eget ornare. Mauris tempus nibh non mi ornare, a vestibulum dui eleifend. Proin sagittis, ligula varius semper scelerisque, est nulla ullamcorper sapien, nec varius justo purus ac nulla. Aliquam ante justo, rutrum sed ligula a, auctor venenatis massa. Etiam malesuada nulla luctus, convallis mi et, vestibulum leo. Maecenas ullamcorper sagittis elit, in facilisis nibh pellentesque quis. Mauris quis tincidunt massa. Nulla imperdiet, massa ultricies tincidunt pharetra, augue lectus tempus magna, ac posuere leo massa a ligula. Duis a molestie odio. Nullam rutrum, dolor aliquet dapibus ornare, massa nulla placerat tortor, vitae varius risus tellus sed neque.

In id ante eu purus euismod imperdiet sed a mi. Aliquam ut dignissim nulla. Nam at eros cursus, maximus dui sed, bibendum ex. Sed scelerisque ante sed quam viverra, vel sagittis massa feugiat. Sed tempus pellentesque mauris eu fringilla. Quisque pretium venenatis lobortis. Cras interdum ornare ipsum, nec fermentum felis posuere consequat. Suspendisse suscipit magna sit amet nisl auctor, ut sagittis quam iaculis. Sed hendrerit tempor rutrum. Donec vitae rutrum est, eget suscipit ex.`;

export const TestingPage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [textRelativePosition, setTextRelativePosition] = useState<
    Record<string, number | null>
  >({
    x: null,
    y: null,
  });
  const [textHeight, setTextHeight] = useState(0);
  // const [imageWidth, setImageWidth] = useState(0);

  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const height = textRef.current!.getBoundingClientRect().height;
      setTextHeight(height);
    }
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const { clientX, clientY } = e;
    setCursorPosition({ x: clientX, y: clientY });

    const target = e.target as HTMLElement;

    // const targetIsText = target.id === 'blurred-text';

    if (target.id === "blurred-text") {
      const { width, height } = target.getBoundingClientRect();
      //  const percentageX = targetIsText
      //     ? (clientX / width) * 100
      //     : (clientX / (width + 800)) * 100;
      const percentageX = (clientX / width) * 100;
      //  const percentageY = ((clientY - radius) / height) * 100;
      const percentageY = (clientY / height) * 100;

      return setTextRelativePosition({ x: percentageX, y: percentageY });
    }

    setTextRelativePosition({ x: null, y: null });
  };

  const getCroppedStyles = () => {
    const { x, y } = cursorPosition;
    const yCorrection = y - textHeight;
    // const yCorrection = y - radius - textHeight;

    return {
      clipPath: `circle(${radius}px at ${x}px ${yCorrection}px)`,
    };
  };

  const getMaskStyles = () => {
    const { x, y } = textRelativePosition;

    if (x === null) return;

    return {
      WebkitMaskImage: `radial-gradient(${radius}px at ${x}% ${y}%, transparent 100%, black 100%)`,
      maskImage: `radial-gradient(${radius}px at ${x}% ${y}% , transparent 100%, black 100%)`,
    };
  };

  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const refElement = ref.current!;

    const config = {
      attributes: true,
      attributeFilter: ["style"],
    };
    const observer = new MutationObserver((mutations) => {
      const { x, y } = cursorPosition;

      mutations.forEach((mutation) => {
        if (mutation.attributeName === "style") {
          const style = refElement.getAttribute("style");
          if (style) {
            const match = style.match(/circle\((\d+)px/);
            if (!match) {
              refElement.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
            }
            if (match && match[1]) {
              const currentRadius = parseInt(match[1], 10);
              if (currentRadius !== radius) {
                console.log("try return");
                refElement.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
              }
            }
          }
        }
      });
    });
    observer.observe(ref.current as Node, config);

    return () => {
      observer.disconnect();
    };
  }, [cursorPosition]);

  return (
    <div onMouseMove={handleMouseMove} style={{ cursor: "none" }}>
      <h1 style={{ margin: 0 }}>Hello Testing Page</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <div
            id="blurred-text"
            style={{
              backdropFilter: "blur(3px)",
              position: "absolute" as "absolute",
              top: 0,
              height: "100%",
              width: "100%",

              ...getMaskStyles(),
            }}
          ></div>
          <div
            style={{ margin: 0, paddingBottom: "18px", fontSize: "18px" }}
            ref={textRef}
          >
            {text}
          </div>
        </div>
        <div
          ref={imageRef}
          style={{
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
          }}
        >
          <img
            // onLoad={(e) => {
            //    const target = e.target as HTMLImageElement;
            //    const width = target.getBoundingClientRect().width;
            //    setImageWidth(width);
            // }}
            src={blurred}
            alt="Blurred Question"
            style={{
              position: "absolute",
            }}
          />
          <img
            id="normal-image"
            ref={ref}
            src={normal}
            alt="Normal Question"
            style={{
              ...getCroppedStyles(),
              position: "relative",
              zIndex: 1000,
            }}
          />
        </div>
      </div>
    </div>
  );
};
