pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

abstract contract EIP712Validator is EIP712 {
    /**
     * @dev Implementing the ECDSA algorithm for the `bytes32` type in order to
     * implement the `recover` function for it, which is used to recover the signer
     * address from the hashed voucher data.
     */
    using ECDSA for bytes32;

    /**
     * @dev Mapping to hold the state if token is minted. This is used to verify if a voucher
     * has been used or not.
     */
    mapping(bytes32 => bool) private minted;

    /// @dev Mint data struct.
    struct Mint721Data {
        bytes32 uuid;
        address to;
    }

    /// @dev Mint voucher typehash, pre-computed to save gas.
    // keccak256("Mint721Data(bytes32 uuid,address to)");
    bytes32 private constant TYPEHASH =
        0x89f1a7cb490bc161bcfcb52eb0eaaa4fdcc04e51c441d7765daca84d2e95d1ec;

    // solhint-disable-next-line no-empty-blocks
    constructor() EIP712("EIP712Validator", "1") {}

    /**
     * @dev Hash the typed data for the voucher supplied. This returns the hash of the encoded EIP712 message
     * for the specified domain, which in case is the voucher struct.
     */
    function _hash(Mint721Data calldata data)
        internal
        view
        returns (bytes32)
    {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        TYPEHASH,
                        data.uuid,
                        data.to
                    )
                )
            );
    }

    /**
     * @dev Verify if the voucher is valid, i.e. exists, and has not been used yet. Also
     * signatures are meant to be signed by valid signers, so this checks if it's not signed
     * by anyone, and only those who have the role to.
     */
    function verify(Mint721Data calldata data, bytes calldata signature)
        public
        view
        returns (bool success, address signer)
    {
        signer = _hash(data).recover(signature);
        success = !minted[data.uuid] && _isValidSigner(signer);
    }

    /**
     * @dev This function is to process voucher. This has internal check to ensure the voucher is not invalid,
     * If not, set the `minted` status to true, and finally returns the signer of the voucher.
     */
    function _verify(
        Mint721Data calldata data,
        bytes calldata signature
    ) internal returns (address) {
        bool success;
        address signer;

        // Ensure not minted
        (success, signer) = verify(data, signature);
        require(success, "Invalid voucher");

        // Set minted, if valid and invalidate the voucher.
        minted[data.uuid] = true;

        return signer;
    }

    /// @dev Abstract function to check if the signer is a valid one for the signature.
    function _isValidSigner(address signer)
        internal
        view
        virtual
        returns (bool);
}