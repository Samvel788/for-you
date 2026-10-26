import React, { useEffect, useRef } from 'react';

export default function CanvasBackground({ onCanvasClickTrigger }) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Gothic Petal & Leaf System
    const petalColors = [
      'rgba(180, 15, 35, 0.85)',
      'rgba(139, 0, 0, 0.8)',
      'rgba(110, 5, 20, 0.88)',
      'rgba(215, 25, 45, 0.75)',
      'rgba(74, 14, 23, 0.9)',
      'rgba(140, 70, 20, 0.75)' // deep autumn bronze tone
    ];

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -30;
        this.size = Math.random() * 12 + 10;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = Math.random() * 0.025 + 0.015;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.wobblePhase = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.y += this.speedY;
        this.wobblePhase += this.wobbleSpeed;
        this.x += Math.sin(this.wobblePhase) * 1.2 + this.speedX;
        this.rotation += this.rotationSpeed;
        this.flip += this.flipSpeed;

        if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        const scaleX = Math.cos(this.flip);
        c.scale(scaleX, 1);

        c.fillStyle = this.color;
        c.beginPath();
        c.moveTo(0, -this.size);
        c.bezierCurveTo(this.size * 0.7, -this.size * 0.7, this.size * 0.9, this.size * 0.3, 0, this.size);
        c.bezierCurveTo(-this.size * 0.9, this.size * 0.3, -this.size * 0.7, -this.size * 0.7, 0, -this.size);
        c.closePath();
        c.fill();

        c.strokeStyle = 'rgba(255, 200, 200, 0.15)';
        c.lineWidth = 0.8;
        c.beginPath();
        c.moveTo(0, -this.size * 0.8);
        c.quadraticCurveTo(this.size * 0.1, 0, 0, this.size * 0.8);
        c.stroke();

        c.restore();
      }
    }

    // Rising Embers System
    class Ember {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 20;
        this.size = Math.random() * 2.8 + 1;
        this.speedY = -(Math.random() * 1.5 + 0.6);
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.decay = Math.random() * 0.003 + 0.001;
        this.isGold = Math.random() > 0.5;
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.pulse) * 0.4;
        this.pulse += 0.03;
        this.alpha -= this.decay;

        if (this.y < -20 || this.alpha <= 0) {
          this.reset(false);
        }
      }

      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        const glowColor = this.isGold ? 'rgba(212, 175, 55, ' : 'rgba(220, 20, 60, ';
        c.fillStyle = this.isGold ? '#fce18b' : '#ff4d6d';
        c.shadowColor = glowColor + '0.9)';
        c.shadowBlur = this.size * 4;

        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Interactive Click Bursts (embers + glowing mystic shockwave rings)
    const activeSparks = [];
    const activeShockwaves = [];

    class Spark {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.5;
        this.size = Math.random() * 3.5 + 1.5;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.colorType = Math.random() > 0.4 ? 'crimson' : 'gold';
        this.gravity = 0.08;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
        this.alpha -= this.decay;
      }

      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        const isGold = this.colorType === 'gold';
        c.fillStyle = isGold ? '#ffd700' : '#ff1e42';
        c.shadowColor = isGold ? 'rgba(255, 215, 0, 0.9)' : 'rgba(255, 30, 66, 0.9)';
        c.shadowBlur = 12;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Gothic Mystic Rune Shockwave (Replacing romantic heart ripples)
    class MysticShockwave {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.maxRadius = Math.random() * 40 + 75;
        this.alpha = 0.9;
        this.growthRate = 2.8;
      }

      update() {
        this.radius += this.growthRate;
        this.alpha = Math.max(0, 0.9 * (1 - this.radius / this.maxRadius));
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.globalAlpha = Math.max(0, this.alpha);

        // Outer crimson energy ring
        c.strokeStyle = '#c4122d';
        c.lineWidth = 2;
        c.shadowColor = 'rgba(220, 20, 60, 0.85)';
        c.shadowBlur = 12;
        c.beginPath();
        c.arc(0, 0, this.radius, 0, Math.PI * 2);
        c.stroke();

        // Inner antique gold ring
        c.strokeStyle = 'rgba(212, 175, 55, 0.7)';
        c.lineWidth = 1;
        c.shadowColor = 'rgba(212, 175, 55, 0.6)';
        c.shadowBlur = 6;
        c.beginPath();
        c.arc(0, 0, this.radius * 0.7, 0, Math.PI * 2);
        c.stroke();

        // 4 Cardinal Gothic Accent Points (north, south, east, west)
        const d = this.radius;
        c.fillStyle = '#ffd700';
        const points = [
          [0, -d],
          [0, d],
          [-d, 0],
          [d, 0]
        ];
        for (const [px, py] of points) {
          c.beginPath();
          c.arc(px, py, 2.2, 0, Math.PI * 2);
          c.fill();
        }

        c.restore();
      }
    }

    const petalsCount = Math.min(36, Math.floor(width / 35));
    const embersCount = Math.min(48, Math.floor(width / 30));
    const petals = Array.from({ length: petalsCount }, () => new Petal());
    const embers = Array.from({ length: embersCount }, () => new Ember());

    const handleWindowClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      activeShockwaves.push(new MysticShockwave(clickX, clickY));

      for (let i = 0; i < 30; i++) {
        activeSparks.push(new Spark(clickX, clickY));
      }

      if (onCanvasClickTrigger) {
        onCanvasClickTrigger(clickX, clickY);
      }
    };

    window.addEventListener('pointerdown', handleWindowClick);

    let fogPhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      fogPhase += 0.005;
      const grad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(fogPhase) * 100,
        height * 0.6 + Math.cos(fogPhase * 0.8) * 60,
        width * 0.1,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      grad.addColorStop(0, 'rgba(74, 14, 23, 0.12)');
      grad.addColorStop(0.5, 'rgba(25, 4, 8, 0.08)');
      grad.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < embers.length; i++) {
        embers[i].update();
        embers[i].draw(ctx);
      }

      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw(ctx);
      }

      for (let i = activeSparks.length - 1; i >= 0; i--) {
        const spark = activeSparks[i];
        spark.update();
        if (spark.alpha <= 0) {
          activeSparks.splice(i, 1);
        } else {
          spark.draw(ctx);
        }
      }

      for (let i = activeShockwaves.length - 1; i >= 0; i--) {
        const shockwave = activeShockwaves[i];
        shockwave.update();
        if (shockwave.alpha <= 0 || shockwave.radius >= shockwave.maxRadius) {
          activeShockwaves.splice(i, 1);
        } else {
          shockwave.draw(ctx);
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handleWindowClick);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [onCanvasClickTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
