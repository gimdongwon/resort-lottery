import React, { useEffect } from "react";
import styles from "@/app/components/WinningNumber/WinningNumber.module.css";
import initialAnimation from "@/app/hooks/ConfettiParticleClass";

type Props = {
  winningNumber: number;
};

function WinningNumber({ winningNumber }: Props): JSX.Element {
  useEffect(() => {
    initialAnimation();
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
      <p className={styles.winning_number}>당첨번호 {winningNumber}</p>
    </>
  );
}

export default WinningNumber;
