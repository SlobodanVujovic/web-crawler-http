function normalizeUrl(inputUrl){
    const urlObject = new URL(inputUrl);
    let hostAndPath = `${urlObject.host}${urlObject.pathname}`;
    hostAndPath = hostAndPath.toLowerCase();

    if (hostAndPath.length > 0 && hostAndPath.slice(-1) == '/') {
        return hostAndPath.slice(0, -1);
    }

    return hostAndPath;
}

module.exports = {
    normalizeUrl
}