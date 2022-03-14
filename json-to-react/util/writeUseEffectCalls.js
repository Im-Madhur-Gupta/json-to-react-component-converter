const fs = require('fs');

const writeUseEffectCalls = (useEffectCalls, fileDesc) => {
    if (useEffectCalls) {
        for (let call of useEffectCalls) {
            const useEffectCall = `useEffect(()=>{
      ${call.code}
    },[${call.dependencies.join()}]);\n`;
            fs.writeSync(fileDesc, useEffectCall);
        }
        fs.writeSync(fileDesc, '\n');
    }
};

module.exports = writeUseEffectCalls;
