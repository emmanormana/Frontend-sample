const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
function IsValidUrl(url) {
    let urlRegexResult = url.match(urlRegex);
    if (urlRegexResult)
        return true;
    else
        return false;
}
export default IsValidUrl;