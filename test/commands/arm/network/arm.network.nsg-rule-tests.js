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

var testPrefix = 'arm-network-nsg-rule-tests',
  groupName = 'xplat-test-rule',
  location;
var index = 0;

var networkSecurityGroupName;
var networkSecurityGroupId;

var securityRules = {
  description: 'createdesc',
  descriptionNew: 'setdesc',
  protocol: 'Tcp',
  protocolNew: 'Udp',
  sourcePortRange: '1025',
  sourcePortRangeNew: '65535',
  destinationPortRange: '4242',
  destinationPortRangeNew: '65042',
  sourceAddressPrefix: '10.0.0.0/16',
  sourceAddressPrefixNew: '10.0.0.0/8',
  destinationAddressPrefix: '11.0.0.0/24',
  destinationAddressPrefixNew: '11.0.0.0/8',
  access: 'Allow',
  accessNew: 'Deny',
  priority: '1500',
  priorityNew: '1542',
  direction: 'Inbound',
  directionNew: 'Outbound',
  name: 'securityRuleName'
}
securityRules.networkSecurityGroupName = 'networkSecurityGroupName';

var networkSecurityGroup = {
  location: 'westus'
};

var securityRulesDefault = {
  priority: '1500',
  priorityNew: '1542',
  protocol: '*',
  sourcePortRange: '*',
  destinationPortRange: '80',
  sourceAddressPrefix: '*',
  destinationAddressPrefix: '*',
  access: 'Allow',
  direction: 'Inbound',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'securityRulesDefaultName',
  group: groupName
};

