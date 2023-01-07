import data from "./data/data.json";

function removePunctuation(str: string) {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

function replace(stringToReplace: string): string {
    stringToReplace = removePunctuation(stringToReplace);
    const keys = Object.keys(data);
    const values = Object.values(data);
    const words = stringToReplace.split(" ");

    words.forEach((word, index) => {
        word = word.toLowerCase();
        if (keys.includes(word)) {
            words[index] = values[keys.indexOf(word)];
        }
    });

    return words.join(" ");
}

/* eslint-disable no-restricted-globals */
self.addEventListener("message", (event: any) => {
    let replaced = replace(event.data);
    self.postMessage(replaced);
}, false);

