import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NinjaCoinModule = buildModule("NinjaCoinModule", (m) => {

  const ninjaCoin = m.contract("NinjaCoin");

  return {
    ninjaCoin
  };

});

export default NinjaCoinModule;