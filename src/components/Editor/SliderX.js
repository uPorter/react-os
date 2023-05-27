import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion/dist/framer-motion";
import Input from "@mui/joy/Input";

const SliderX = (props) => {
  const { sendMessage, addEventListener, removeEventListener } = props;
  const [sliderValue, setSliderValue] = useState(0);
  const [isUpdatingValue, setIsUpdatingValue] = useState(true);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const handleDrag = useCallback((_, { offset }) => {
    if (offset.x > 110) {
      x.set(110);
    } else if (offset.x < -110) {
      x.set(-110);
    } else {
      x.set(offset.x);
    }
    sendMessage("Cube", "ChangeXPosition", parseFloat(displayValue.get().toFixed(2)));
  }, []);

  const handleXCord = useCallback((setXCord) => {
    setSliderValue(parseFloat(setXCord));
  }, []);


  useEffect(() => {
    addEventListener("setXCord", handleXCord);
    return () => {
      removeEventListener("setXCord", handleXCord);
    };
  }, [addEventListener, removeEventListener, handleXCord]);

  useEffect(() => {
    const checkXValue = () => {
      if (x.get() === 0) {
        setIsUpdatingValue(true);
        sendMessage("Cube", "SendXCoordToReact");
      }
    };
  
    const interval = setInterval(checkXValue, 100); // Her 100ms'de bir kontrol et
  
    return () => {
      clearInterval(interval); // Temizleme işlemi
    };
  }, [x]);

  const handleDragEnd = useCallback(
    (_, { offset }) => {
      const increment = offset.x / 500;
      const newValue = sliderValue + increment;
      console.log("DragEnd");
      const targetX = 500 / 100;
  
      setIsUpdatingValue(false); // Değer güncellemesini durdur
  
      const handleAnimationComplete = () => {
        x.set(0);
        setSliderValue(parseFloat(displayValue.get().toFixed(2)));
        sendMessage("Cube", "SendXCoordToReact");
  
        // İşlem tamamlandıktan sonra değeri tekrar güncelle
      };
  
      controls
        .start({ x: -targetX, opacity: 1 })
        .then(handleAnimationComplete);
  
      // handleAnimationComplete fonksiyonunu döndürerek
      // useEffect içinde async/await kullanımını engelleyelim
      return handleAnimationComplete;
    },
    [sliderValue, x, controls]
  );

  const displayValue = useTransform(
    x,
    [-100, 100],
    [sliderValue - 1, sliderValue + 1]
  );

  useAnimationFrame((deltaTime) => {
    if (isUpdatingValue) {
      setSliderValue((prevValue) => {
        const delta = displayValue.get() - prevValue;
        const increment = isNaN(delta) ? 0 : delta * 0.05;
        return prevValue + increment;
      });
    }
  });

  useEffect(() => {
    if (x.get() !== 0) {
      controls.start({ opacity: 0 });
    } else {
      controls.start({ opacity: 1 });
    }
  }, [x, controls]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "350px",
        marginTop: "25px",
        cursor: "ew-resize",
      }}
      className="slider-container"
    >
      <motion.div
        className="slider-track"
        style={{
          background:
            "repeating-radial-gradient(circle at center,#aaa,#aaa 2px,transparent 0,transparent 10px)",
          width: "215px",
          height: "2px",
          borderRadius: "515px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <motion.div
          className="slider-thumb"
          style={{
            transition:
              "box-shadow .2s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s",
            background: "#00000045",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            border: "2px solid #fff",
            position: "absolute",
            top: "-11px",
            x,
            opacity: controls.opacity,
          }}
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 15 }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />
      </motion.div>
      <Input
        className="editorInput"
        type="text"
        value={displayValue.get().toFixed(2)}
        onChange={(e) => setSliderValue(parseFloat(e.target.value))}
        style={{
          width: "70px",
          marginLeft: "35px",
          textAlign: "center",
          borderRadius: "5px",
          marginTop: "10px",
          border: "none",
          background: "#00000040",
          fontSize: "14px",
          fontWeight: "bold",
          color: "white",
          outline: "none",
        }}
      />
    </div>
  );
};

export default SliderX;

const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]);
};
