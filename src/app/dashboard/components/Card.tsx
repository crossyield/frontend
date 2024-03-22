/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { StatSm, StatsSm } from "./Stats_sm";
import { toggleBackgroundBlur } from "@/lib/utils";
import DepositDYSNModal from "@/app/dashboard/components/DepositDYSNModal";
import BorrowModal from "@/app/dashboard/components/BorrowModal";
import DepositUSDCModal from "./DepositUSDCModal";

type CardProps = {
  title: string;
  description: string;
  imageUrl: string;
  statsTitle: string;
  statsValue: string;
};

const Card = ({
  title,
  description,
  imageUrl,
  statsTitle,
  statsValue,
}: CardProps) => {
  const [isDepositDYSNModalOpen, setIsDepositDYSNModalOpen] = useState(false);
  const [isDepositUSDCModalOpen, setIsDepositUSDCModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const handleOpenDepositDYSNModal = () => {
    setIsDepositDYSNModalOpen(true);
    toggleBackgroundBlur(true);
  };

  const handleOpenBorrowModal = () => {
    setIsBorrowModalOpen(true);
    toggleBackgroundBlur(true);
  };

  const handleOpenDepositUSDCModal = () => {
    setIsDepositUSDCModalOpen(true);
    toggleBackgroundBlur(true);
  };

  return (
    <div className="card w-96 border border-slate-500 rounded-xl hover:shadow-[0_35px_60px_-15px_rgba(20,241,149,0.3)]">
      <DepositDYSNModal
        title="Deposit DYSN"
        isOpen={isDepositDYSNModalOpen}
        onClose={() => setIsDepositDYSNModalOpen(false)}
      />
      <DepositUSDCModal
        title="Deposit USDC"
        isOpen={isDepositUSDCModalOpen}
        onClose={() => setIsDepositUSDCModalOpen(false)}
      />
      <BorrowModal
        title="Borrow Self-Repaying Loan"
        isOpen={isBorrowModalOpen}
        onClose={() => setIsBorrowModalOpen(false)}
      />
      <figure>
        <img src={imageUrl} alt="card" className="h-[240px] w-full" />
      </figure>
      <div className="card-body">
        <StatsSm>
          <StatSm title={statsTitle} value={statsValue} />
        </StatsSm>
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-center mt-4">
          <button
            onClick={handleOpenDepositDYSNModal}
            className="btn btn-outline btn-success hover:bg-white hover:border-white rounded-xl w-72 lg:w-48"
          >
            Deposit DYSN
          </button>

          <button
            onClick={handleOpenDepositUSDCModal}
            className="btn btn-outline btn-success hover:bg-white hover:border-white rounded-xl w-72 lg:w-48"
          >
            Deposit USDC
          </button>
          <button
            onClick={handleOpenBorrowModal}
            className="btn btn-primary hover:bg-white hover:border-white rounded-xl w-72 lg:w-48"
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
