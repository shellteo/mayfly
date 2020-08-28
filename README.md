# Rinkeby Token ON UNISWAP
- (0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735, 18, 'DAI', 'Dai Stablecoin')
- (0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85, 18, 'MKR', 'Maker')
- (0xc778417E063141139Fce010982780140Aa0cD5Ab, 18 'WETH', 'Wrapped Ether')

# Rinkeby Token
- owner: 0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63
- YAM: 0x6e803e1E57e9b1e7331aAbC74b3e8eAe10B57546   total_supply 21m
- WETH: 0xAc239d0E2094B046bB8EDcDF79De708D806d71cE  total_supply 1m
- YAMETHPool: 0xF24A7C90d0EAd647022AF922Fe994E063080beF2

# FanPiao ERC20
## Before Getting Started
我们先安装必要的依赖
```bash
yarn # yarn is recommended as we have yarn lockfile
# or 或
npm i # 😔 npm is too old for package management
```

然后...... 开始测试构建
```bash
yarn compile
# or 或
npm run compile
```
## File Structure
```bash
├── build #存放编译相关
│   └── contracts #编译后合约文件
│    # 编译后是JSON的格式，JSON内含用于合约部署的 bytecode
│    # 后端目前只需要 CommonFanPiao.json 即可部署饭票的合约
├── contracts # 实际 solidity 合约代码
├── flatten # flatten 后的合约（理论上仅用于 Etherscan 验证）
├── migrations # Migrations are JavaScript files that help you deploy contracts to the Ethereum network.
│ #官方文档对 migrations 为如上所述 https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations
├── node_modules # npm 安装的包
│   └── @openzeppelin # openzeppelin 的
│       └── contracts # 合约们
│           ├── GSN
│           ├── access
│           │   └── roles
│           ├── build
│           │   └── contracts
│           ├── crowdsale
│           │   ├── distribution
│           │   ├── emission
│           │   ├── price
│           │   └── validation
│           ├── cryptography
│           ├── drafts
│           │   └── ERC1046
│           ├── introspection
│           ├── lifecycle
│           ├── math
│           ├── ownership
│           ├── payment
│           │   └── escrow
│           ├── token
│           │   ├── ERC20
│           │   ├── ERC721
│           │   └── ERC777
│           └── utils
│           ...
└── test # 测试相关，暂时还没使用
```