function parseTag(input) {
    // Assumption: Using regex to check whether or not the tags match a specific letter.
    // Regular expression finds tags that match the pattern opening of the tags with a single uppercase letter.
    var regEx = /<\/?([A-Z])>/;
    var match = input.match(regEx);
    // If a match is found from the given input, then it will create a Tag object.
    if (match) {
        return {
            tag: match[1],
            isOpening: !input.startsWith("</")
        };
    }
    // If no match is found, then it does not contain a valid tag which is defined by my regex.
    return null;
}
function checkTags(input) {
    var _a;
    var stack = []; // Initialise stack to keep track of the tags.
    var index = 0;
    // Go through all the input string to find all the tags.
    while (index < input.length) {
        var restInput = input.substring(index);
        // Finding the next tag in the given substring.
        var nextTagMatch = restInput.match(/<\/?[A-Z]>/);
        // If a tag is found then I was to process it, for the result.
        if (nextTagMatch) {
            var tagStr = nextTagMatch[0];
            var tag = parseTag(tagStr);
            if (tag) {
                if (tag.isOpening) {
                    // If the tag is an opening tag, use a stack to store it.
                    stack.push(tag);
                }
                else {
                    // If the tag is closing, pop the last opening tag from the stack and check if they match.
                    var lastTag = stack.pop();
                    // Last tag does not match return expected output
                    if (!lastTag || lastTag.tag !== tag.tag) {
                        return "\"Expected ".concat(lastTag ? "</".concat(lastTag.tag, ">") : '#', " found </").concat(tag.tag, ">\"");
                    }
                }
            }
            // Move to the next index past the current tag to start parsing again from there.
            index += ((_a = nextTagMatch === null || nextTagMatch === void 0 ? void 0 : nextTagMatch.index) !== null && _a !== void 0 ? _a : 0) + tagStr.length;
        }
        else {
            break;
        }
    }
    // After going through the whole string, if there are unmatched tags then it will return the expected output.
    if (stack.length > 0) {
        return "\"Expected </".concat(stack[stack.length - 1].tag, "> found #\"");
    }
    // If the stack is empty, then all tags were correctly matched and will return expected output.
    return '"Correctly tagged paragraph"';
}
console.log(checkTags("The following text <C><B>is centered and in boldface</B></C>"));
console.log(checkTags("<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d> sentence"));
console.log(checkTags("<B><C>This should be centered and in boldface, but the tags are wrongly nested</B></C>"));
console.log(checkTags("<B>This should be in boldface, but there is an extra closing tag</B></C>"));
console.log(checkTags("<B><C>This should be centered and in boldface, but there is a missing closing tag</C>"));
