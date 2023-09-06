'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Address, useContractRead, useContractWrite } from 'wagmi';
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
