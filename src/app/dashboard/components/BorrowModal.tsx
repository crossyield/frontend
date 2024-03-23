"use client";
import React, {useState} from "react";
import { toggleBackgroundBlur } from "../../../lib/utils";
import { useVault } from "@/components/ContractInteraction";
import { useContractWrite } from "@thirdweb-dev/react";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const BorrowModal = ({ title, isOpen, onClose }: ModalProps) => {

    const {contract: Vault} = useVault();

    const [borrowValue, setBorrowValue] = useState(0);
    const { 
        mutateAsync: borrowAmount , 
        isLoading: loadingborrowAmount, 
        error: borrowAmountError,
    } = useContractWrite(Vault, "borrow");
    
    const handleBorrow = async () => {
        if(borrowValue > 0) {
            try {
                await borrowAmount({args: [borrowValue]});
                // Optionally, reset depositValue to 0 or handle success
                setBorrowValue(0);
                console.log('Borrow successful');
            } catch (error) {
                // Handle error
                console.error('Borrow error:', error);
            }
        }
    };

    const handleModalClose = () => {
    onClose();
    toggleBackgroundBlur(false); // Remove blur when modal closes
    };

    return (
    <>
        {isOpen && (
        <dialog id="deposit_modal" className="modal modal-small" open>
            <div className="modal-box dropshadow ">
            <h3 className="font-bold text-2xl">{title}</h3>
            <br />

            <div className="">
                <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-bold">Amount</span>
                </div>
                <input
                    type="number"
                    placeholder="🪙 0.1"
                    className="input input-bordered w-full max-w-lg rounded-xl"
                    value={borrowValue}
                />
                <div className="label">
                    <span className="label-text-alt">$0.00</span>
                    <span className="label-text-alt">Balance:</span>
                </div>
                </label>
            </div>

            <h1 className="font-bold mt-4">Transaction Details</h1>
            <div className="my-10 max-w-lg ">
                <div className="label">
                <span className="label-text-alt">🪙 Can borrow up to</span>
                <span className="label-text-alt">0</span>
                </div>
                <div className="label">
                <span className="label-text-alt">⛽ Transaction fees</span>
                <span className="label-text-alt">-</span>
                </div>
            </div>

            <div className="modal-action flex flex-col items-center justify-center my-2 gap-2">
                <button
                // add deposit function to the onClick event
                className="btn btn-primary rounded-xl w-48 hover:bg-white hover:border-white"
                onClick={handleBorrow}
                >
                Borrow
                </button>
            </div>
            <div className="modal-action flex flex-col items-center justify-center my-2 gap-2">
                <form method="dialog">
                <button
                    onClick={handleModalClose}
                    className="btn btn-outline btn-error rounded-xl w-48"
                >
                    Close
                </button>
                </form>
            </div>
            </div>
        </dialog>
        )}
    </>
);
};

export default BorrowModal;