var tooLongDescription = {
  description: 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'tooLongDescriptionName',
  group: groupName
};
var protocolOutOfRange = {
  protocol: 'Http',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'protocolOutOfRangeName',
  group: groupName
};
var sourcePortOutOfRange = {
  sourcePortRange: '66600',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'sourcePortOutOfRangeName',
  group: groupName
};
var destinationPortOutOfRange = {
  destinationPortRange: '66600',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'destinationPortOutOfRangeName',
  group: groupName
};
var invalidSourceAddressPrefix = {
  sourceAddressPrefix: '10.0.0.0/42',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'invalidSourceAddressPrefixName',
  group: groupName
};
var invalidDestinationAddressPrefix = {
  destinationAddressPrefix: '10.0.0.0/42',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'invalidDestinationAddressPrefixName',
  group: groupName
};
var accessOutOfRange = {
  access: 'Access',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'accessOutOfRangeName',
  group: groupName
};
var rulePriorityUnderRange = {
  priority: '99',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'rulePriorityUnderRangeName',
  group: groupName
};
var rulePriorityOverRange = {
  priority: '4097',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'rulePriorityOverRangeName',
  group: groupName
};
var directionOutOfRange = {
  direction: 'Direction',
  networkSecurityGroupName: 'networkSecurityGroupName',
  name: 'directionOutOfRangeName',
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
        location = securityRules.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        securityRules.location = location;
        securityRules.group = groupName;
        securityRules.name = suite.isMocked ? securityRules.name : suite.generateId(securityRules.name, null);
        if(!suite.isPlayback()) {
          networkUtil.createGroup(groupName, location, suite, function () {
            var cmd = 'network nsg create -g {1} -n networkSecurityGroupName --location {location} --json'.formatArgs(networkSecurityGroup, groupName);
            testUtils.executeCommand(suite, retry, cmd, function (result) {
              result.exitStatus.should.equal(0);
              var output = JSON.parse(result.text);
              tooLongDescription.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(tooLongDescription.networkSecurityGroupId, null);
              protocolOutOfRange.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(protocolOutOfRange.networkSecurityGroupId, null);
              sourcePortOutOfRange.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(sourcePortOutOfRange.networkSecurityGroupId, null);
              destinationPortOutOfRange.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(destinationPortOutOfRange.networkSecurityGroupId, null);
              invalidSourceAddressPrefix.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(invalidSourceAddressPrefix.networkSecurityGroupId, null);
              invalidDestinationAddressPrefix.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(invalidDestinationAddressPrefix.networkSecurityGroupId, null);
              accessOutOfRange.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(accessOutOfRange.networkSecurityGroupId, null);
              rulePriorityUnderRange.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(rulePriorityUnderRange.networkSecurityGroupId, null);
              rulePriorityOverRange.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(rulePriorityOverRange.networkSecurityGroupId, null);
              directionOutOfRange.networkSecurityGroupId = suite.isMocked ? output.id : suite.generateId(directionOutOfRange.networkSecurityGroupId, null);
              done();
            });
          });
        } else {
          var subscriptionId = profile.current.getSubscription().id;
          tooLongDescription.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', tooLongDescription.networkSecurityGroupName) : suite.generateId(tooLongDescription.networkSecurityGroupId, null)
          protocolOutOfRange.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', protocolOutOfRange.networkSecurityGroupName) : suite.generateId(protocolOutOfRange.networkSecurityGroupId, null)
          sourcePortOutOfRange.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', sourcePortOutOfRange.networkSecurityGroupName) : suite.generateId(sourcePortOutOfRange.networkSecurityGroupId, null)
          destinationPortOutOfRange.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', destinationPortOutOfRange.networkSecurityGroupName) : suite.generateId(destinationPortOutOfRange.networkSecurityGroupId, null)
          invalidSourceAddressPrefix.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', invalidSourceAddressPrefix.networkSecurityGroupName) : suite.generateId(invalidSourceAddressPrefix.networkSecurityGroupId, null)
          invalidDestinationAddressPrefix.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', invalidDestinationAddressPrefix.networkSecurityGroupName) : suite.generateId(invalidDestinationAddressPrefix.networkSecurityGroupId, null)
          accessOutOfRange.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', accessOutOfRange.networkSecurityGroupName) : suite.generateId(accessOutOfRange.networkSecurityGroupId, null)
          rulePriorityUnderRange.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', rulePriorityUnderRange.networkSecurityGroupName) : suite.generateId(rulePriorityUnderRange.networkSecurityGroupId, null)
          rulePriorityOverRange.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', rulePriorityOverRange.networkSecurityGroupName) : suite.generateId(rulePriorityOverRange.networkSecurityGroupId, null)
          directionOutOfRange.networkSecurityGroupId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'networkSecurityGroups', directionOutOfRange.networkSecurityGroupName) : suite.generateId(directionOutOfRange.networkSecurityGroupId, null)
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

    describe('security rules', function () {
      this.timeout(hour);
      it('create should create security rules', function (done) {
        var cmd = 'network nsg rule create -g {group} -n {name} --description {description} --protocol {protocol} --source-port-range {sourcePortRange} --destination-port-range {destinationPortRange} --source-address-prefix {sourceAddressPrefix} --destination-address-prefix {destinationAddressPrefix} --access {access} --priority {priority} --direction {direction} --nsg-name {networkSecurityGroupName}  --json'.formatArgs(securityRules);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(securityRules.name);
          output.description.toLowerCase().should.equal(securityRules.description.toLowerCase());
          output.protocol.toLowerCase().should.equal(securityRules.protocol.toLowerCase());
          output.sourcePortRange.toLowerCase().should.equal(securityRules.sourcePortRange.toLowerCase());
          output.destinationPortRange.toLowerCase().should.equal(securityRules.destinationPortRange.toLowerCase());
          output.sourceAddressPrefix.toLowerCase().should.equal(securityRules.sourceAddressPrefix.toLowerCase());
          output.destinationAddressPrefix.toLowerCase().should.equal(securityRules.destinationAddressPrefix.toLowerCase());
          output.access.toLowerCase().should.equal(securityRules.access.toLowerCase());
          output.priority.should.equal(parseInt(securityRules.priority, 10));
          output.direction.toLowerCase().should.equal(securityRules.direction.toLowerCase());
          done();
        });
      });
      it('show should display security rules details', function (done) {
        var cmd = 'network nsg rule show -g {group} -n {name} --nsg-name {networkSecurityGroupName} --json'.formatArgs(securityRules);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.name.should.equal(securityRules.name);
          output.description.toLowerCase().should.equal(securityRules.description.toLowerCase());
          output.protocol.toLowerCase().should.equal(securityRules.protocol.toLowerCase());
          output.sourcePortRange.toLowerCase().should.equal(securityRules.sourcePortRange.toLowerCase());
          output.destinationPortRange.toLowerCase().should.equal(securityRules.destinationPortRange.toLowerCase());
          output.sourceAddressPrefix.toLowerCase().should.equal(securityRules.sourceAddressPrefix.toLowerCase());
          output.destinationAddressPrefix.toLowerCase().should.equal(securityRules.destinationAddressPrefix.toLowerCase());
          output.access.toLowerCase().should.equal(securityRules.access.toLowerCase());
          output.priority.should.equal(parseInt(securityRules.priority, 10));
          output.direction.toLowerCase().should.equal(securityRules.direction.toLowerCase());
          done();
        });
      });
      it('set should update security rules', function (done) {
        var cmd = 'network nsg rule set -g {group} -n {name} --description {descriptionNew} --protocol {protocolNew} --source-port-range {sourcePortRangeNew} --destination-port-range {destinationPortRangeNew} --source-address-prefix {sourceAddressPrefixNew} --destination-address-prefix {destinationAddressPrefixNew} --access {accessNew} --priority {priorityNew} --direction {directionNew} --nsg-name {networkSecurityGroupName} --json'.formatArgs(securityRules);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(securityRules.name);
          output.description.toLowerCase().should.equal(securityRules.descriptionNew.toLowerCase());
          output.protocol.toLowerCase().should.equal(securityRules.protocolNew.toLowerCase());
          output.sourcePortRange.toLowerCase().should.equal(securityRules.sourcePortRangeNew.toLowerCase());
          output.destinationPortRange.toLowerCase().should.equal(securityRules.destinationPortRangeNew.toLowerCase());
          output.sourceAddressPrefix.toLowerCase().should.equal(securityRules.sourceAddressPrefixNew.toLowerCase());
          output.destinationAddressPrefix.toLowerCase().should.equal(securityRules.destinationAddressPrefixNew.toLowerCase());
          output.access.toLowerCase().should.equal(securityRules.accessNew.toLowerCase());
          output.priority.should.equal(parseInt(securityRules.priorityNew, 10));
          output.direction.toLowerCase().should.equal(securityRules.directionNew.toLowerCase());
          done();
        });
      });
      it('list should display all security rules in resource group', function (done) {
        var cmd = 'network nsg rule list -g {group} --nsg-name {networkSecurityGroupName} --json'.formatArgs(securityRules);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var outputs = JSON.parse(result.text);
          _.some(outputs, function (output) {
            return output.name === securityRules.name;
          }).should.be.true;
          done();
        });
      });
      it('delete should delete security rules', function (done) {
        var cmd = 'network nsg rule delete -g {group} -n {name} --quiet --nsg-name {networkSecurityGroupName} --json'.formatArgs(securityRules);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network nsg rule show -g {group} -n {name} --nsg-name {networkSecurityGroupName} --json'.formatArgs(securityRules);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.should.be.empty;
            done();
          });
        });
      });
      it('create with defaults should create security rules with default values', function (done) {
        var cmd = 'network nsg rule create -g {group} -n {name} --priority {priority} --nsg-name {networkSecurityGroupName}  --json'.formatArgs(securityRulesDefault);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(securityRulesDefault.name);
          output.protocol.toLowerCase().should.equal(securityRulesDefault.protocol.toLowerCase());;
          output.sourcePortRange.toLowerCase().should.equal(securityRulesDefault.sourcePortRange.toLowerCase());;
          output.destinationPortRange.toLowerCase().should.equal(securityRulesDefault.destinationPortRange.toLowerCase());;
          output.sourceAddressPrefix.toLowerCase().should.equal(securityRulesDefault.sourceAddressPrefix.toLowerCase());;
          output.destinationAddressPrefix.toLowerCase().should.equal(securityRulesDefault.destinationAddressPrefix.toLowerCase());;
          output.access.toLowerCase().should.equal(securityRulesDefault.access.toLowerCase());;
          output.direction.toLowerCase().should.equal(securityRulesDefault.direction.toLowerCase());
          var cmd = 'network nsg rule delete -g {group} -n {name} --quiet --nsg-name {networkSecurityGroupName} --json'.formatArgs(securityRulesDefault);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            done();
          });
        });
      });

      it('create should fail for too long description', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --description {description} --nsg-name {networkSecurityGroupName}  --json').formatArgs(tooLongDescription);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for protocol out of range', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --protocol {protocol} --nsg-name {networkSecurityGroupName}  --json').formatArgs(protocolOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for source port out of range', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --source-port-range {sourcePortRange} --nsg-name {networkSecurityGroupName}  --json').formatArgs(sourcePortOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for destination port out of range', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --destination-port-range {destinationPortRange} --nsg-name {networkSecurityGroupName}  --json').formatArgs(destinationPortOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for invalid source address prefix', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --source-address-prefix {sourceAddressPrefix} --nsg-name {networkSecurityGroupName}  --json').formatArgs(invalidSourceAddressPrefix);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for invalid destination address prefix', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --destination-address-prefix {destinationAddressPrefix} --nsg-name {networkSecurityGroupName}  --json').formatArgs(invalidDestinationAddressPrefix);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for access out of range', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --access {access} --nsg-name {networkSecurityGroupName}  --json').formatArgs(accessOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for rule priority under range', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --priority {priority} --nsg-name {networkSecurityGroupName}  --json').formatArgs(rulePriorityUnderRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for rule priority over range', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --priority {priority} --nsg-name {networkSecurityGroupName}  --json').formatArgs(rulePriorityOverRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for direction out of range', function (done) {
        var cmd = ('network nsg rule create -g {group} -n {name} --direction {direction} --nsg-name {networkSecurityGroupName}  --json').formatArgs(directionOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
    });
  });
});
