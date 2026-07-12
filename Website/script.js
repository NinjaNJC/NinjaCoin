const contractAddress =
"0xDbfd0CF48cbB599B905CFa58503F15100CaF45Ed";



async function addToken(){

if(!window.ethereum){

alert("Установите MetaMask");

return;

}


try{


await window.ethereum.request({

method:"wallet_watchAsset",

params:{

type:"ERC20",

options:{

address:contractAddress,

symbol:"NJC",

decimals:18,

image:
"https://raw.githubusercontent.com/NinjaNJC/NinjaCoin/main/Logo/ninja.png"

}

}

});


}

catch(error){

console.log(error);

}

}





function copyContract(){


let address =
document.getElementById("contractAddress").innerText;


navigator.clipboard.writeText(address);


alert("Адрес скопирован 🥷");


}





async function connectWallet(){


if(!window.ethereum){

alert("Установите MetaMask");

return;

}


try{


const accounts =
await window.ethereum.request({

method:"eth_requestAccounts"

});


const wallet = accounts[0];



document.getElementById("walletAddress").innerHTML =

"🥷 Wallet: " + wallet;



document.getElementById("dashboardWallet").innerHTML =

wallet.substring(0,6)
+
"..."
+
wallet.substring(38);



getETHBalance(wallet);

getNJCBalance(wallet);



}


catch(error){

console.log(error);

}


}





async function getETHBalance(wallet){


const balance =
await window.ethereum.request({

method:"eth_getBalance",

params:[wallet,"latest"]

});



const eth =
parseInt(balance,16)
/1000000000000000000;



document.getElementById("ethBalance").innerHTML =

eth.toFixed(4)+" ETH";


}





async function getNJCBalance(wallet){


const data =

"0x70a08231"
+
wallet.substring(2).padStart(64,"0");



const result =
await window.ethereum.request({

method:"eth_call",

params:[

{

to:contractAddress,

data:data

},

"latest"

]

});



const balance =

parseInt(result,16)
/10**18;



document.getElementById("njcBalance").innerHTML =

balance.toLocaleString()
+
" NJC";


}






window.ethereum?.on("accountsChanged", function(accounts){


if(accounts.length > 0){

connectWallet();

}


});
window.addEventListener("load", async ()=>{


if(window.ethereum){


const accounts = await window.ethereum.request({

method:"eth_accounts"

});


if(accounts.length > 0){


const wallet = accounts[0];


document.getElementById("walletAddress").innerHTML =

"🥷 Wallet: " + wallet;



document.getElementById("dashboardWallet").innerHTML =

wallet.substring(0,6)
+
"..."
+
wallet.substring(38);



getETHBalance(wallet);

getNJCBalance(wallet);


}


}


});
function disconnectWallet(){

document.getElementById("walletAddress").innerHTML =
"Wallet disconnected";

document.getElementById("dashboardWallet").innerHTML =
"Not Connected";

document.getElementById("ethBalance").innerHTML =
"0";

document.getElementById("njcBalance").innerHTML =
"0";

}


if(window.ethereum){

window.ethereum.on("accountsChanged", function(accounts){

if(accounts.length === 0){

disconnectWallet();

}else{

connectWallet();

}

});


window.ethereum.on("chainChanged", function(){

window.location.reload();

});


}
async function sendNJC() {

    const to = document.getElementById("sendAddress").value;
    const amount = document.getElementById("sendAmount").value;

    if (!window.ethereum) {
        alert("Установите MetaMask");
        return;
    }

    const contract = "0xDbfd0CF48cbB599B905CFa58503F15100CaF45Ed";

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
    });

    const from = accounts[0];

    const amountHex =
        BigInt(amount) * 10n ** 18n;

    const method =
        "0xa9059cbb";

    const address =
        to.substring(2).padStart(64, "0");

    const value =
        amountHex.toString(16).padStart(64, "0");

    const data =
        method + address + value;

    try {

        const tx = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: from,
                to: contract,
                data: data
            }]
        });

        document.getElementById("sendStatus").innerHTML =
            "✅ Transaction: " + tx;
            const history = document.getElementById("txHistory");

history.innerHTML =
`
<div style="margin-bottom:15px;padding:10px;border-bottom:1px solid #444;">

<b>📤 Sent ${amount} NJC</b>

<br><br>

<b>To:</b><br>
${to}

<br><br>

<b>Transaction:</b><br>

<a href="https://eth-sepolia.blockscout.com/tx/${tx}"
target="_blank">

${tx.substring(0,18)}...

</a>

</div>
`
+ history.innerHTML;

    } catch (e) {

        document.getElementById("sendStatus").innerHTML =
            "❌ Transfer cancelled";

    }

}