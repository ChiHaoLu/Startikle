# Startikle 
> Publication Dapp on StarkNet

合約
1. 發布文章並上傳到 IPFS
2. 合約中有一個巢狀 Mapping 記錄著每個使用者第幾篇文章對應的 IPFS，也就是 mapping(address => mapping(felt => felt*))
3. 同時有一個 Mapping 紀錄每個使用者發布過幾篇文章了，也就是 mapping(address => felt)
4. 發布文章 Log 出資訊可供 Indexer 使用，在前端印出當前最新文章

前端
1. 可串接 L1 錢包（ENS, Token Balance）綁定相關資訊
2. 文章編輯器採用 markdown 語法

產品
1. 白皮書：Gitbook
2. LOGO & Banners：Canva