type ConfettiParticle = {
  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngleIncremental: number;
  tiltAngle: number;
  draw: () => void;
};
// const context: CanvasRenderingContext2D | null = canvas?.getContext("2d");
const possibleColors: string[] = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson",
];

const maxConfettis: number = 150;

function randomFromTo(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

class ConfettiParticleClass {
  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngleIncremental: number;
  tiltAngle: number;
  W: number | undefined;
  H: number | undefined;
  canvas: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | null;

  constructor(W: number, H: number, canvas: HTMLCanvasElement) {
    this.x = Math.random() * W; // x
    this.y = Math.random() * H - H; // y
    this.r = randomFromTo(11, 33); // radius
    this.d = Math.random() * maxConfettis + 11;
    this.color =
      possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;
    this.context = canvas.getContext("2d");
  }

  draw() {
    if (!this.context) return;
    this.context.beginPath();
    this.context.lineWidth = this.r / 2;
    this.context.strokeStyle = this.color;
    this.context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    this.context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return this.context.stroke();
  }
}

const initialAnimation = () => {
  let W: number = window.innerWidth;
  let H: number = window.innerHeight;
  const canvas: HTMLCanvasElement | null = window.document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  const context: CanvasRenderingContext2D | null = canvas?.getContext("2d");
  const maxConfettis: number = 150;
  const particles: ConfettiParticle[] = [];

  function Draw() {
    const results = [];

    // Magical recursive functional love
    requestAnimationFrame(Draw);

    if (!context) return;
    context.clearRect(0, 0, W, window.innerHeight);

    for (let i = 0; i < maxConfettis; i++) {
      results.push(particles[i].draw());
    }

    let particle: ConfettiParticle;
    let remainingFlakes: number = 0;
    for (let i = 0; i < maxConfettis; i++) {
      particle = particles[i];

      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
      particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

      if (particle.y <= H) remainingFlakes++;

      // If a confetti has fluttered out of view,
      // bring it back to above the viewport and let if re-fall.
      if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
        particle.x = Math.random() * W;
        particle.y = -30;
        particle.tilt = Math.floor(Math.random() * 10) - 20;
      }
    }

    return results;
  }

  window.addEventListener(
    "resize",
    function () {
      W = window.innerWidth;
      H = window.innerHeight;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    },
    false
  );

  // Push new confetti objects to `particles[]`
  for (let i = 0; i < maxConfettis; i++) {
    particles.push(new ConfettiParticleClass(W, H, canvas));
  }

  // Initialize
  if (!canvas) return null;
  canvas.width = W;
  canvas.height = H;
  Draw();
};

export default initialAnimation;
