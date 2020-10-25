/*
 * IPFSProvider
 *
 * React Context Provider for IPFS
 *
 * props.ipfs - Optional pass your current IPFS node
 * props.repo - Set up a new IPFS node 
 *
 */

import React from 'react';

import { getIpfs, providers } from 'ipfs-provider';
import AppContext from './ipfsContext';

const { windowIpfs, httpClient, jsIpfs } = providers;

class IPFSProvider extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      ipfs: null,
      provider: null,
      id: null
    }
  } 

  componentDidMount(){
    if(!this.props.ipfs && !this.state.ipfs){
      this.loadIPFS().then((obj) => {
        this.initIPFS(obj.ipfs).then((id) => {
          this.setState({...obj, id: id})
        })
      })
    }else{
      this.initIPFS(this.props.ipfs).then((id) => {
        this.setState({ipfs: this.props.ipfs, id: id, provider: 'props'})
      })
    }
  }

  componentWillUnmount(){
    if(this.state.ipfs){
      this.state.ipfs.stop().catch(err => console.error(err))
    }
  }

  //Start a local node with fallbacks to http and window client
  async loadIPFS(){ 
    const { ipfs, provider, apiAddress } = await getIpfs({
      providers: [
        jsIpfs({
          options: {repo: 'react-ipfs' || props.repo},
          loadJsIpfsModule: () => require('ipfs')
        }),
        httpClient({
          loadHttpClientModule: () => require('ipfs-http-client')
        }),
        windowIpfs({
          permissions: {commands: ['add', 'get', 'id']}
        })
      ]
    })
    
    return {ipfs, provider} 
  }

  //Get all the basic info for the node and keep it in context
  async initIPFS(ipfs){
    const idBlob = await ipfs.id()
    return idBlob.id
  }

  render(){
    return (
      <AppContext.Provider
        value={
          Object.assign({},
            this.state.ipfs,
            {provider: {name: this.state.provider, id: this.state.id}}
          )}> 
          {this.props.children}
    </AppContext.Provider>
    )
  }
}

export default IPFSProvider;
