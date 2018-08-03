const expect = require("expect");

const {isRealString} = require("./validation");


describe("String Validation", () => {
    it("Should reject non-string values", () => {
        var intTest = 22;
        var boolTest =true;

        var intTest = isRealString(intTest);
        var boolTest = isRealString(boolTest);

        expect(intTest).toBeFalsy();
        expect(boolTest).toBeFalsy();
    });

    it("Should reject strings with only spaces", () => {
        var str = "            ";

        var res = isRealString(str);

        expect(res).toBeFalsy();
    });

    it("Should allow strings with non-space characters", () => {
        var str = "      hello i am a user    ";

        var res = isRealString(str);

        expect(res).toBeTruthy();
    });
})