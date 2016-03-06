var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

describe('README', function () {
    var readme;
    var items;
    before(function () {
        readme = fs.readFileSync('./README.md', 'utf8');
    });

    it('should be in alphabetical order within each category', function () {
        var categories = (readme.split('---'));
        categories.shift();
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].indexOf('####') === -1) {
                items = extractListNames(categories[i]);
                expect(compareArrays(items, alphabetize(items))).to.be.true;
            } else {
                var subCategories = categories[i].split('####');
                subCategories.shift();
                for (var k = 0; k < subCategories.length; k++) {
                    items = extractListNames(subCategories[k]);
                    expect(compareArrays(items, alphabetize(items))).to.be.true;
                }
            }
        }
    })
});

function alphabetize(items) {
    var _items = [];
    for (var i = 0; i < items.length; i++) {
        _items.push(items[i]);
    }
    return _items.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
}

function extractListNames(str) {
    var regexp = /\* \[(.*?)\]/g;
    var items = str.match(regexp);
    return items;
}

function compareArrays(arr1, arr2) {
    console.log("Unsorted : \n", arr1);
    console.log("Sorted : \n", arr2);
    console.log('----');
    arr1 = arr1.join();
    arr2 = arr2.join();
    return arr1 === arr2;
}
