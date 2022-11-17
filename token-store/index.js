class TokenStorageController {

    storage = [];

    storageGet() {
        return this.storage;
    }

    getTokens() {
        return JSON.stringify(this.storageGet());
    }

    storageSet(token) {

        console.log("[ TOKENIZER ] Add token in storage");

        this.storage.push(token);
        return true;
    }

    autoRemover(token) {
        const arrIndex = this.storage.indexOf(token)
        if (arrIndex < 0) {

            console.log("[ TOKENIZER ] Some user use undefined token");

            //throw Error("Token is not defined");
            return false
        } else {

            console.log("[ TOKENIZER ] Remove used token");

            this.storage.splice(arrIndex, 1);
            return true;
        }
    }
}

module.exports = { TokenStorageController }