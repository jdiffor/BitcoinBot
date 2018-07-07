import json, hmac, hashlib, time, requests, base64
import schedule, time
import xml.etree.ElementTree as ET
from requests.auth import AuthBase

api_url = 'https://api.pro.coinbase.com/'

#Get inital price
tree = ET.parse('coins.xml')
root = tree.getroot()
for child in root:
    print('child')
    id = child.tag.upper() + "-USD"
    while True:
        try:
            coin = requests.get(api_url + 'products/' + id + '/ticker').json()
            child[2].text = "%0.2f" % float(coin['price'])
        except:
            two = 2
            print("lost connection")
            continue
        break

tree.write('coins.xml')


def otherJob():
    tree = ET.parse('coins.xml')
    root = tree.getroot()
    for child in root:
        id = child.tag.upper() + "-USD"
        while True:
            try:
                coin = requests.get(api_url + 'products/' + id + '/ticker').json()
                child[0].text = "%0.2f" % float(coin['price'])
            except:
                two = 2
                print("lost connection")
                continue
            break
    tree.write('coins.xml')

def doYourJob(buy):
    tree = ET.parse('coins.xml')
    root = tree.getroot()
    for child in root:
        id = child.tag.upper() + "-USD"
        while True:
            try:
                price = requests.get(api_url + 'products/' + id + '/ticker').json()['price']
                if buy:
                    child[3].text = "%0.2f" % float(price)
                else:
                    temp = float(child[4].text)
                    diff = float(price) - float(child[3].text)
                    temp += diff
                    child[4].text = "%0.2f" % float(temp)
            except:
                two = 2
                print("lost connection")
                continue
            break

    tree.write('coins.xml')
    print("I did it")

schedule.every(1).minutes.do(otherJob)
schedule.every().day.at("05:30").do(doYourJob, True)
schedule.every().day.at("10:00").do(doYourJob, False)

while True:
    schedule.run_pending()
    time.sleep(1)

# Create custom authentication for Exchange
class CoinbaseExchangeAuth(AuthBase):
    def __init__(self, api_key, secret_key, passphrase):
        self.api_key = api_key
        self.secret_key = secret_key
        self.passphrase = passphrase

    def __call__(self, request):
        timestamp = str(time.time())
        message = timestamp + request.method + request.path_url + (request.body or '')
        hmac_key = base64.b64decode(self.secret_key)
        signature = hmac.new(hmac_key, message.encode('utf-8'), hashlib.sha256)
        signature_b64 = base64.b64encode(signature.digest())

        request.headers.update({
            'CB-ACCESS-SIGN': signature_b64,
            'CB-ACCESS-TIMESTAMP': timestamp,
            'CB-ACCESS-KEY': self.api_key,
            'CB-ACCESS-PASSPHRASE': self.passphrase,
            'Content-Type': 'application/json'
        })
        return request

#auth = CoinbaseExchangeAuth(API_KEY, API_SECRET, API_PASS)

#accounts = requests.get(api_url + 'accounts', auth=auth).json()

#for account in accounts:
#    print(account)

#holds = requests.get(api_url + 'accounts/' + accounts[0]['id'] + '/holds', auth=auth).json()
#print(holds)

#from datetime import datetime
#naive_dt = datetime.now()

#print(naive_dt)
