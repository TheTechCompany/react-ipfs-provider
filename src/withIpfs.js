/*
 * withIPFS
 *
 * connect component to IPFS context created in IPFSProvider
 *
 */
import React from 'react';
import { withContext } from 'with-context';

import AppContext from './ipfsContext';

export default withContext(AppContext, "ipfs")
