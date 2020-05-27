'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixture.json');
const _ = require('lodash');

suite('Admin API tests', function () {

  let admins = fixtures.admins;
  let newAdmin = fixtures.newAdmin;

  const poiService = new POIService(fixtures.poiService);

  setup(async function () {
    await poiService.deleteAllAdmins();
  });

  teardown(async function () {
    await poiService.deleteAllAdmins();
  });

  test('create an admin', async function () {
    const returnedAdmin = await poiService.createAdmin(newAdmin);
    assert(_.some([returnedAdmin], newAdmin), 'returnedAdmin must be a superset of newAdmin');
    assert.isDefined(returnedAdmin._id);
  });

  test('get admin', async function () {
    const a1 = await poiService.createAdmin(newAdmin);
    const a2 = await poiService.getAdmin(a1._id);
    assert.deepEqual(a1, a2);
  });

  test('get invalid admin', async function () {
    const a1 = await poiService.getAdmin('1234');
    assert.isNull(a1);
    const a2 = await poiService.getAdmin('012345678901234567890123');
    assert.isNull(a2);
  });


  test('delete an admin', async function () {
    let a = await poiService.createAdmin(newAdmin);
    assert(a._id != null);
    await poiService.deleteOneAdmin(a._id);
    a = await poiService.getAdmin(a._id);
    assert(a == null);
  });

  test('get all admins', async function () {
    for (let a of admins) {
      await poiService.createAdmin(a);
    }

    const allAdmins = await poiService.getAdmins();
    assert.equal(allAdmins.length, admins.length);
  });

  test('get admins detail', async function () {
    for (let a of admins) {
      await poiService.createAdmin(a);
    }

    const allAdmins = await poiService.getAdmins();
    for (var i = 0; i < admins.length; i++) {
      assert(_.some([allAdmins[i]], admins[i]), 'returnedAdmin must be a superset of newAdmin');
    }
  });

  test('get all admins empty', async function () {
    const allAdmins = await poiService.getAdmins();
    assert.equal(allAdmins.length, 0);
  });
});