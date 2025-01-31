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

var testPrefix = 'arm-network-lb-address-pool-tests',
  groupName = 'xplat-test-address-pool',
  location;
var index = 0;

var loadBalancerName;
var loadBalancerId;
var publicIPAddressName;
var publicIPAddressId;
var frontendIPConfigurationName;
var frontendIPConfigurationId;
var backendAddressPools = {
  name: 'backendAddressPoolName'
};
backendAddressPools.loadBalancerName = 'loadBalancerName';
backendAddressPools.publicIPAddressName = 'publicIPAddressName';
backendAddressPools.frontendIPConfigurationName = 'frontendIPConfigurationName';

var publicIPAddress = {
  location: 'westus'
};
var loadBalancer = {
  location: 'westus'
};
var frontendIPConfiguration = {
};

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
        location = backendAddressPools.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        backendAddressPools.location = location;
        backendAddressPools.group = groupName;
        backendAddressPools.name = suite.isMocked ? backendAddressPools.name : suite.generateId(backendAddressPools.name, null);
        if(!suite.isPlayback()) {
          networkUtil.createGroup(groupName, location, suite, function () {
            var cmd = 'network lb create -g {1} -n loadBalancerName --location {location} --json'.formatArgs(loadBalancer, groupName);
            testUtils.executeCommand(suite, retry, cmd, function (result) {
              result.exitStatus.should.equal(0);
              var output = JSON.parse(result.text);
              var cmd = 'network public-ip create -g {1} -n publicIPAddressName --location {location} --json'.formatArgs(publicIPAddress, groupName);
              testUtils.executeCommand(suite, retry, cmd, function (result) {
                result.exitStatus.should.equal(0);
                var output = JSON.parse(result.text);
                var cmd = 'network lb frontend-ip create -g {1} -n frontendIPConfigurationName  --lb-name loadBalancerName --public-ip-name publicIPAddressName --json'.formatArgs(frontendIPConfiguration, groupName);
                testUtils.executeCommand(suite, retry, cmd, function (result) {
                  result.exitStatus.should.equal(0);
                  var output = JSON.parse(result.text);
                  done();
                });
              });
            });
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

    describe('backend address pools', function () {
      this.timeout(hour);
      it('create should create backend address pools', function (done) {
        var cmd = 'network lb address-pool create -g {group} -n {name}  --lb-name {loadBalancerName}  --json'.formatArgs(backendAddressPools);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(backendAddressPools.name);

          done();
        });
      });
      it('show should display backend address pools details', function (done) {
        var cmd = 'network lb address-pool show -g {group} -n {name} --lb-name {loadBalancerName} --json'.formatArgs(backendAddressPools);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.name.should.equal(backendAddressPools.name);

          done();
        });
      });
      it('list should display all backend address pools in resource group', function (done) {
        var cmd = 'network lb address-pool list -g {group} --lb-name {loadBalancerName} --json'.formatArgs(backendAddressPools);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var outputs = JSON.parse(result.text);
          _.some(outputs, function (output) {
            return output.name === backendAddressPools.name;
          }).should.be.true;
          done();
        });
      });
      it('delete should delete backend address pools', function (done) {
        var cmd = 'network lb address-pool delete -g {group} -n {name} --quiet --lb-name {loadBalancerName} --json'.formatArgs(backendAddressPools);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network lb address-pool show -g {group} -n {name} --lb-name {loadBalancerName} --json'.formatArgs(backendAddressPools);
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
