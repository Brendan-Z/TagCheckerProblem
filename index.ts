interface Tag {
    tag: string,
    isOpening: boolean
}

function checkTags(input: string): string {

    return '"Correctly tagged paragraph"';
}



console.log(checkTags("The following text <C><B>is centered and in boldface</B></C>",));
console.log(checkTags("<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d> sentence",));
console.log(checkTags("<B><C>This should be centered and in boldface, but the tags are wrongly nested</B></C>",));
console.log(checkTags("<B>This should be in boldface, but there is an extra closing tag</B></C>",));
console.log(checkTags("<B><C>This should be centered and in boldface, but there is a missing closing tag</C>",));
