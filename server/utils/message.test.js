const expect = require("expect");

const {generateMessage} = require("./message");


describe("generateMessage", () => {
    it("Should generate the correct message object", () => {
        var from = "Test";
        var text = "test text";

        var result = generateMessage(from, text);

        expect(result).toMatchObject({ from, text });
        expect(typeof result.createdAt).toBe("number");
    })
})