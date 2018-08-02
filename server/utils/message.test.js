const expect = require("expect");

const {generateMessage, generateLocationMessage} = require("./message");


describe("generateMessage", () => {
    it("Should generate the correct message object", () => {
        var from = "Test";
        var text = "test text";

        var result = generateMessage(from, text);

        expect(result).toMatchObject({ from, text });
        expect(typeof result.createdAt).toBe("number");
    })
})

describe("generateLocationMessage", () => {
    it("Should generate a location on button press", () => {
        var from = "Rhys";
        var latitude = 54.134069399999994;
        var longitude = -3.2359486;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        var result = generateLocationMessage(from, latitude, longitude);

        expect(result).toMatchObject({ from, url });
        expect(typeof result.createdAt).toBe("number");

    })
})