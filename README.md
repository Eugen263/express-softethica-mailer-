# Mailer Service With Token Auth
Author: Eugen K "LinearDev"

PORT: 47345

## How to use that shit?
1. Get token from endpoint "/tokenizer/get"\
Options: null\
Method: GET\
Answer:\
    key - if its generated\
2. Send request to "/mail/send"\
Options: \
    key - is token that u get on first step\
    name - full name from form\
    phone - phone from form\
    email - email from phone\
    message - message from form\
Method: Get\
Answer:\
    true - if mail successfully sended\
    false - if not sended\
