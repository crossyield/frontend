/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { StatSm, StatsSm } from "./Stats_sm";
import { toggleBackgroundBlur } from "@/lib/utils";
import DepositModal from "@/app/dashboard/components/DepositModal";
import BorrowModal from "@/app/dashboard/components/BorrowModal";
import WithdrawModal from "./WithdrawModal";

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
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleOpenDepositModal = () => {
    setIsDepositModalOpen(true);
    toggleBackgroundBlur(true); // Blur the background
  };

  const handleOpenBorrowModal = () => {
    setIsBorrowModalOpen(true);
    toggleBackgroundBlur(true); // Blur the background
  };

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
    toggleBackgroundBlur(true); // Blur the background
  };

  return (
    <div className="card w-96 border border-slate-500 rounded-xl hover:shadow-[0_35px_60px_-15px_rgba(20,241,149,0.3)]">
      <DepositModal
        title="Deposit"
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
      <BorrowModal
        title="Borrow Loan"
        isOpen={isBorrowModalOpen}
        onClose={() => setIsBorrowModalOpen(false)}
      />
      <WithdrawModal
        title="Withdraw"
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
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
            onClick={handleOpenDepositModal}
            className="btn btn-outline btn-success hover:bg-white hover:border-white rounded-xl w-72 lg:w-48"
          >
            Deposit
          </button>

          <button
            onClick={handleOpenBorrowModal}
            className="btn btn-primary hover:bg-white hover:border-white rounded-xl w-72 lg:w-48"
          >
            Borrow
          </button>
          {/* <button
            onClick={handleOpenWithdrawModal}
            className="btn btn-primary hover:bg-white hover:border-white rounded-xl w-72 lg:w-48"
          >
            Withdraw
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
