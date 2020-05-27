'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixture.json');
const _ = require('lodash');

suite('Stadiums API tests', function () {

  let stadiums = fixtures.stadiums;
  let newStadium = fixtures.newStadium;

  const poiService = new POIService(fixtures.poiService);

  setup(async function () {
    await poiService.deleteAllStadiums();
  });

  teardown(async function () {
    await poiService.deleteAllStadiums();
  });

  test('create a stadium', async function () {
    const returnedStadium = await poiService.createStadium(newStadium);
    assert(_.some([returnedStadium], newStadium), 'returnedStadium must be a superset of newStadium');
    assert.isDefined(returnedStadium._id);
  });

  test('get stadium', async function () {
    const s1 = await poiService.createStadium(newStadium);
    const s2 = await poiService.getStadium(s1._id);
    assert.deepEqual(s1, s2);
  });

  test('get invalid stadium', async function () {
    const s1 = await poiService.getStadium('1234');
    assert.isNull(s1);
    const s2 = await poiService.getStadium('012345678901234567890123');
    assert.isNull(s2);
  });


  test('delete a stadium', async function () {
    let s = await poiService.createStadium(newStadium);
    assert(s._id != null);
    await poiService.deleteOneStadium(s._id);
    s = await poiService.getStadium(s._id);
    assert(s == null);
  });

  test('get all stadiums', async function () {
    for (let s of stadiums) {
      await poiService.createStadium(s);
    }

    const allStadiums = await poiService.getStadiums();
    assert.equal(allStadiums.length, stadiums.length);
  });

  test('get stadiums detail', async function () {
    for (let s of stadiums) {
      await poiService.createStadium(s);
    }

    const allStadiums = await poiService.getStadiums();
    for (var i = 0; i < stadiums.length; i++) {
      assert(_.some([allStadiums[i]], stadiums[i]), 'returnedStadiums must be a superset of newStadiums');
    }
  });

  test('get all stadiums empty', async function () {
    const allStadiums = await poiService.getStadiums();
    assert.equal(allStadiums.length, 0);
  });
});

