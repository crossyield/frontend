"use client";
import React, {useState} from "react";
import { toggleBackgroundBlur } from "../../../lib/utils";
import { useVault } from "@/components/ContractInteraction";
import { useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { ethers } from "ethers";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const BorrowModal = ({ title, isOpen, onClose }: ModalProps) => {

    const {contract: Vault} = useVault();

    const [borrowValue, setBorrowValue] = useState("");
    const { 
        mutateAsync: borrowAmount , 
        isLoading: loadingborrowAmount, 
        error: borrowAmountError,
    } = useContractWrite(Vault, "borrow");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Directly store the string value; conversion will happen before contract interaction
        setBorrowValue(event.target.value);
    };

    let finalBorrowValue: ethers.BigNumber | undefined;
    try {
        // Ensure we only convert when depositValue has a valid number
        if (borrowValue) {
            finalBorrowValue = ethers.utils.parseUnits(borrowValue, 6);
        } else {
            finalBorrowValue = ethers.BigNumber.from(0);
        }
    } catch (error) {
        console.error("Error in BigNumber conversion:", error);
        finalBorrowValue = ethers.BigNumber.from(0);
    }

    const handleBorrow = async () => {
        const finalBorrowValue = ethers.utils.parseUnits(borrowValue, 6);
        try {
            await borrowAmount({
                args: [
                    finalBorrowValue, // Correctly formatted BigNumber value
                ],
            });
            console.log("Borrow successful");
        } catch (error) {
            console.error("Borrow error:", error);
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
                placeholder="🪙 0.1"
                className="input input-bordered w-full max-w-lg rounded-xl"
                onChange={handleChange} // Corrected to "onChange"
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
                <Web3Button
                // add deposit function to the onClick event
                contractAddress={Vault.getAddress() || ""}
                contractAbi={Vault.abi}
                action={handleBorrow}
                >
                Borrow
                </Web3Button>
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
