function parseTag(input) {
    // Assumption: Using regex to check whether or not the tags match a specific letter.
    const match = input.match(/<\/?([A-Z])>/);
    if (match) {
        return {
            tag: match[1],
            isOpening: !input.startsWith("</")
        };
    }
    return null;
}
function checkTags(input) {
    var _a;
    const stack = [];
    let index = 0;
    while (index < input.length) {
        const restInput = input.substring(index);
        const nextTagMatch = restInput.match(/<\/?[A-Z]>/);
        if (nextTagMatch) {
            const tagStr = nextTagMatch[0];
            const tag = parseTag(tagStr);
            if (tag) {
                if (tag.isOpening) {
                    stack.push(tag);
                }
                else {
                    const lastTag = stack.pop();
                    if (!lastTag || lastTag.tag !== tag.tag) {
                        return `"Expected ${lastTag ? `</${lastTag.tag}>` : '#'} found </${tag.tag}>"`;
                    }
                }
            }
            index += ((_a = nextTagMatch === null || nextTagMatch === void 0 ? void 0 : nextTagMatch.index) !== null && _a !== void 0 ? _a : 0) + tagStr.length;
        }
        else {
            break;
        }
    }
    if (stack.length > 0) {
        return `"Expected </${stack[stack.length - 1].tag}> found #"`;
    }
    return '"Correctly tagged paragraph"';
}
console.log(checkTags("The following text <C><B>is centered and in boldface</B></C>"));
console.log(checkTags("<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d> sentence"));
console.log(checkTags("<B><C>This should be centered and in boldface, but the tags are wrongly nested</B></C>"));
console.log(checkTags("<B>This should be in boldface, but there is an extra closing tag</B></C>"));
console.log(checkTags("<B><C>This should be centered and in boldface, but there is a missing closing tag</C>"));
