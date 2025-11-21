import React, { useRef, useEffect } from "react";

const NeuralNetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 50 : 100; // Sparse network
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // Slow movement
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          baseSize: Math.random() * 2 + 1,
          color: "#00FFFF", // Cyan
          pulse: Math.random() * Math.PI * 2,
          firing: false,
          fireTimer: 0,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background is handled by CSS (transparent canvas)

      // Update and Draw Particles
      particles.forEach((p, index) => {
        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Pulse effect
        p.pulse += 0.05;
        const pulseEffect = Math.sin(p.pulse) * 0.5 + 1; // 0.5 to 1.5

        // Mouse Interaction
        let distToMouse = 10000;
        if (mouse.x != null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          distToMouse = Math.sqrt(dx * dx + dy * dy);
        }

        if (distToMouse < 150) {
          p.size = p.baseSize * 2; // Enlarge near mouse
        } else {
          p.size = p.baseSize;
        }

        // Firing Effect (Random neuron firing)
        if (!p.firing && Math.random() < 0.001) {
          p.firing = true;
          p.fireTimer = 20; // Frames to stay fired
        }

        if (p.firing) {
          p.fireTimer--;
          if (p.fireTimer <= 0) p.firing = false;
        }

        // Draw Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseEffect, 0, Math.PI * 2);
        ctx.fillStyle = p.firing ? "#39FF14" : "#00FFFF"; // Lime Green if firing, else Cyan
        ctx.shadowBlur = p.firing ? 20 : 10;
        ctx.shadowColor = p.firing ? "#39FF14" : "#00FFFF";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for lines

        // Draw Connections
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            let opacity = 1 - distance / 150;
            if (distToMouse < 150 && Math.sqrt((p2.x - mouse.x)**2 + (p2.y - mouse.y)**2) < 150) {
                opacity = 1; // Brighter if near mouse
                ctx.lineWidth = 1.5;
            } else {
                opacity *= 0.5; // Dimmer normally
                ctx.lineWidth = 0.5;
            }

            // Pulse line opacity
            opacity *= (Math.sin(Date.now() * 0.001) * 0.2 + 0.8);

            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // Mouse Event Listeners
    const handleMouseMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
        mouse.x = null;
        mouse.y = null;
    }

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 z-[-1]" />;
};

export default NeuralNetworkCanvas;
