/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { StatSm, StatsSm } from "./Stats_sm";

type CardProps = {
  title: string;
  description: string;
  imageUrl: string;
// add new prop
};

const Card = ({
  title,
  description,
  imageUrl,
  }: CardProps) => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleOpenDepositModal = () => {
    setIsDepositModalOpen(true);
  };

  const handleOpenBorrowModal = () => {
    setIsBorrowModalOpen(true);
  };

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  return (
    <div className="card w-96 border border-slate-500 rounded-xl ]">
      
      <figure>
        <img src={imageUrl} alt="card" className="h-[200px] w-full" />
      </figure>
      <div className="card-body">
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
          <button
            onClick={handleOpenWithdrawModal}
            className="btn btn-primary hover:bg-white hover:border-white rounded-xl w-72 lg:w-48"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
