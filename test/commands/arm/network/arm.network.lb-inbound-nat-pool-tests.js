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

var testPrefix = 'arm-network-lb-inbound-nat-pool-tests',
  groupName = 'xplat-test-inbound-nat-pool',
  location;
var index = 0;

var loadBalancerName;
var loadBalancerId;
var publicIPAddressName;
var publicIPAddressId;
var frontendIPConfigurationName;
var frontendIPConfigurationId;
var inboundNatPools = {
  protocol: 'Udp',
  protocolNew: 'Tcp',
  frontendPortRangeStart: '555',
  frontendPortRangeStartNew: '777',
  frontendPortRangeEnd: '999',
  frontendPortRangeEndNew: '888',
  backendPort: '987',
  backendPortNew: '789',
  name: 'inboundNatPoolName'
}
inboundNatPools.loadBalancerName = 'loadBalancerName';
inboundNatPools.publicIPAddressName = 'publicIPAddressName';
inboundNatPools.frontendIPConfigurationName = 'frontendIPConfigurationName';

var publicIPAddress = {
  location: 'westus'
};
var loadBalancer = {
  location: 'westus'
};
var frontendIPConfiguration = {
};
var inboundNatPoolsDefault = {
  protocol: 'TCP',
  frontendPortRangeStart: '1',
  frontendPortRangeEnd: '65534',
  backendPort: '80',
  loadBalancerName: 'loadBalancerName',
  publicIPAddressName: 'publicIPAddressName',
  name: 'inboundNatPoolsDefaultName',
  group: groupName
};
var frontendPortRangeStartUnderAllowedValue = {
  frontendPortRangeStart: '0',
  loadBalancerName: 'loadBalancerName',
  name: 'FrontendPortRangeStartUnderAllowedValueName',
  group: groupName
};
var frontendPortRangeStartOverAllowedValue = {
  frontendPortRangeStart: '65535',
  loadBalancerName: 'loadBalancerName',
  name: 'FrontendPortRangeStartOverAllowedValueName',
  group: groupName
};
var frontendPortRangeEndUnderAllowedValue = {
  frontendPortRangeEnd: '0',
  loadBalancerName: 'loadBalancerName',
  name: 'FrontendPortRangeEndUnderAllowedValueName',
  group: groupName
};
var frontendPortRangeEndOverAllowedValue = {
  frontendPortRangeEnd: '65535',
  loadBalancerName: 'loadBalancerName',
  name: 'FrontendPortRangeEndOverAllowedValueName',
  group: groupName
};
var backendPortOutOfRange = {
  backendPort: '65536',
  loadBalancerName: 'loadBalancerName',
  name: 'BackendPortOutOfRangeName',
  group: groupName
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
        location = inboundNatPools.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        inboundNatPools.location = location;
        inboundNatPools.group = groupName;
        inboundNatPools.name = suite.isMocked ? inboundNatPools.name : suite.generateId(inboundNatPools.name, null);
        if(!suite.isPlayback()) {
          networkUtil.createGroup(groupName, location, suite, function () {
            var cmd = 'network lb create -g {1} -n loadBalancerName --location {location} --json'.formatArgs(loadBalancer, groupName);
            testUtils.executeCommand(suite, retry, cmd, function (result) {
              result.exitStatus.should.equal(0);
              var output = JSON.parse(result.text);
              frontendPortRangeStartUnderAllowedValue.loadBalancerId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeStartUnderAllowedValue.loadBalancerId, null);
              frontendPortRangeStartOverAllowedValue.loadBalancerId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeStartOverAllowedValue.loadBalancerId, null);
              frontendPortRangeEndUnderAllowedValue.loadBalancerId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeEndUnderAllowedValue.loadBalancerId, null);
              frontendPortRangeEndOverAllowedValue.loadBalancerId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeEndOverAllowedValue.loadBalancerId, null);
              backendPortOutOfRange.loadBalancerId = suite.isMocked ? output.id : suite.generateId(backendPortOutOfRange.loadBalancerId, null);
              var cmd = 'network public-ip create -g {1} -n publicIPAddressName --location {location} --json'.formatArgs(publicIPAddress, groupName);
              testUtils.executeCommand(suite, retry, cmd, function (result) {
                result.exitStatus.should.equal(0);
                var output = JSON.parse(result.text);
                frontendPortRangeStartUnderAllowedValue.publicIPAddressId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeStartUnderAllowedValue.publicIPAddressId, null);
                frontendPortRangeStartOverAllowedValue.publicIPAddressId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeStartOverAllowedValue.publicIPAddressId, null);
                frontendPortRangeEndUnderAllowedValue.publicIPAddressId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeEndUnderAllowedValue.publicIPAddressId, null);
                frontendPortRangeEndOverAllowedValue.publicIPAddressId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeEndOverAllowedValue.publicIPAddressId, null);
                backendPortOutOfRange.publicIPAddressId = suite.isMocked ? output.id : suite.generateId(backendPortOutOfRange.publicIPAddressId, null);
                var cmd = 'network lb frontend-ip create -g {1} -n frontendIPConfigurationName  --lb-name loadBalancerName --public-ip-name publicIPAddressName --json'.formatArgs(frontendIPConfiguration, groupName);
                testUtils.executeCommand(suite, retry, cmd, function (result) {
                  result.exitStatus.should.equal(0);
                  var output = JSON.parse(result.text);
                  frontendPortRangeStartUnderAllowedValue.frontendIPConfigurationId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeStartUnderAllowedValue.frontendIPConfigurationId, null);
                  frontendPortRangeStartOverAllowedValue.frontendIPConfigurationId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeStartOverAllowedValue.frontendIPConfigurationId, null);
                  frontendPortRangeEndUnderAllowedValue.frontendIPConfigurationId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeEndUnderAllowedValue.frontendIPConfigurationId, null);
                  frontendPortRangeEndOverAllowedValue.frontendIPConfigurationId = suite.isMocked ? output.id : suite.generateId(frontendPortRangeEndOverAllowedValue.frontendIPConfigurationId, null);
                  backendPortOutOfRange.frontendIPConfigurationId = suite.isMocked ? output.id : suite.generateId(backendPortOutOfRange.frontendIPConfigurationId, null);
                  done();
                });
              });
            });
          });
        } else {
          var subscriptionId = profile.current.getSubscription().id;
          frontendPortRangeStartUnderAllowedValue.loadBalancerId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'loadBalancers', frontendPortRangeStartUnderAllowedValue.loadBalancerName) : suite.generateId(frontendPortRangeStartUnderAllowedValue.loadBalancerId, null)
          frontendPortRangeStartOverAllowedValue.loadBalancerId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'loadBalancers', frontendPortRangeStartOverAllowedValue.loadBalancerName) : suite.generateId(frontendPortRangeStartOverAllowedValue.loadBalancerId, null)
          frontendPortRangeEndUnderAllowedValue.loadBalancerId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'loadBalancers', frontendPortRangeEndUnderAllowedValue.loadBalancerName) : suite.generateId(frontendPortRangeEndUnderAllowedValue.loadBalancerId, null)
          frontendPortRangeEndOverAllowedValue.loadBalancerId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'loadBalancers', frontendPortRangeEndOverAllowedValue.loadBalancerName) : suite.generateId(frontendPortRangeEndOverAllowedValue.loadBalancerId, null)
          backendPortOutOfRange.loadBalancerId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'loadBalancers', backendPortOutOfRange.loadBalancerName) : suite.generateId(backendPortOutOfRange.loadBalancerId, null)
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

    describe('inbound nat pools', function () {
      this.timeout(hour);
      it('create should create inbound nat pools', function (done) {
        var cmd = 'network lb inbound-nat-pool create -g {group} -n {name} --protocol {protocol} --frontend-port-range-start {frontendPortRangeStart} --frontend-port-range-end {frontendPortRangeEnd} --backend-port {backendPort} --lb-name {loadBalancerName}  --frontend-ip-name {frontendIPConfigurationName} --json'.formatArgs(inboundNatPools);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(inboundNatPools.name);
          output.protocol.toLowerCase().should.equal(inboundNatPools.protocol.toLowerCase());
          output.frontendPortRangeStart.should.equal(parseInt(inboundNatPools.frontendPortRangeStart, 10));
          output.frontendPortRangeEnd.should.equal(parseInt(inboundNatPools.frontendPortRangeEnd, 10));
          output.backendPort.should.equal(parseInt(inboundNatPools.backendPort, 10));
          done();
        });
      });
      it('show should display inbound nat pools details', function (done) {
        var cmd = 'network lb inbound-nat-pool show -g {group} -n {name} --lb-name {loadBalancerName} --json'.formatArgs(inboundNatPools);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.name.should.equal(inboundNatPools.name);
          output.protocol.toLowerCase().should.equal(inboundNatPools.protocol.toLowerCase());
          output.frontendPortRangeStart.should.equal(parseInt(inboundNatPools.frontendPortRangeStart, 10));
          output.frontendPortRangeEnd.should.equal(parseInt(inboundNatPools.frontendPortRangeEnd, 10));
          output.backendPort.should.equal(parseInt(inboundNatPools.backendPort, 10));
          done();
        });
      });
      it('set should update inbound nat pools', function (done) {
        var cmd = 'network lb inbound-nat-pool set -g {group} -n {name} --protocol {protocolNew} --frontend-port-range-start {frontendPortRangeStartNew} --frontend-port-range-end {frontendPortRangeEndNew} --backend-port {backendPortNew} --lb-name {loadBalancerName} --json'.formatArgs(inboundNatPools);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(inboundNatPools.name);
          output.protocol.toLowerCase().should.equal(inboundNatPools.protocolNew.toLowerCase());
          output.frontendPortRangeStart.should.equal(parseInt(inboundNatPools.frontendPortRangeStartNew, 10));
          output.frontendPortRangeEnd.should.equal(parseInt(inboundNatPools.frontendPortRangeEndNew, 10));
          output.backendPort.should.equal(parseInt(inboundNatPools.backendPortNew, 10));
          done();
        });
      });
      it('list should display all inbound nat pools in resource group', function (done) {
        var cmd = 'network lb inbound-nat-pool list -g {group} --lb-name {loadBalancerName} --json'.formatArgs(inboundNatPools);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var outputs = JSON.parse(result.text);
          _.some(outputs, function (output) {
            return output.name === inboundNatPools.name;
          }).should.be.true;
          done();
        });
      });
      it('delete should delete inbound nat pools', function (done) {
        var cmd = 'network lb inbound-nat-pool delete -g {group} -n {name} --quiet --lb-name {loadBalancerName} --json'.formatArgs(inboundNatPools);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network lb inbound-nat-pool show -g {group} -n {name} --lb-name {loadBalancerName} --json'.formatArgs(inboundNatPools);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.should.be.empty;
            done();
          });
        });
      });
      it('create with defaults should create inbound nat pools with default values', function (done) {
        var cmd = 'network lb inbound-nat-pool create -g {group} -n {name}  --lb-name {loadBalancerName}  --json'.formatArgs(inboundNatPoolsDefault);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(inboundNatPoolsDefault.name);
          output.protocol.toLowerCase().should.equal(inboundNatPoolsDefault.protocol.toLowerCase());;
          output.frontendPortRangeStart.should.equal(parseInt(inboundNatPoolsDefault.frontendPortRangeStart, 10));;
          output.frontendPortRangeEnd.should.equal(parseInt(inboundNatPoolsDefault.frontendPortRangeEnd, 10));;
          output.backendPort.should.equal(parseInt(inboundNatPoolsDefault.backendPort, 10));
          var cmd = 'network lb inbound-nat-pool delete -g {group} -n {name} --quiet --lb-name {loadBalancerName} --json'.formatArgs(inboundNatPoolsDefault);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            done();
          });
        });
      });

      it('create should fail for frontend port range start under allowed value', function (done) {
        var cmd = ('network lb inbound-nat-pool create -g {group} -n {name} --frontend-port-range-start {frontendPortRangeStart} --lb-name {loadBalancerName}  --json').formatArgs(frontendPortRangeStartUnderAllowedValue);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for frontend port range start over allowed value', function (done) {
        var cmd = ('network lb inbound-nat-pool create -g {group} -n {name} --frontend-port-range-start {frontendPortRangeStart} --lb-name {loadBalancerName}  --json').formatArgs(frontendPortRangeStartOverAllowedValue);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for frontend port range end under allowed value', function (done) {
        var cmd = ('network lb inbound-nat-pool create -g {group} -n {name} --frontend-port-range-end {frontendPortRangeEnd} --lb-name {loadBalancerName}  --json').formatArgs(frontendPortRangeEndUnderAllowedValue);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for frontend port range end over allowed value', function (done) {
        var cmd = ('network lb inbound-nat-pool create -g {group} -n {name} --frontend-port-range-end {frontendPortRangeEnd} --lb-name {loadBalancerName}  --json').formatArgs(frontendPortRangeEndOverAllowedValue);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for backend port out of range', function (done) {
        var cmd = ('network lb inbound-nat-pool create -g {group} -n {name} --backend-port {backendPort} --lb-name {loadBalancerName}  --json').formatArgs(backendPortOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
    });
  });
});
