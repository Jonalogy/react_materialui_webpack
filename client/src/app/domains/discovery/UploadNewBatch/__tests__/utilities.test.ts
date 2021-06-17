import { sampleIncrementMethod } from "app/domains/discovery/UploadNewBatch/utilities"

describe("Discovery utilities", () => {
    describe("sampleMethodToTest", () => {
        it("should increment the input value by 1 and return it", () => {
            expect(sampleIncrementMethod(1)).toBe(2)
        })
    })
})
