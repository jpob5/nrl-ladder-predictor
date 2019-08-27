function log(text) {
    console.log(text);
}

function prettifyNumber(number) {
    const prettyNumber = Math.floor(number * 10000) / 100;
    const safeNumber = isNaN(prettyNumber) ? 0 : prettyNumber;
    return safeNumber.toFixed(2);
}
export {
    log,
    prettifyNumber
}