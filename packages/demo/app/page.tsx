'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Address, useAccount, useContractRead, useContractWrite, useSignTypedData } from 'wagmi';
import { ERC721LazyMintABI } from './lib/constants/abis/abis';
import { Typography } from '@mui/material';

export default function Page() {
  const { data: name } = useContractRead({
    abi: ERC721LazyMintABI,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: 'name'
  })

  const { data: symbol } = useContractRead({
    abi: ERC721LazyMintABI,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: 'symbol'
  })

  const { data: totalSupply } = useContractRead({
    abi: ERC721LazyMintABI,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: 'totalSupply'
  })

  const { write: safeMint } = useContractWrite({
    abi: ERC721LazyMintABI,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: 'safeMint'
  })

  const { address } = useAccount()

  const domain = {
    name: 'EIP712Validator',
    version: '1',
    chainId: 99999,
    verifyingContract: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
  } as const    

  const types = {
    Mint721Data: [
      { name: 'to', type: 'address' },
    ],
  } as const

  const message = {
    to: address as Address,
  } as const

  const { data: signData, signTypedData } =
    useSignTypedData({
      domain,
      message,
      primaryType: 'Mint721Data',
      types,
    })
  
  const { write: lazyMint } = useContractWrite({
    abi: ERC721LazyMintABI,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: 'lazyMint'
  })

  return (
    <Box>
      <Typography variant='h5'>
        {`${name} (${symbol})`}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant='body1'>Total token minted: {totalSupply?.toString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h6">
              Mint nft
            </Typography>
            <Button variant='contained' onClick={() => safeMint()}>Mint</Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h6">
              Lazy mint nft
            </Typography>
            <Typography variant='subtitle1'>
              Sign structure
            </Typography>
            <Typography variant='body1'>
              To: {address}
            </Typography>
            <Button variant='contained' onClick={() => signTypedData()}>Sign</Button>
            <Typography variant='body1'>Signature: {signData}</Typography>
            <Button variant='contained' onClick={() => {
              lazyMint({ args: [message, signData] })
            }}>Mint</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
