$(document).ready(() => {
    readLocalXMLFile("../coins.xml");
});

var what = true;

function readLocalXMLFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allXML = rawFile.responseText;
                parseXMLFile(allXML);
            }
        }
    }
    rawFile.send(null);
}

function parseXMLFile(xml) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml, "text/xml");

    var btcInitial = xmlDoc.getElementsByTagName('btc')[0].getElementsByTagName('initialPrice')[0].textContent;
    var btcCurrent = xmlDoc.getElementsByTagName('btc')[0].getElementsByTagName('currentPrice')[0].textContent;
    var bchInitial = xmlDoc.getElementsByTagName('bch')[0].getElementsByTagName('initialPrice')[0].textContent;
    var bchCurrent = xmlDoc.getElementsByTagName('bch')[0].getElementsByTagName('currentPrice')[0].textContent;
    var ethInitial = xmlDoc.getElementsByTagName('eth')[0].getElementsByTagName('initialPrice')[0].textContent;
    var ethCurrent = xmlDoc.getElementsByTagName('eth')[0].getElementsByTagName('currentPrice')[0].textContent;
    var ltcInitial = xmlDoc.getElementsByTagName('ltc')[0].getElementsByTagName('initialPrice')[0].textContent;
    var ltcCurrent = xmlDoc.getElementsByTagName('ltc')[0].getElementsByTagName('currentPrice')[0].textContent;

    document.getElementById('btc').innerHTML = '$' + btcCurrent;
    document.getElementById('bch').innerHTML = '$' + bchCurrent;
    document.getElementById('eth').innerHTML = '$' + ethCurrent;
    document.getElementById('ltc').innerHTML = '$' + ltcCurrent;

    var btcInitialChange = ((btcCurrent - btcInitial) / btcInitial * 100);
    var bchInitialChange = ((bchCurrent - bchInitial) / bchInitial * 100);
    var ethInitialChange = ((ethCurrent - ethInitial) / ethInitial * 100);
    var ltcInitialChange = ((ltcCurrent - ltcInitial) / ltcInitial * 100);

    document.getElementById('btcSinceInitial').innerHTML = btcInitialChange.toFixed(2) + '%';
    document.getElementById('bchSinceInitial').innerHTML = bchInitialChange.toFixed(2) + '%';
    document.getElementById('ethSinceInitial').innerHTML = ethInitialChange.toFixed(2) + '%';
    document.getElementById('ltcSinceInitial').innerHTML = ltcInitialChange.toFixed(2) + '%';

    percentCss('btcSinceInitial', btcInitialChange);
    percentCss('bchSinceInitial', bchInitialChange);
    percentCss('ethSinceInitial', ethInitialChange);
    percentCss('ltcSinceInitial', ltcInitialChange);

    var btcInterstitialChange = ((xmlDoc.getElementsByTagName('btc')[0].getElementsByTagName('intermediateProfit')[0].textContent) / btcInitial * 100);
    var bchInterstitialChange = ((xmlDoc.getElementsByTagName('bch')[0].getElementsByTagName('intermediateProfit')[0].textContent) / bchInitial * 100);
    var ethInterstitialChange = ((xmlDoc.getElementsByTagName('eth')[0].getElementsByTagName('intermediateProfit')[0].textContent) / ethInitial * 100);
    var ltcInterstitialChange = ((xmlDoc.getElementsByTagName('ltc')[0].getElementsByTagName('intermediateProfit')[0].textContent) / ltcInitial * 100);

    document.getElementById('btcInterstitial').innerHTML = btcInterstitialChange.toFixed(2) + '%';
    document.getElementById('bchInterstitial').innerHTML = bchInterstitialChange.toFixed(2) + '%';
    document.getElementById('ethInterstitial').innerHTML = ethInterstitialChange.toFixed(2) + '%';
    document.getElementById('ltcInterstitial').innerHTML = ltcInterstitialChange.toFixed(2) + '%';

    percentCss('btcInterstitial', btcInterstitialChange);
    percentCss('bchInterstitial', bchInterstitialChange);
    percentCss('ethInterstitial', ethInterstitialChange);
    percentCss('ltcInterstitial', ltcInterstitialChange);

}

function percentCss(id, val) {
    var elem = $('#' + id);
    if(val > 0) {
        elem.css('color', 'green');
    } else if(val < 0) {
        elem.css('color', 'red');
    } else {
        elem.css('color', 'white');
    }
}
