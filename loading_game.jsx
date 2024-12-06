import React, { useState, useEffect } from "react";

const LoadingGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [targetColor, setTargetColor] = useState("red"); // State for target color

  useEffect(() => {
    // Simulate loading time (e.g., fetch data)
    const loadingTimer = setTimeout(() => setIsLoading(false), 30000); // 30 seconds

    // Move target every second
    const moveTargetTimer = setInterval(() => {
      setTargetPosition({
        x: Math.random() * 90, // Random position (0-90% of the container width/height)
        y: Math.random() * 90,
      });
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(moveTargetTimer);
    };
  }, []);

  const handleClick = () => {
    setScore((prevScore) => prevScore + 1);
    // Change color randomly on click
    const colors = ["red", "blue", "green", "orange", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
  };

  if (!isLoading) {
    return <div>Your content has loaded! 🎉</div>;
  }

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.target,
          top: `${targetPosition.y}%`,
          left: `${targetPosition.x}%`,
          backgroundColor: targetColor, // Apply dynamic color
        }}
        onClick={handleClick}
      />
      <p style={styles.score}>Score: {score}</p>
      <p style={styles.message}>Click the target before the page loads!</p>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  target: {
    position: "absolute",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "top 0.5s, left 0.5s, background-color 0.3s",
  },
  score: {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "20px",
    color: "#333",
  },
  message: {
    position: "absolute",
    bottom: "10px",
    fontSize: "16px",
    color: "#555",
  },
};

export default LoadingGame;
