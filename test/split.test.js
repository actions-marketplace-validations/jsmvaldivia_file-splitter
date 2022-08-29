const fs = require('fs');
const path = require('path');

var chai = require('chai');
chai.use(require('chai-fs'));
var expect = chai.expect;

const split = require('../split')

const outDir = 'out';

describe('File', function () {
    before(function () {
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir);
        }
    });

    after(function () {
        if (fs.existsSync(outDir)) {
            fs.rmdirSync(outDir, { recursive: true });
        }
    });

    afterEach(async function () {
        if (fs.existsSync(outDir)) {
            fs.readdir(outDir, (err, files) => {
                if (err) throw err;

                for (const file of files) {
                    fs.unlink(path.join(outDir, file), err => {
                        if (err) throw err;
                    });
                }
            });
        }
    });

    describe('empty', function () {
        it('should produce 0 files', async function () {
            await split('test/fixtures/empty.txt', 10, outDir);
            expect(outDir).to.be.a.directory("").and.empty;
        });
    });

    describe('with more than 10 lines but less than 20', function () {
        it('should produce 2 files', async function () {
            await split('test/fixtures/fifteenLines.txt', 10, outDir);
            expect(outDir).to.be.a.directory("").and.include.contents(["array1.txt", "array2.txt"], "");
        });
    });

    describe('with less than 10 lines', function () {
        it('should produce 1 file', async function () {
            await split('test/fixtures/nineLines.txt', 10, outDir);
            expect(outDir).to.be.a.directory("").and.include.contents(["array1.txt"], "");
        });
    });

    describe('with exactly 10 lines', function () {
        it('should produce 1 file', async function () {
            await split('test/fixtures/tenLines.txt', 10, outDir);
            expect(outDir).to.be.a.directory("").and.include.contents(["array1.txt"], "");
        });
    });

});
