import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { NFTStorage } from 'nft.storage'
import {
    Contract,
    Provider,
    number
} from "starknet"
import { Spin, Space } from 'antd';

function Write({ wallet }) {
    const [value, setValue] = useState("# Write Your New Article Here!");
    const [uploading, setUploading] = useState(false)
    const [cid, setCID] = useState("")

    const handleDownload = () => {
        const blob = new Blob([value], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Article.md';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const sendUploadTx = async () => {
        setUploading(true)
        // Upload to IPFS
        const files = new Blob([value], { type: 'text/markdown' });
        const token = process.env.REACT_APP_NFT_STORAGE_TOKEN
        const client = new NFTStorage({ token: token })
        const _cid = await client.storeBlob(files)
        setCID(_cid)
        console.log(_cid)

        const status = await client.status(_cid)
        console.log(status)

        // Upload to Starknet
        const starknetProvider = new Provider({
            sequencer: {
                network: 'mainnet-alpha'
            }
        })

        const ContractADDR = process.env.REACT_APP_CONTRACT_ADDRESS
        const ABI = []
        const StartikleContract = new Contract(ABI, ContractADDR, "wallet");
        try {
            const { transaction_hash: approveTxHash } = await StartikleContract.upload(number.toFelt(cid));
            await starknetProvider.waitForTransaction(approveTxHash)
        } catch (e) {
            setUploading(false)
        }
        setUploading(false)
    }

    const UploadButton = () => {
        return (
            uploading === true ?
                <Space
                    direction="vertical"
                    style={{
                        width: '100%'
                    }}
                >
                    <Spin tip="Uploading" >
                        <div className="content" />
                    </Spin>
                </Space >
                :
                <button
                    className="disabled:opacity-50 bg-gradient-to-r from-thOrange to-thBlue py-2 px-6 text-black rounded-lg duration-300 hover:scale-110"
                    onClick={() => {
                        sendUploadTx()
                    }}
                    disabled={(uploading ? true : false)}
                >
                    <strong>Upload</strong>
                </button >
        )
    }

    return (
        <div data-color-mode="light">
            <UploadButton />
            <button onClick={handleDownload}>Download Article</button>
            <p>{` `}</p>
            <MDEditor 
                height={500} 
                value={value} 
                onChange={setValue} 
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
        </div>
    );
}

export default Write;
