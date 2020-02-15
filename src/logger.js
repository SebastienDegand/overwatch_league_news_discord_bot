function info(logMsg) {
    console.log(formatDateToLog(new Date()) + ' [INFO] - ' + logMsg);
}

function error(errorMsg) {
    console.error('\x1b[31m%s\x1b[0m', `${formatDateToLog(new Date())} [ERROR] - ${errorMsg}`)
}

function errorStack(errorMsg, stack) {
    console.error('\x1b[31m%s\x1b[0m', `${formatDateToLog(new Date())} [ERROR] - ${errorMsg} - ${stack}`)
}

function formatDateToLog(date) {

    let year = date.getFullYear();
    let month = date.getMonth().toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    let second = date.getSeconds().toString().padStart(2, '0');
    let millisecond = date.getMilliseconds().toString().padStart(3, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;
}

module.exports = {
    info,
    error,
    errorStack
}