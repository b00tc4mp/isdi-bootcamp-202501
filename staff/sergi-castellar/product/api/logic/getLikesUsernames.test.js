import { getLikesUsernames } from "./getLikesUsernames.js"

try {
    const likes = getLikesUsernames([
        "000f7843c33d74d6f04752b570d676097d",
        "0078dfd4e3168502717c19a4905d239202",
        "00b24894e4b666fdd6f5cecf5373e7935a",
        "00aab75a0a516ca368d5828fea24e14b8b"
    ])
    console.log('likes :>> ', likes);
} catch (error) {
    console.error(error);
}