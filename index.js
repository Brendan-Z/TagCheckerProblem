function parseTag(input) {
    // Assumption: Using regex to check whether or not the tags match a specific letter.
    // Regular expression finds tags that match the pattern opening of  the tags with a single uppercase letter.
    var match = input.match(/<\/?([A-Z])>/);
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
    var stack = []; // Initialise stack to keep track of the tags.
    var index = 0;
    while (index < input.length) {
        var restInput = input.substring(index);
        var nextTagMatch = restInput.match(/<\/?[A-Z]>/);
        if (nextTagMatch) {
            var tagStr = nextTagMatch[0];
            var tag = parseTag(tagStr);
            if (tag) {
                if (tag.isOpening) {
                    stack.push(tag);
                }
                else {
                    var lastTag = stack.pop();
                    if (!lastTag || lastTag.tag !== tag.tag) {
                        return "\"Expected ".concat(lastTag ? "</".concat(lastTag.tag, ">") : '#', " found </").concat(tag.tag, ">\"");
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
        return "\"Expected </".concat(stack[stack.length - 1].tag, "> found #\"");
    }
    return '"Correctly tagged paragraph"';
}
console.log(checkTags("The following text <C><B>is centered and in boldface</B></C>"));
console.log(checkTags("<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d> sentence"));
console.log(checkTags("<B><C>This should be centered and in boldface, but the tags are wrongly nested</B></C>"));
console.log(checkTags("<B>This should be in boldface, but there is an extra closing tag</B></C>"));
console.log(checkTags("<B><C>This should be centered and in boldface, but there is a missing closing tag</C>"));
