/**
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

// Warning: This code was generated by a tool.
// 
// Changes to this file may cause incorrect behavior and will be lost if the
// code is regenerated.

'use strict';

var generatorUtils = require('../../../util/generatorUtils');
var resourceUtils = require('../resource/resourceUtils');
var util = require('util');
var validation = require('../../../util/validation');

var profile = require('../../../util/profile');
var utils = require('../../../util/utils');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var network = cli.category('network')
    .description($('Commands to manage network resources'));
  var applicationGateways = network.category('application-gateway')
    .description($('Commands to manage application gateways'));
  var requestRoutingRules = applicationGateways.category('rule')
    .description($('Commands to manage request routing rules'));

  requestRoutingRules.command('create [resource-group] [gateway-name] [name]')
    .description($('Create a request routing rules'))
    .usage('[options] <resource-group> <gateway-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-n, --name <name>', $('the name of the request routing rule'))
    .option('-t, --type [type]', $('rule type'))
    .option('-p, --address-pool-name [address-pool-name]', $('sets backend address pool. This option' +
      '\n     is mutually exclusive with --address-pool-id'))
    .option('-a, --address-pool-id [address-pool-id]', $('sets backend address pool. This option' +
      '\n     is mutually exclusive with --address-pool-name'))
    .option('-i, --http-settings-name [http-settings-name]', $('sets backend http settings. This option' +
      '\n     is mutually exclusive with --http-settings-id'))
    .option('-e, --http-settings-id [http-settings-id]', $('sets backend http settings. This option' +
      '\n     is mutually exclusive with --http-settings-name'))
    .option('-l, --http-listener-name [http-listener-name]', $('sets http listener. This option is' +
      '\n     mutually exclusive with --http-listener-id'))
    .option('-r, --http-listener-id [http-listener-id]', $('sets http listener. This option is' +
      '\n     mutually exclusive with --http-listener-name'))
    .option('--nowait', $('do not wait for the operation to complete. Returns as soon as the intial request is received by the server'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('resource group : '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('gateway name : '), gatewayName, _);
      name = cli.interaction.promptIfNotGiven($('name : '), name, _);

      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var index = 0;
      var applicationGateway;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if (!applicationGateway) {
        throw new Error(util.format($('application gateway with name "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      if(utils.findFirstCaseIgnore(applicationGateway.requestRoutingRules, {name: name})) {
        throw new Error(util.format($('request routing rules with name "%s" already exists in the "%s"'), name, gatewayName));
      }

      var parameters = {};
      if(!parameters.requestRoutingRules) {
        parameters.requestRoutingRules = [];
      }
      if(!parameters.requestRoutingRules[index]) {
        parameters.requestRoutingRules[index] = {};
      }
      if(options.type) {
        parameters.requestRoutingRules[index].ruleType = validation.isIn(options.type, ['Basic', 'PathBasedRouting'], '--type');
      }

      if(!parameters.requestRoutingRules[index].backendAddressPool) {
        parameters.requestRoutingRules[index].backendAddressPool = {};
      }
      if(options.addressPoolId) {
        if(options.addressPoolName) {
          cli.output.warn($('--address-pool-name parameter will be ignored because --address-pool-id and --address-pool-name are mutually exclusive'));
        }
        parameters.requestRoutingRules[index].backendAddressPool.id = options.addressPoolId;
      } else if(options.addressPoolName) {
        var referredbackendAddressPool = utils.findFirstCaseIgnore(applicationGateway.backendAddressPools, {name: options.addressPoolName});
        if(!referredbackendAddressPool) {
          throw new Error(util.format($('No backend address pool with name "%s" found'), options.addressPoolName));
        }
        var idContainerbackendAddressPool = referredbackendAddressPool;
        parameters.requestRoutingRules[index].backendAddressPool.id = idContainerbackendAddressPool.id;
      }

      if(!parameters.requestRoutingRules[index].backendHttpSettings) {
        parameters.requestRoutingRules[index].backendHttpSettings = {};
      }
      if(options.httpSettingsId) {
        if(options.httpSettingsName) {
          cli.output.warn($('--http-settings-name parameter will be ignored because --http-settings-id and --http-settings-name are mutually exclusive'));
        }
        parameters.requestRoutingRules[index].backendHttpSettings.id = options.httpSettingsId;
      } else if(options.httpSettingsName) {
        var referredbackendHttpSettings = utils.findFirstCaseIgnore(applicationGateway.backendHttpSettingsCollection, {name: options.httpSettingsName});
        if(!referredbackendHttpSettings) {
          throw new Error(util.format($('No backend http settings with name "%s" found'), options.httpSettingsName));
        }
        var idContainerbackendHttpSettings = referredbackendHttpSettings;
        parameters.requestRoutingRules[index].backendHttpSettings.id = idContainerbackendHttpSettings.id;
      }

      if(!parameters.requestRoutingRules[index].httpListener) {
        parameters.requestRoutingRules[index].httpListener = {};
      }
      if(options.httpListenerId) {
        if(options.httpListenerName) {
          cli.output.warn($('--http-listener-name parameter will be ignored because --http-listener-id and --http-listener-name are mutually exclusive'));
        }
        parameters.requestRoutingRules[index].httpListener.id = options.httpListenerId;
      } else if(options.httpListenerName) {
        var referredhttpListener = utils.findFirstCaseIgnore(applicationGateway.httpListeners, {name: options.httpListenerName});
        if(!referredhttpListener) {
          throw new Error(util.format($('No http listener with name "%s" found'), options.httpListenerName));
        }
        var idContainerhttpListener = referredhttpListener;
        parameters.requestRoutingRules[index].httpListener.id = idContainerhttpListener.id;
      }

      parameters.requestRoutingRules[index].name = name;
      applicationGateway.requestRoutingRules.push(parameters.requestRoutingRules[index]);

      generatorUtils.removeEmptyObjects(parameters);
      progress = cli.interaction.progress(util.format($('Creating request routing rules in "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.createOrUpdate(resourceGroup, gatewayName, applicationGateway, _);
      } finally {
        progress.end();
      }

      cli.interaction.formatOutput(applicationGateway, generatorUtils.traverse);
    });

  requestRoutingRules.command('set [resource-group] [gateway-name] [name]')
    .description($('Update a request routing rules'))
    .usage('[options] <resource-group> <gateway-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-n, --name <name>', $('the name of the request routing rule'))
    .option('-t, --type [type]', $('rule type'))
    .option('-p, --address-pool-name [address-pool-name]', $('sets backend address pool. This option' +
      '\n     is mutually exclusive with --address-pool-id'))
    .option('-a, --address-pool-id [address-pool-id]', $('sets backend address pool. This option' +
      '\n     is mutually exclusive with --address-pool-name'))
    .option('-i, --http-settings-name [http-settings-name]', $('sets backend http settings. This option' +
      '\n     is mutually exclusive with --http-settings-id'))
    .option('-e, --http-settings-id [http-settings-id]', $('sets backend http settings. This option' +
      '\n     is mutually exclusive with --http-settings-name'))
    .option('-l, --http-listener-name [http-listener-name]', $('sets http listener. This option is' +
      '\n     mutually exclusive with --http-listener-id'))
    .option('-r, --http-listener-id [http-listener-id]', $('sets http listener. This option is' +
      '\n     mutually exclusive with --http-listener-name'))
    .option('--nowait', $('do not wait for the operation to complete. Returns as soon as the intial request is received by the server'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('resource group : '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('gateway name : '), gatewayName, _);
      name = cli.interaction.promptIfNotGiven($('name : '), name, _);

      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var applicationGateway;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if (!applicationGateway) {
        throw new Error(util.format($('application gateway with name "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      var requestRoutingRule = utils.findFirstCaseIgnore(applicationGateway.requestRoutingRules, {name: name});
      var index = utils.indexOfCaseIgnore(applicationGateway.requestRoutingRules, {name: name});
      if(!requestRoutingRule) {
        throw new Error(util.format($('request routing rules with name "%s" not found in the "%s"'), name, gatewayName));
      }

      var parameters = applicationGateway;
      if(!parameters.requestRoutingRules) {
        parameters.requestRoutingRules = [];
      }
      if(!parameters.requestRoutingRules[index]) {
        parameters.requestRoutingRules[index] = {};
      }
      if(options.type) {
        parameters.requestRoutingRules[index].ruleType = validation.isIn(options.type, ['Basic', 'PathBasedRouting'], '--type');
      }

      if(!parameters.requestRoutingRules[index].backendAddressPool) {
        parameters.requestRoutingRules[index].backendAddressPool = {};
      }
      if(options.addressPoolId) {
        if(options.addressPoolName) {
          cli.output.warn($('--address-pool-name parameter will be ignored because --address-pool-id and --address-pool-name are mutually exclusive'));
        }
        parameters.requestRoutingRules[index].backendAddressPool.id = options.addressPoolId;
      } else if(options.addressPoolName) {
        var referredbackendAddressPool = utils.findFirstCaseIgnore(applicationGateway.backendAddressPools, {name: options.addressPoolName});
        if(!referredbackendAddressPool) {
          throw new Error(util.format($('No backend address pool with name "%s" found'), options.addressPoolName));
        }
        var idContainerbackendAddressPool = referredbackendAddressPool;
        parameters.requestRoutingRules[index].backendAddressPool.id = idContainerbackendAddressPool.id;
      }

      if(!parameters.requestRoutingRules[index].backendHttpSettings) {
        parameters.requestRoutingRules[index].backendHttpSettings = {};
      }
      if(options.httpSettingsId) {
        if(options.httpSettingsName) {
          cli.output.warn($('--http-settings-name parameter will be ignored because --http-settings-id and --http-settings-name are mutually exclusive'));
        }
        parameters.requestRoutingRules[index].backendHttpSettings.id = options.httpSettingsId;
      } else if(options.httpSettingsName) {
        var referredbackendHttpSettings = utils.findFirstCaseIgnore(applicationGateway.backendHttpSettingsCollection, {name: options.httpSettingsName});
        if(!referredbackendHttpSettings) {
          throw new Error(util.format($('No backend http settings with name "%s" found'), options.httpSettingsName));
        }
        var idContainerbackendHttpSettings = referredbackendHttpSettings;
        parameters.requestRoutingRules[index].backendHttpSettings.id = idContainerbackendHttpSettings.id;
      }

      if(!parameters.requestRoutingRules[index].httpListener) {
        parameters.requestRoutingRules[index].httpListener = {};
      }
      if(options.httpListenerId) {
        if(options.httpListenerName) {
          cli.output.warn($('--http-listener-name parameter will be ignored because --http-listener-id and --http-listener-name are mutually exclusive'));
        }
        parameters.requestRoutingRules[index].httpListener.id = options.httpListenerId;
      } else if(options.httpListenerName) {
        var referredhttpListener = utils.findFirstCaseIgnore(applicationGateway.httpListeners, {name: options.httpListenerName});
        if(!referredhttpListener) {
          throw new Error(util.format($('No http listener with name "%s" found'), options.httpListenerName));
        }
        var idContainerhttpListener = referredhttpListener;
        parameters.requestRoutingRules[index].httpListener.id = idContainerhttpListener.id;
      }

      generatorUtils.removeEmptyObjects(parameters);
      progress = cli.interaction.progress(util.format($('Updating request routing rules in "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.createOrUpdate(resourceGroup, gatewayName, applicationGateway, _);
      } finally {
        progress.end();
      }
      cli.interaction.formatOutput(applicationGateway, generatorUtils.traverse);
    });

  requestRoutingRules.command('delete [resource-group] [gateway-name] [name]')
    .description($('Delete a request routing rules'))
    .usage('[options] <resource-group> <gateway-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-n, --name <name>', $('the name of the request routing rule'))
    .option('--nowait', $('do not wait for the operation to complete. Returns as soon as the intial request is received by the server'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('resource group : '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('gateway name : '), gatewayName, _);
      name = cli.interaction.promptIfNotGiven($('name : '), name, _);

      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var applicationGateway;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if (!applicationGateway) {
        throw new Error(util.format($('application gateway "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      var index = utils.indexOfCaseIgnore(applicationGateway.requestRoutingRules, {name: name});
      if (index === -1) {
        throw new Error(util.format($('request routing rules "%s" not found in the gatewayName "%s"'), name, applicationGateway.name));
      }

      if (!options.quiet && !cli.interaction.confirm(util.format($('Delete request routing rules with name "%s" from "%s"? [y/n] '), name, gatewayName), _)) {
        return;
      }

      applicationGateway.requestRoutingRules.splice(index, 1);
      progress = cli.interaction.progress('Deleting request routing rules');
      try {
        applicationGateway = networkManagementClient.applicationGateways.createOrUpdate(resourceGroup, gatewayName, applicationGateway, _);
      } finally {
        progress.end();
      }

      cli.interaction.formatOutput(applicationGateway, generatorUtils.traverse);
    });

  requestRoutingRules.command('show [resource-group] [gateway-name] [name]')
    .description($('Show a request routing rules'))
    .usage('[options] <resource-group> <gateway-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-n, --name <name>', $('the name of the request routing rule'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('resource group : '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('gateway name : '), gatewayName, _);
      name = cli.interaction.promptIfNotGiven($('name : '), name, _);

      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var applicationGateway;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if (!applicationGateway) {
        throw new Error(util.format($('application gateway with name "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      var requestRoutingRule = utils.findFirstCaseIgnore(applicationGateway.requestRoutingRules, {name: name});
      if(!requestRoutingRule) {
        cli.output.warn(util.format($('request routing rules with name "%s" not found in the gatewayName "%s"'), name, applicationGateway.name));
      }

      cli.interaction.formatOutput(requestRoutingRule, generatorUtils.traverse);
    });

  requestRoutingRules.command('list [resource-group] [gateway-name]')
    .description($('List request routing rules'))
    .usage('[options] <resource-group> <gateway-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var applicationGateway = null;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if(!applicationGateway) {
        throw new Error(util.format($('application gateways with name "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      var items = applicationGateway.requestRoutingRules;
      cli.interaction.formatOutput(items, function(items) {
        if (items.length === 0) {
          cli.output.warn($('No request routing rules found'));
        } else {
          cli.output.table(items, function (row, item) {
            row.cell($('Name'), item.name);
            var resInfo = resourceUtils.getResourceInformation(item.id);
            row.cell($('Resource group'), resInfo.resourceGroup);
            row.cell($('Provisioning state'), item.provisioningState);
          });
        }
      });
    });
};
