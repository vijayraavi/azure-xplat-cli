﻿/**
 * Copyright (c) Microsoft.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var should = require('should');
var util = require('util');
var _ = require('underscore');

var testUtils = require('../../../util/util');
var CLITest = require('../../../framework/arm-cli-test');
var utils = require('../../../../lib/util/utils');
var NetworkTestUtil = require('../../../util/networkTestUtil');
var tagUtils = require('../../../../lib/commands/arm/tag/tagUtils');
var networkUtil = new NetworkTestUtil();

var generatorUtils = require('../../../../lib/util/generatorUtils');
var profile = require('../../../../lib/util/profile');
var $ = utils.getLocaleString;

var testPrefix = 'arm-network-nsg-tests',
  groupName = 'xplat-test-nsg',
  location;
var index = 0;

var networkInterfaceName;
var networkInterfaceId;

var networkSecurityGroups = {
  location: 'westus',
  name: 'networkSecurityGroupName'
}

var requiredEnvironment = [{
  name: 'AZURE_VM_TEST_LOCATION',
  defaultValue: 'westus'
}];

describe('arm', function () {
  describe('network', function () {
    var suite, retry = 5;
    var hour = 60 * 60000;

    before(function (done) {
      suite = new CLITest(this, testPrefix, requiredEnvironment);
      suite.setupSuite(function () {
        location = networkSecurityGroups.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        networkSecurityGroups.location = location;
        networkSecurityGroups.group = groupName;
        networkSecurityGroups.name = suite.isMocked ? networkSecurityGroups.name : suite.generateId(networkSecurityGroups.name, null);
        if(!suite.isPlayback()) {
          networkUtil.createGroup(groupName, location, suite, function () {
            done();
          });
        } else {
          var subscriptionId = profile.current.getSubscription().id;
          done();
        }
      });
    });
    after(function (done) {
      this.timeout(hour);
      networkUtil.deleteGroup(groupName, suite, function () {
        suite.teardownSuite(done);
      });
    });
    beforeEach(function (done) {
      suite.setupTest(done);
    });
    afterEach(function (done) {
      suite.teardownTest(done);
    });

    describe('network security groups', function () {
      this.timeout(hour);
      it('create should create network security groups', function (done) {
        var cmd = 'network nsg create -g {group} -n {name} --location {location}  --json'.formatArgs(networkSecurityGroups);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(networkSecurityGroups.name);

          done();
        });
      });
      it('show should display network security groups details', function (done) {
        var cmd = 'network nsg show -g {group} -n {name} --json'.formatArgs(networkSecurityGroups);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.name.should.equal(networkSecurityGroups.name);

          done();
        });
      });
      it('set should update network security groups', function (done) {
        var cmd = 'network nsg set -g {group} -n {name}  --json'.formatArgs(networkSecurityGroups);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(networkSecurityGroups.name);

          done();
        });
      });
      it('list should display all network security groups in resource group', function (done) {
        var cmd = 'network nsg list -g {group} --json'.formatArgs(networkSecurityGroups);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var outputs = JSON.parse(result.text);
          _.some(outputs, function (output) {
            return output.name === networkSecurityGroups.name;
          }).should.be.true;
          done();
        });
      });
      it('delete should delete network security groups', function (done) {
        var cmd = 'network nsg delete -g {group} -n {name} --quiet --json'.formatArgs(networkSecurityGroups);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network nsg show -g {group} -n {name} --json'.formatArgs(networkSecurityGroups);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.should.be.empty;
            done();
          });
        });
      });
    });
  });
});
