"use client";
import React, {useState} from "react";
import { toggleBackgroundBlur } from "../../../lib/utils";
import { useVault } from "@/components/ContractInteraction";
import { useContractRead, useContractWrite, Web3Button, useContract, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const DepositModal = ({ title, isOpen, onClose }: ModalProps) => {
// contract interaction
    const {contract: Vault} = useVault();

    const { 
        mutateAsync: depositAmount , 
        isLoading: loadingdepositAmount, 
        error: depositAmountError,
    } = useContractWrite(Vault, "depositToVault");

    const [depositValue, setDepositValue] = useState("");

     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Directly store the string value; conversion will happen before contract interaction
        setDepositValue(event.target.value);
    };

    let finalDepositValue: ethers.BigNumber | undefined;
    try {
        // Ensure we only convert when depositValue has a valid number
        if (depositValue) {
            finalDepositValue = ethers.utils.parseUnits(depositValue, 6);
        } else {
            finalDepositValue = ethers.BigNumber.from(0);
        }
    } catch (error) {
        console.error("Error in BigNumber conversion:", error);
        finalDepositValue = ethers.BigNumber.from(0);
    }

    const handleDeposit = async () => {
        // Convert depositValue to a BigNumber, scaled appropriately
        const finalDepositValue = ethers.utils.parseUnits(depositValue, 6);
        try {
            await depositAmount({
                args: [
                    "0xeDC2B3Bebbb4351a391363578c4248D672Ba7F9B", // tokenIn address
                    "0xFA0bd2B4d6D629AdF683e4DCA310c562bCD98E4E", // tokenOut address
                    finalDepositValue, // Correctly formatted BigNumber value
                ],
            });
            console.log("Deposit successful");
        } catch (error) {
            console.error("Deposit error:", error);
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
                        // type="number"
                        placeholder="🪙 0.1"
                        className="input input-bordered w-full lg:max-w-lg rounded-xl"
                        onChange={handleChange} // Add onChange event handler to update the depositValue state
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
                <Web3Button
                // className="btn btn-primary rounded-xl w-48 hover:bg-white hover:border-white"
                contractAddress={Vault.getAddress() || ""}
                contractAbi={Vault.abi}
                action={handleDeposit}
                >
                Deposit
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

    export default DepositModal;
