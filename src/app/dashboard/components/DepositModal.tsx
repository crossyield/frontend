"use client";
import React, {useState} from "react";
import { toggleBackgroundBlur } from "../../../lib/utils";
import { useVault } from "@/components/ContractInteraction";
import { useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";


type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const DepositModal = ({ title, isOpen, onClose }: ModalProps) => {
// contract interaction
    const {contract: Vault} = useVault();

    const [depositValue, setDepositValue] = useState(0);
    const { 
        mutateAsync: depositAmount , 
        isLoading: loadingdepositAmount, 
        error: depositAmountError,
    } = useContractWrite(Vault, "_deposit");
    
    const handleDeposit = async () => {
        if(depositValue > 0) {
            try {
                await depositAmount({args: [depositValue]});
                // Optionally, reset depositValue to 0 or handle success
                setDepositValue(0);
                console.log('Deposit successful');
            } catch (error) {
                // Handle error
                console.error('Deposit error:', error);
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
        <dialog
            id="deposit_modal"
            className="modal modal-middle sm:modal-middle"
            open
        >
            <div className="modal-box dropshadow">
            <h3 className="font-bold text-2xl">{title}</h3>
            <br />

            <div className="">
                <label className="form-control md:max-w-lg">
                <div className="label">
                    <span className="label-text font-bold">Amount</span>
                </div>
                <input
                    type="number"
                    placeholder="🪙 0.1"
                    className="input input-bordered w-full lg:max-w-lg rounded-xl"
                    value={depositValue}
                />
                <div className="label">
                    <span className="label-text-alt">${}</span>
                    <span className="label-text-alt">Balance: {}</span>
                </div>
                </label>
            </div>

            <h1 className="font-bold mt-4">Transaction Details</h1>
            <div className="my-10 md:max-w-lg">
                <div className="label">
                <span className="label-text-alt">🪙 APR</span>
                <span className="label-text-alt">0</span>
                </div>
                <div className="label">
                <span className="label-text-alt">⛽ Transaction fees</span>
                <span className="label-text-alt">{}</span>
                </div>
            </div>

            <div className="modal-action flex flex-col items-center justify-center my-2 gap-2">
                <button
                className="btn btn-primary rounded-xl w-48 hover:bg-white hover:border-white"
                onClick={handleDeposit}
                >
                Deposit
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

    export default DepositModal;
