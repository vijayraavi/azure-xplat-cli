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

'use strict';

var util = require('util');
var utils = require('../../../util/utils');
var profile = require('../../../util/profile/index');
var constants = require('./constants');
var $ = utils.getLocaleString;

var NetworkUsage = require('./networkUsage');
var Nic = require('./nic');
var DnsZone = require('./dnsZone');
var TrafficManager = require('./trafficManager');
var VirtualNetworkGateway = require('./virtualNetworkGateway');
var AppGateway = require('./appGateway');
var ExpressRoute = require('./expressRoute');

exports.init = function (cli) {
  var network = cli.category('network')
    .description($('Commands to manage network resources'));
  var usage = network.category('usage')
    .description($('Commands to manage network usage'));

  usage.command('list [location]')
    .description($('List usage of network resources.'))
    .usage('[options] <location>')
    .option('-l, --location <location>', $('the location'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (location, options, _) {
      location = cli.interaction.promptIfNotGiven($('Location: '), location, _);
      location = utils.toLowerCaseAndRemoveSpace(location);
      var networkManagementClient = getNetworkManagementClient(options);
      var networkUsage = new NetworkUsage(cli, networkManagementClient);
      networkUsage.list(location, options, _);
    });

  var nic = network.category('nic')
    .description($('Commands to manage network interfaces'));

  nic.command('list [resource-group]')
    .description($('Get all network interfaces'))
    .usage('[options] [resource-group]')
    .option('-g, --resource-group [resource-group]', $('the name of the resource group'))
    .option('-m, --virtual-machine-scale-set-name [virtual-machine-scale-set-name]', $('the name of the virtual machine scale set'))
    .option('-i, --virtual-machine-index [virtual-machine-index]', $('the index of the virtual machine in scale set'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, options, _) {
      options.resourceGroup = resourceGroup;
      var networkManagementClient = getNetworkManagementClient(options);
      var nic = new Nic(cli, networkManagementClient);
      nic.list(options, _);
    });

  nic.command('show [resource-group] [name]')
    .description($('Get a network interface'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the network interface'))
    .option('-m, --virtual-machine-scale-set-name [virtual-machine-scale-set-name]', $('the name of the virtual machine scale set'))
    .option('-i, --virtual-machine-index [virtual-machine-index]', $('the index of virtual machine in scale set'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Network interface name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var nic = new Nic(cli, networkManagementClient);
      nic.show(resourceGroup, name, options, _);
    });

  var nicIpConfig = nic.category('ip-config')
    .description($('Commands to manage network interface ip configurations'));

  var nicAddressPool = nicIpConfig.category('address-pool')
    .description($('Commands to manage backend address pools of the network interface ip configuration'));

  nicAddressPool.command('create [resource-group] [nic-name] [ip-config-name]')
    .description($('Add a backend address pool to a NIC ip configuration'))
    .usage('[options] <resource-group> <nic-name> <ip-config-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-c, --nic-name <nic-name>', $('the name of the network interface'))
    .option('-n, --ip-config-name <ip-config-name>', $('the name of ip configuration'))
    .option('-i, --lb-address-pool-id [lb-address-pool-id]', util.format($('the load balancer backend address pool identifier' +
      '\n   e.g. %s'), constants.help.id.lbAddressPool))
    .option('-l, --lb-name [lb-name]', $('the load balancer name.' +
      '\n   This load balancer must exists in the same resource group as the NIC.'))
    .option('-a, --lb-address-pool-name [lb-address-pool-name]', $('the name of the address pool that exists in the load balancer' +
      '\n   Please use --lb-address-pool-id if that is not the case.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, nicName, ipConfigName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      nicName = cli.interaction.promptIfNotGiven($('Network interface name: '), nicName, _);
      ipConfigName = ipConfigName || options.ipConfigName;

      var networkManagementClient = getNetworkManagementClient(options);
      var nic = new Nic(cli, networkManagementClient);
      nic.createBackendAddressPool(resourceGroup, nicName, ipConfigName, options, _);
    });

  nicAddressPool.command('delete [resource-group] [nic-name] [ip-config-name]')
    .description($('Delete a backend address pool from a NIC ip configuration'))
    .usage('[options] <resource-group> <nic-name> <ip-config-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-c, --nic-name <nic-name>', $('the name of the network interface'))
    .option('-n, --ip-config-name <ip-config-name>', $('the name of ip configuration'))
    .option('-i, --lb-address-pool-id [lb-address-pool-id]', util.format($('the load balancer backend address pool identifier' +
      '\n   e.g. %s'), constants.help.id.lbAddressPool))
    .option('-l, --lb-name [lb-name]', $('the load balancer name.' +
      '\n   This load balancer must exists in the same resource group as the NIC.'))
    .option('-a, --lb-address-pool-name [lb-address-pool-name]', $('the name of the address pool that exists in the load balancer' +
      '\n   Please use --lb-address-pool-id if that is not the case.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, nicName, ipConfigName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      nicName = cli.interaction.promptIfNotGiven($('Network interface name: '), nicName, _);
      ipConfigName = ipConfigName || options.ipConfigName;

      var networkManagementClient = getNetworkManagementClient(options);
      var nic = new Nic(cli, networkManagementClient);
      nic.deleteBackendAddressPool(resourceGroup, nicName, ipConfigName, options, _);
    });

  var nicInboundRule = nicIpConfig.category('inbound-nat-rule')
    .description($('Commands to manage inbound NAT rules of the network interface ip configuration'));

  nicInboundRule.command('create [resource-group] [nic-name] [ip-config-name]')
    .description($('Add an inbound NAT rule to a NIC ip configuration'))
    .usage('[options] <resource-group> <nic-name> <ip-config-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-c, --nic-name <nic-name>', $('the name of the network interface'))
    .option('-n, --ip-config-name <ip-config-name>', $('the name of ip configuration'))
    .option('-i, --lb-inbound-nat-rule-id [lb-inbound-nat-rule-id]', util.format($('the inbound NAT rule identifier.' +
      '\n   e.g. %s'), constants.help.id.lbInboundNatRule))
    .option('-l, --lb-name [lb-name]', $('the load balancer name.' +
      '\n   This load balancer must exists in the same resource group as the NIC.'))
    .option('-r, --lb-inbound-nat-rule-name [lb-inbound-nat-rule-name]', $('the name of the inbound NAT rule that exists in the load balancer.' +
      '\n   Please use --inbound-nat-rule-id if that is not the case.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, nicName, ipConfigName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      nicName = cli.interaction.promptIfNotGiven($('Network interface name: '), nicName, _);
      ipConfigName = ipConfigName || options.ipConfigName;

      var networkManagementClient = getNetworkManagementClient(options);
      var nic = new Nic(cli, networkManagementClient);
      nic.createInboundNatRule(resourceGroup, nicName, ipConfigName, options, _);
    });

  nicInboundRule.command('delete [resource-group] [nic-name] [ip-config-name]')
    .description($('Delete an inbound NAT rule from a NIC ip configuration'))
    .usage('[options] <resource-group> <nic-name> <ip-config-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-c, --nic-name <nic-name>', $('the name of the network interface'))
    .option('-n, --ip-config-name <ip-config-name>', $('the name of ip configuration'))
    .option('-i, --lb-inbound-nat-rule-id [lb-inbound-nat-rule-id]', util.format($('the inbound NAT rule identifier.' +
      '\n   e.g. %s'), constants.help.id.lbInboundNatRule))
    .option('-l, --lb-name [lb-name]', $('the load balancer name.' +
      '\n   This load balancer must exists in the same resource group as the NIC.'))
    .option('-r, --lb-inbound-nat-rule-name [lb-inbound-nat-rule-name]', $('the name of the inbound NAT rule that exists in the load balancer.' +
      '\n   Please use --inbound-nat-rule-id if that is not the case.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, nicName, ipConfigName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      nicName = cli.interaction.promptIfNotGiven($('Network interface name: '), nicName, _);
      ipConfigName = ipConfigName || options.ipConfigName;

      var networkManagementClient = getNetworkManagementClient(options);
      var nic = new Nic(cli, networkManagementClient);
      nic.deleteInboundNatRule(resourceGroup, nicName, ipConfigName, options, _);
    });

  var dns = network.category('dns')
    .description($('Commands to manage DNS'));

  var dnsZone = dns.category('zone')
    .description($('Commands to manage DNS zone'));

  dnsZone.command('create [resource-group] [name]')
    .description($('Create a DNS zone'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the DNS zone'))
    .option('-t, --tags [tags]', $(constants.help.tags.create))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('DNS zone name: '), name, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.create(resourceGroup, name, options, _);
    });

  dnsZone.command('set [resource-group] [name]')
    .description($('Set a DNS zone'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the DNS zone'))
    .option('-t, --tags [tags]', $(constants.help.tags.set))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('DNS zone name: '), name, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.set(resourceGroup, name, options, _);
    });

  dnsZone.command('list [resource-group]')
    .description($('Get all DNS zones'))
    .usage('[options] [resource-group]')
    .option('-g, --resource-group [resource-group]', $('the name of the resource group'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, options, _) {
      options.resourceGroup = resourceGroup;
      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.list(options, _);
    });

  dnsZone.command('show [resource-group] [name]')
    .description($('Get a DNS zone'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the DNS zone' +
      '\n     You can specify "*" (in quotes) for this parameter'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('DNS zone name: '), name, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.show(resourceGroup, name, options, _);
    });

  dnsZone.command('clear [resource-group] [name]')
    .description($('Delete all record sets in a DNS zone'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the DNS zone'))
    .option('-q, --quiet', $('quiet mode, do not ask for clear confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('DNS zone name: '), name, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.clear(resourceGroup, name, options, _);
    });

  dnsZone.command('delete [resource-group] [name]')
    .description(util.format($('Delete a DNS zone. WARNING: This will delete the DNS zone and all DNS records. ' +
      'This operation cannot be undone.')))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the DNS zone'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('DNS zone name: '), name, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.delete(resourceGroup, name, options, _);
    });

  dnsZone.command('import [resource-group] [name] [file-name]')
    .description($('Import a DNS zone'))
    .usage('[options] <resource-group> <name> <file-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the DNS zone'))
    .option('-f, --file-name <file-name>', $('the name of the zone file'))
    .option('--force', $('force overwrite of existing record sets. Otherwise, records are merged with existing record sets'))
    .option('--debug', $('output debug info'))
    .option('--parse-only', $('parse zone file only, without import'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, fileName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('DNS zone name: '), name, _);
      options.fileName = cli.interaction.promptIfNotGiven($('Zone file name: '), fileName, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.import(resourceGroup, name, options, _);
    });

  dnsZone.command('export [resource-group] [name] [file-name]')
    .description($('Export a DNS zone as a zone file'))
    .usage('[options] <resource-group> <name> <file-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the DNS zone'))
    .option('-f, --file-name <file-name>', $('the name of the zone file'))
    .option('-q, --quiet', $('quiet mode, do not ask for overwrite confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, fileName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('DNS zone name: '), name, _);
      options.fileName = cli.interaction.promptIfNotGiven($('Zone file name: '), fileName, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.export(resourceGroup, name, options, _);
    });

  var dnsRecordSet = dns.category('record-set')
    .description($('Commands to manage record sets in DNS zone'));

  dnsRecordSet.command('create [resource-group] [dns-zone-name] [name] [type]')
    .description($('Create a DNS zone record set'))
    .usage('[options] <resource-group> <dns-zone-name> <name> <type>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-z, --dns-zone-name <dns-zone-name>', $('the name of the DNS zone'))
    .option('-n, --name <name>', $('the relative name of the record set within the DNS zone'))
    .option('-y, --type <type>', util.format($('the type of the record set, valid values are' +
      '\n     [%s]'), constants.dnsZone.setTypes))
    .option('-l, --ttl [ttl]', $('time to live specified in seconds'))
    .option('-m, --metadata [metadata]', $(constants.help.tags.create))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, dnsZoneName, name, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      dnsZoneName = cli.interaction.promptIfNotGiven($('DNS zone name: '), dnsZoneName, _);
      name = cli.interaction.promptIfNotGiven($('Record set name: '), name, _);
      options.type = cli.interaction.promptIfNotGiven($('Type: '), type, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.createRecordSet(resourceGroup, dnsZoneName, name, options, _);
    });

  dnsRecordSet.command('set [resource-group] [dns-zone-name] [name] [type]')
    .description($('Set a DNS zone record set'))
    .usage('[options] <resource-group> <dns-zone-name> <name> <type>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-z, --dns-zone-name <dns-zone-name>', $('the name of the DNS zone'))
    .option('-n, --name <name>', $('the relative name of the record set within the DNS zone'))
    .option('-y, --type <type>', util.format($('the type of the record set, valid values are' +
      '\n     [%s]'), constants.dnsZone.recordTypes))
    .option('-l, --ttl [ttl]', $('time to live specified in seconds'))
    .option('-m, --metadata [metadata]', $(constants.help.tags.create))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, dnsZoneName, name, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      dnsZoneName = cli.interaction.promptIfNotGiven($('DNS zone name: '), dnsZoneName, _);
      name = cli.interaction.promptIfNotGiven($('Record set name: '), name, _);
      options.type = cli.interaction.promptIfNotGiven($('Type: '), type, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.setRecordSet(resourceGroup, dnsZoneName, name, options, _);
    });

  dnsRecordSet.command('set-soa-record [resource-group] [dns-zone-name] [record-set-name]')
    .description($('Set a SOA record in a record set under a DNS zone'))
    .usage('[options] <resource-group> <dns-zone-name> <record-set-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-z, --dns-zone-name <dns-zone-name>', $('the name of the DNS zone'))
    .option('-e, --email [email]', $('the email attribute'))
    .option('-i, --expire-time [expire-time]', $('the expire time specified in seconds'))
    .option('-S, --serial-number [serial-number]', $('the serial number'))
    .option('-n, --minimum-ttl [minimum-ttl]', $('the minimum time to live specified in seconds'))
    .option('-r, --refresh-time [refresh-time]', $('the refresh time specified in seconds'))
    .option('-j, --retry-time [retry-time]', $('the retry time specified in seconds'))
    .option('-l, --ttl [ttl]', $('time to live specified in seconds'))
    .option('-m, --metadata [metadata]', $(constants.help.tags.create))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, dnsZoneName, recordSetName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      dnsZoneName = cli.interaction.promptIfNotGiven($('DNS zone name: '), dnsZoneName, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.setSoaRecord(resourceGroup, dnsZoneName, options, _);
    });

  dnsRecordSet.command('list [resource-group] [dns-zone-name] [type]')
    .description($('Get all record sets in a DNS zone'))
    .usage('[options] <resource-group> <dns-zone-name> [type]')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-z, --dns-zone-name <dns-zone-name>', $('the name of the DNS zone'))
    .option('-y, --type [type]', util.format($('the type of the record set, ' +
      '\n     If specified only record sets of this type will be listed.' +
      '\n     valid values are [%s]'), constants.dnsZone.recordTypes))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, dnsZoneName, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      dnsZoneName = cli.interaction.promptIfNotGiven($('DNS zone name: '), dnsZoneName, _);
      options.type = options.type ? options.type : type;

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.listRecordSets(resourceGroup, dnsZoneName, options, _);
    });

  dnsRecordSet.command('show [resource-group] [dns-zone-name] [name] [type]')
    .description($('Get a record set in a DNS zone'))
    .usage('[options] <resource-group> <dns-zone-name> <name> <type>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-z, --dns-zone-name <dns-zone-name>', $('the name of the DNS zone'))
    .option('-n, --name <name>', $('the relative name of the record set within the DNS zone'))
    .option('-y, --type <type>', util.format($('the type of the record set, ' +
      '\n     valid values are [%s]'), constants.dnsZone.recordTypes))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, dnsZoneName, name, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      dnsZoneName = cli.interaction.promptIfNotGiven($('DNS zone name: '), dnsZoneName, _);
      name = cli.interaction.promptIfNotGiven($('Record set name: '), name, _);
      options.type = cli.interaction.promptIfNotGiven($('Type: '), type, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.showRecordSet(resourceGroup, dnsZoneName, name, options, _);
    });

  dnsRecordSet.command('delete [resource-group] [dns-zone-name] [name] [type]')
    .description($('Delete a record set from a DNS zone'))
    .usage('[options] <resource-group> <dns-zone-name> <name> <type>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-z, --dns-zone-name <dns-zone-name>', $('the name of the DNS zone'))
    .option('-n, --name <name>', $('the relative name of the record set within the DNS zone'))
    .option('-y, --type <type>', util.format($('the type of the record set, ' +
      '\n     valid values are [%s]'), constants.dnsZone.restrictedRecordTypes))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, dnsZoneName, name, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      dnsZoneName = cli.interaction.promptIfNotGiven($('DNS zone name: '), dnsZoneName, _);
      name = cli.interaction.promptIfNotGiven($('Record set name: '), name, _);
      options.type = cli.interaction.promptIfNotGiven($('Type: '), options.type || type, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.deleteRecordSet(resourceGroup, dnsZoneName, name, options, _);
    });

  dnsRecordSet.command('add-record [resource-group] [dns-zone-name] [record-set-name] [type]')
    .description($('Add a record in a record set under a DNS zone'))
    .usage('[options] <resource-group> <dns-zone-name> <record-set-name> <type>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-z, --dns-zone-name <dns-zone-name>', $('the name of the DNS zone'))
    .option('-n, --record-set-name <record-set-name>', $('the name of the record set'))
    .option('-y, --type <type>', util.format($('the type of the record set.' +
      '\nValid values are [%s]' +
      '\nTo update the SOA record see "azure network dns record-set set-soa-record --help"\n' +
      '\nThe record type A'), constants.dnsZone.setTypes))
    .option('-a  --ipv4-address [ipv4-address]', $('the IPv4 address attribute\n' +
      '\nRecord type AAAA'))
    .option('-b  --ipv6-address [ipv6-address]', $('the IPv6 address attribute\n' +
      '\nRecord type CNAME'))
    .option('-c  --cname [cname]', $('the canonical name (target)\n' +
      '\nRecord type MX'))
    .option('-f, --preference [preference]', $('preference attribute'))
    .option('-e, --exchange [exchange]', $('exchange attribute\n' +
      '\nRecord type PTR'))
    .option('-P, --ptrdname [ptrdname]', $('ptr domain name\n' +
      '\nRecord type NS'))
    .option('-d  --nsdname [nsdname]', $('the domain name attribute\n' +
      '\nRecord type SRV'))
    .option('-p, --priority [priority]', $('the priority attribute'))
    .option('-w, --weight [weight]', $('the weight attribute'))
    .option('-o, --port [port]', $('the port'))
    .option('-u, --target [target]', $('the target attribute\n' +
      '\nRecord type TXT'))
    .option('-x, --text [text]', $('the text attribute\n'))
    .option('-q, --quiet', $('quiet mode, do not ask before replacing existing CNAME record'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, dnsZoneName, recordSetName, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      dnsZoneName = cli.interaction.promptIfNotGiven($('DNS zone name: '), dnsZoneName, _);
      recordSetName = cli.interaction.promptIfNotGiven($('Record set name: '), recordSetName, _);
      options.type = cli.interaction.promptIfNotGiven($('Type: '), type, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.promptRecordParamsIfNotGiven(options, _);
      dnsZone.addRecord(resourceGroup, dnsZoneName, recordSetName, options, _);
    });

  dnsRecordSet.command('delete-record [resource-group] [dns-zone-name] [record-set-name] [type]')
    .description($('Delete a record from a record set under a DNS zone'))
    .usage('[options] <resource-group> <dns-zone> <record-set-name> <type>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-z, --dns-zone-name <dns-zone-name>', $('the name of the DNS zone'))
    .option('-n, --record-set-name <record-set-name>', $('the name of the record set'))
    .option('-y, --type <type>', util.format($('the type of the record set.' +
      '\n     Valid values are [%s]' +
      '\nThe record type A \n'), constants.dnsZone.setTypes))
    .option('-a  --ipv4-address [ipv4-address]', $('the IPv4 address attribute\n' +
      '\nRecord type AAAA'))
    .option('-b  --ipv6-address [ipv6-address]', $('the IPv6 address attribute\n' +
      '\nRecord type CNAME'))
    .option('-c  --cname [cname]', $('the canonical name (target)\n' +
      '\nRecord type MX'))
    .option('-f, --preference [preference]', $('preference attribute'))
    .option('-e, --exchange [exchange]', $('exchange attribute\n' +
      '\nRecord type PTR'))
    .option('-P, --ptrdname [ptrdname]', $('ptr domain name\n' +
      '\nRecord type NS'))
    .option('-d  --nsdname [nsdname]', $('the domain name attribute\n' +
      '\nRecord type SRV'))
    .option('-p, --priority [priority]', $('the priority attribute'))
    .option('-w, --weight [weight]', $('the weight attribute'))
    .option('-o, --port [port]', $('the port'))
    .option('-u, --target [target]', $('the target attribute\n' +
      '\nRecord type TXT'))
    .option('-x, --text [text]', $('the text attribute\n'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('--keep-empty-record-set', $('keep the empty record set when deleting the last record in the record set'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, dnsZoneName, recordSetName, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      dnsZoneName = cli.interaction.promptIfNotGiven($('DNS zone name: '), dnsZoneName, _);
      recordSetName = cli.interaction.promptIfNotGiven($('Record set name: '), recordSetName, _);
      options.type = cli.interaction.promptIfNotGiven($('Type: '), type, _);

      var dnsManagementClient = getDnsManagementClient(options);
      var dnsZone = new DnsZone(cli, dnsManagementClient);
      dnsZone.promptRecordParamsIfNotGiven(options, _);
      dnsZone.deleteRecord(resourceGroup, dnsZoneName, recordSetName, options, _);
    });

  var trafficManager = network.category('traffic-manager')
    .description($('Commands to manage Traffic Manager'));

  var trafficManagerProfile = trafficManager.category('profile')
    .description($('Commands to manage Traffic Manager profile'));

  trafficManagerProfile.command('create [resource-group] [name] [relative-dns-name]')
    .description($('Create a Traffic Manager profile'))
    .usage('[options] <resource-group> <name> <relative-dns-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the profile'))
    .option('-u, --profile-status <profile-status> ', util.format($('the profile status, valid values are' +
      '\n     [%s], default is %s'), constants.trafficManager.status, constants.trafficManager.status[0]))
    .option('-m, --traffic-routing-method <traffic-routing-method>', util.format($('the traffic routing method for the profile,' +
      '\n     valid values are [%s], default is %s'), constants.trafficManager.routingMethod, constants.trafficManager.routingMethod[0]))
    .option('-r, --relative-dns-name [relative-dns-name]', $('relative DNS name of the profile e.g. .trafficmanager.net'))
    .option('-l, --ttl [ttl]', $('time to live in specified in seconds'))
    .option('-p, --monitor-protocol [monitor-protocol]', util.format($('the monitor protocol, valid values are' +
      '\n     [%s], default is %s'), constants.trafficManager.protocols, constants.trafficManager.protocols[0]))
    .option('-o, --monitor-port [monitor-port]', $('the monitoring port'))
    .option('-a, --monitor-path [monitor-path]', $('the monitoring path'))
    .option('-t, --tags [tags]', $(constants.help.tags.create))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, relativeDnsName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Profile name: '), name, _);
      options.relativeDnsName = cli.interaction.promptIfNotGiven($('Relative DNS name of the profile, e.g. .trafficmanager.net: '), relativeDnsName || options.relativeDnsName, _);

      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.createProfile(resourceGroup, name, options, _);
    });

  trafficManagerProfile.command('set [resource-group] [name]')
    .description($('Set a Traffic Manager profile'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the profile'))
    .option('-u, --profile-status <profile-status> ', util.format($('the profile status, valid values are' +
      '\n     [%s], default is %s'), constants.trafficManager.status, constants.trafficManager.status[0]))
    .option('-m, --traffic-routing-method [traffic-routing-method]', util.format($('the traffic routing method for the profile,' +
      '\n     valid values are [%s], default is %s'), constants.trafficManager.routingMethod, constants.trafficManager.routingMethod[0]))
    .option('-l, --ttl [ttl]', $('time to live specified in seconds'))
    .option('-p, --monitor-protocol [monitor-protocol]', util.format($('the monitor protocol, valid values are' +
      '\n     [%s], default is %s'), constants.trafficManager.protocols, constants.trafficManager.protocols[0]))
    .option('-o, --monitor-port [monitor-port]', $('the monitoring port'))
    .option('-a, --monitor-path [monitor-path]', $('the monitoring path'))
    .option('-t, --tags [tags]', $(constants.help.tags.set))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Profile name: '), name, _);

      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.setProfile(resourceGroup, name, options, _);
    });

  trafficManagerProfile.command('list [resource-group]')
    .description($('Get all Traffic Manager profiles'))
    .usage('[options] [resource-group]')
    .option('-g, --resource-group [resource-group]', $('the name of the resource group'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, options, _) {
      options.resourceGroup = resourceGroup;
      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.listProfiles(options, _);
    });

  trafficManagerProfile.command('show [resource-group] [name]')
    .description($('Get a Traffic Manager profile'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the profile'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Profile name: '), name, _);

      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.showProfile(resourceGroup, name, options, _);
    });

  trafficManagerProfile.command('delete [resource-group] [name]')
    .description($('Delete a Traffic Manager profile'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the profile'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Profile name: '), name, _);

      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.deleteProfile(resourceGroup, name, options, _);
    });

  trafficManagerProfile.command('is-dns-available [relative-dns-name]')
    .description($('Checks whether the specified DNS prefix is available for creating a Traffic Manager profile'))
    .usage('[options] <relative-dns-name>')
    .option('-r, --relative-dns-name <relative-dns-name>', $('the relative DNS name to check for availability'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (relativeDnsName, options, _) {
      relativeDnsName = cli.interaction.promptIfNotGiven($('Relative DNS name: '), relativeDnsName, _);

      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.checkDnsAvailability(relativeDnsName, options, _);
    });

  var trafficManagerEndpoint = trafficManager.category('endpoint')
    .description($('Commands to manage Traffic Manager endpoints'));

  trafficManagerEndpoint.command('create [resource-group] [profile-name] [name] [type] [target]')
    .description($('Create an endpoint in Traffic Manager profile'))
    .usage('[options] <resource-group> <profile-name> <name> <type> <target>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-f, --profile-name <profile-name>', $('the profile name'))
    .option('-n, --name <name>', $('the name of the endpoint'))
    .option('-y, --type <type>', util.format($('the endpoint type, valid values are:' +
      '\n       [%s], where ExternalEndpoints represents endpoint' +
      '\n       for a service with FQDN external to Azure' +
      '\n       e.g. foobar.contoso.com'), constants.trafficManager.endpointType))
    .option('-l, --location [location]', $('the endpoint location. This is only used if the Traffic Manager profile is configured to use the "Performance" traffic-routing method.' +
      '\n       This should only be specified on endpoints of type "ExternalEndpoints" and "NestedEndpoints".' +
      '\n       It is not applicable for endpoints of type "AzureEndpoints", since the location is taken from the resource specified in "--target-resource-id".'))
    .option('-m, --geo-mapping [geo-mapping]', util.format($('the list of regions mapped to this endpoint when using the ‘Geographic’ traffic routing method.' +
      '\n       Please consult Traffic Manager documentation for a full list of accepted values')))
    .option('-u, --status [status]', util.format($('the endpoint status, valid values are:' +
      '\n       [%s] Default is %s'), constants.trafficManager.status, constants.trafficManager.status[0]))
    .option('-t, --target [target]', $('the domain name target of the endpoint,' +
      '\n       e.g. foobar.contoso.com. Only applicable to endpoints of type "ExternalEndpoints"'))
    .option('-i, --target-resource-id [target-resource-id]', $('the Azure Resource URI of the endpoint. Not applicable to endpoints of type "ExternalEndpoints"'))
    .option('-w, --weight [weight]', util.format($('the endpoint weight used in the traffic-routing method,' +
      '\n       valid range is [%s, %s] This is only used if the Traffic Manager profile is configured to use the "Weighted" traffic-routing method'), constants.trafficManager.weightMin, constants.trafficManager.weightMax))
    .option('-p, --priority [priority]', util.format($('the endpoint priority used in the traffic-routing method,' +
      '\n       valid range is [%s, %s] This is only used if the Traffic Manager profile is configured to use the "Priority" traffic-routing method.' +
      '\n       Lower values represent higher priority'), constants.trafficManager.priorityMin, constants.trafficManager.priorityMax))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, profileName, name, type, target, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      profileName = cli.interaction.promptIfNotGiven($('Profile name: '), profileName, _);
      name = cli.interaction.promptIfNotGiven($('Endpoint name: '), name, _);
      options.type = cli.interaction.promptIfNotGiven($('Endpoint type: '), type || options.type, _);
      options.target = cli.interaction.promptIfNotGiven($('Endpoint type: '), target || options.target, _);

      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.createEndpoint(resourceGroup, profileName, name, options, _);
    });

  trafficManagerEndpoint.command('set [resource-group] [profile-name] [name] [type]')
    .description($('Set an endpoint in a Traffic Manager profile'))
    .usage('[options] <resource-group> <profile-name> <name> <type>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-f, --profile-name <profile-name>', $('the profile name'))
    .option('-n, --name <name>', $('the name of the endpoint'))
    .option('-y, --type <type>', util.format($('the endpoint type, valid values are:' +
      '\n       [%s], where ExternalEndpoints represents endpoint' +
      '\n       for a service with FQDN external to Azure' +
      '\n       e.g. foobar.contoso.com'), constants.trafficManager.endpointType))
    .option('-l, --location [location]', $('the endpoint location. This is only used if the Traffic Manager profile is configured to use the "Performance" traffic-routing method.' +
      '\n       This should only be specified on endpoints of type "ExternalEndpoints" and "NestedEndpoints".' +
      '\n       It is not applicable for endpoints of type "AzureEndpoints", since the location is taken from the resource specified in "--target-resource-id".'))
    .option('-u, --status [status]', util.format($('the endpoint status, valid values are:' +
      '\n       [%s] Default is %s'), constants.trafficManager.status, constants.trafficManager.status[0]))
    .option('-t, --target [target]', $('the domain name target of the endpoint,' +
      '\n       e.g. foobar.contoso.com. Only applicable to endpoints of type "ExternalEndpoints"'))
    .option('-i, --target-resource-id [target-resource-id]', $('the Azure Resource URI of the endpoint. Not applicable to endpoints of type "ExternalEndpoints"'))
    .option('-w, --weight [weight]', util.format($('the endpoint weight used in the traffic-routing method,' +
      '\n       valid range is [%s, %s] This is only used if the Traffic Manager profile is configured to use the "Weighted" traffic-routing method'), constants.trafficManager.weightMin, constants.trafficManager.weightMax))
    .option('-p, --priority [priority]', util.format($('the endpoint priority used in the traffic-routing method,' +
      '\n       valid range is [%s, %s] This is only used if the Traffic Manager profile is configured to use the "Priority" traffic-routing method.' +
      '\n       Lower values represent higher priority'), constants.trafficManager.priorityMin, constants.trafficManager.priorityMax))
    .option('-m, --geo-mapping [geo-mapping]', util.format($('the list of regions mapped to this endpoint when using the "%s" traffic routing method'), constants.trafficManager.Geographic))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, profileName, name, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      profileName = cli.interaction.promptIfNotGiven($('Profile name: '), profileName, _);
      name = cli.interaction.promptIfNotGiven($('Endpoint name: '), name, _);
      options.type = cli.interaction.promptIfNotGiven($('Endpoint type: '), type, _);

      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.setEndpoint(resourceGroup, profileName, name, options, _);
    });

  trafficManagerEndpoint.command('show [resource-group] [profile-name] [name] [type]')
    .description($('Get an endpoint in Traffic Manager profile'))
    .usage('[options] <resource-group> <profile-name> <name> <type>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-f, --profile-name <profile-name>', $('the profile name'))
    .option('-n, --name <name>', $('the name of the endpoint'))
    .option('-y, --type <type>', util.format($('the endpoint type, valid values are:' +
      '\n       [%s], where ExternalEndpoints represents endpoint' +
      '\n       for a service with FQDN external to Azure' +
      '\n       e.g. foobar.contoso.com'), constants.trafficManager.endpointType))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, profileName, name, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      profileName = cli.interaction.promptIfNotGiven($('Profile name: '), profileName, _);
      name = cli.interaction.promptIfNotGiven($('Endpoint name: '), name, _);
      options.type = cli.interaction.promptIfNotGiven($('Endpoint type: '), type, _);

      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.showEndpoint(resourceGroup, profileName, name, options, _);
    });

  trafficManagerEndpoint.command('delete [resource-group] [profile-name] [name] [type]')
    .description($('Delete an endpoint from a Traffic Manager profile'))
    .usage('[options] <resource-group> <profile-name> <name> <type>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-f, --profile-name <profile-name>', $('the profile name'))
    .option('-n, --name <name>', $('the name of the endpoint'))
    .option('-y, --type <type>', util.format($('the endpoint type, valid values are:' +
      '\n       [%s], where ExternalEndpoints represents endpoint' +
      '\n       for a service with FQDN external to Azure' +
      '\n       e.g. foobar.contoso.com'), constants.trafficManager.endpointType))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, profileName, name, type, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      profileName = cli.interaction.promptIfNotGiven($('Profile name: '), profileName, _);
      name = cli.interaction.promptIfNotGiven($('Endpoint name: '), name, _);
      options.type = cli.interaction.promptIfNotGiven($('Endpoint type: '), type, _);

      var trafficManagerProviderClient = getTrafficManagementClient(options);
      var trafficManager = new TrafficManager(cli, trafficManagerProviderClient);
      trafficManager.deleteEndpoint(resourceGroup, profileName, name, options, _);
    });

  var vpnGateway = network.category('vpn-gateway')
    .description($('Commands to manage Virtual Network Gateways'));
  var vpnGatewayRootCert = vpnGateway.category('root-cert')
    .description($('Commands to manage Virtual Network Gateways Root Certificates'));

  vpnGatewayRootCert.command('create [resource-group] [name] [cert-name] [cert-file]')
    .description($('Add a root certificate to a virtual network gateway'))
    .usage('[options] <resource-group> <name> <cert-name> <cert-file>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the virtual network gateway'))
    .option('-c, --cert-name <cert-name>', $('the name of the root certificate'))
    .option('-f, --cert-file <cert-file>', $('the path to the root certificate'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, certName, certFile, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual network gateway name: '), name, _);
      certName = cli.interaction.promptIfNotGiven($('Root certificate name: '), certName, _);
      options.certFile = cli.interaction.promptIfNotGiven($('Path to root certificate: '), certFile || options.certFile, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vnetGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vnetGateway.createRootCert(resourceGroup, name, certName, options, _);
    });

  vpnGatewayRootCert.command('delete [resource-group] [name] [cert-name]')
    .description($('Delete a root certificate from a virtual network gateway'))
    .usage('[options] <resource-group> <name> <cert-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the virtual network gateway'))
    .option('-c, --cert-name <cert-name>', $('the name of the root certificate'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, certName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual network gateway name: '), name, _);
      certName = cli.interaction.promptIfNotGiven($('Root certificate name: '), certName, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vnetGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vnetGateway.deleteRootCert(resourceGroup, name, certName, options, _);
    });

  var vpnGatewayRevokedCert = vpnGateway.category('revoked-cert')
    .description($('Commands to manage Virtual Network Gateways Revoked Certificates'));

  vpnGatewayRevokedCert.command('create [resource-group] [name] [cert-name] [thumbprint]')
    .description($('Add a revoked certificate to a virtual network gateway'))
    .usage('[options] <resource-group> <name> <cert-name> <thumbprint>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the virtual network gateway'))
    .option('-c, --cert-name <cert-name>', $('the name of the revoked certificate'))
    .option('-f, --thumbprint <thumbprint>', $('the certificate thumbprint'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, certName, thumbprint, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual network gateway name: '), name, _);
      certName = cli.interaction.promptIfNotGiven($('Revoked certificate name: '), certName, _);
      options.thumbprint = cli.interaction.promptIfNotGiven($('Thumbprint: '), thumbprint || options.thumbprint, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vnetGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vnetGateway.createRevokedCert(resourceGroup, name, certName, options, _);
    });

  vpnGatewayRevokedCert.command('delete [resource-group] [name] [cert-name]')
    .description($('Delete a revoked certificate from a virtual network gateway'))
    .usage('[options] <resource-group> <name> <cert-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the virtual network gateway'))
    .option('-c, --cert-name <cert-name>', $('the name of the revoked certificate'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, certName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Virtual network gateway name: '), name, _);
      certName = cli.interaction.promptIfNotGiven($('Revoked certificate name: '), certName, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vnetGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vnetGateway.deleteRevokedCert(resourceGroup, name, certName, options, _);
    });

  var gatewayConnection = network.category('vpn-connection')
    .description($('Commands to manage gateway connections'));

  gatewayConnection.command('create [resource-group] [name] [location] [vnet-gateway1]')
    .description($('Create a gateway connection'))
    .usage('[options] <resource-group> <name> <location> <vnet-gateway1>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the gateway connection'))
    .option('-l, --location <location>', $('the location'))
    .option('-i, --vnet-gateway1 <vnet-gateway1>', $('the name of the virtual network gateway'))
    .option('-r, --vnet-gateway1-group [vnet-gateway1-group]', $('the resource group name of the virtual network gateway'))
    .option('-e, --vnet-gateway2 [vnet-gateway2]', $('the name of the connected virtual network gateway'))
    .option('-m, --vnet-gateway2-group [vnet-gateway2-group]', $('the resource group name of the connected virtual network gateway'))
    .option('-d, --lnet-gateway2 [lnet-gateway2]', $('the name of the connected local network gateway'))
    .option('-z, --lnet-gateway2-group [lnet-gateway2-group]', $('the resource group name of the connected local network gateway'))
    .option('-p, --peer-name [peer-name]', $('the name of the connected express route circuit'))
    .option('-x, --peer-group [peer-group]', $('the resource group of the connected express route circuit'))
    .option('-b, --enable-bgp [enable-bgp]', $('whether BGP is enabled for this virtual network gateway or not'))
    .option('-y, --type [type]', util.format($('the connection type' +
      '\n     Valid values are [%s]'), constants.vpnGateway.connectionType))
    .option('-w, --routing-weight [routing-weight]', $('the routing weight'))
    .option('-k, --shared-key [shared-key]', $('the IPsec shared key'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .option('-t, --tags [tags]', $(constants.help.tags.create))
    .execute(function (resourceGroup, name, location, vnetGateway1, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Connection name: '), name, _);
      options.location = cli.interaction.promptIfNotGiven($('Location: '), location, _);
      options.vnetGateway1 = cli.interaction.promptIfNotGiven($('Virtual network gateway: '), vnetGateway1 || options.vnetGateway1, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vpnGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vpnGateway.createConnection(resourceGroup, name, options, _);
    });

  gatewayConnection.command('set [resource-group] [name]')
    .description($('Set a gateway connection'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the gateway connection'))
    .option('-w, --routing-weight [routing-weight]', $('the routing weight'))
    .option('-b, --enable-bgp [enable-bgp]', $('whether BGP is enabled for this virtual network gateway or not'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .option('-t, --tags [tags]', $(constants.help.tags.set))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Connection name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vpnGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vpnGateway.setConnection(resourceGroup, name, options, _);
    });

  gatewayConnection.command('list [resource-group]')
    .description($('Get all gateway connections'))
    .usage('[options] <resource-group>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vpnGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vpnGateway.listConnections(resourceGroup, options, _);
    });

  gatewayConnection.command('show [resource-group] [name]')
    .description($('Get details about gateway connection'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the gateway connection'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Connection name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vpnGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vpnGateway.showConnection(resourceGroup, name, options, _);
    });

  gatewayConnection.command('delete [resource-group] [name]')
    .usage('[options] <resource-group> <name>')
    .description($('Delete a gateway connection'))
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the gateway connection'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Connection name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vpnGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vpnGateway.deleteConnection(resourceGroup, name, options, _);
    });

  var connectionSharedKey = gatewayConnection.category('shared-key')
    .description($('Commands to manage gateway connection shared key'));

  connectionSharedKey.command('set [resource-group] [name] [value]')
    .description($('Set gateway connection shared key'))
    .usage('[options] <resource-group> <name> <value>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the gateway connection'))
    .option('-k, --value <value>', $('the shared key value'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, value, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Connection name: '), name, _);
      options.value = cli.interaction.promptIfNotGiven($('Shared key value: '), value, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vpnGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vpnGateway.setConnectionSharedKey(resourceGroup, name, options, _);
    });

  connectionSharedKey.command('reset [resource-group] [name] [key-length]')
    .description($('Reset gateway connection shared key'))
    .usage('[options] <resource-group> <name> <key-length>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the gateway connection'))
    .option('-l, --key-length <key-length>', $('the shared key length'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, keyLength, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Connection name: '), name, _);
      options.keyLength = cli.interaction.promptIfNotGiven($('Shared key length: '), keyLength, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vpnGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vpnGateway.resetConnectionSharedKey(resourceGroup, name, options, _);
    });

  connectionSharedKey.command('show [resource-group] [name]')
    .description($('Get details about gateway connection shared key'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the gateway connection'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Connection name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var vpnGateway = new VirtualNetworkGateway(cli, networkManagementClient);
      vpnGateway.showConnectionSharedKey(resourceGroup, name, options, _);
    });

  var appGateway = network.category('application-gateway')
    .description($('Commands to manage application gateways'));

  appGateway.command('create [resource-group] [name] [location] [servers]')
    .description($('Create an application gateway'))
    .usage('[options] <resource-group> <name> <location> <servers>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the application gateway'))
    .option('-l, --location <location>', $('the location'))
    .option('-e, --vnet-name [vnet-name]', $('the name of the virtual network application gateway should be deployed in'))
    .option('-m, --subnet-name [subnet-name]', $('the name of subnet in the virtual network identified by --vnet-name'))
    .option('-d, --subnet-id [subnet-id]', util.format($('the subnet identifier.' +
      '\n     e.g. %s'), constants.help.id.subnet))
    .option('-y, --cert-file [cert-file]', $('the path to the certificate'))
    .option('-x, --cert-password [cert-password]', $('the certificate password'))
    .option('-A, --address-pool-name [address-pool-name]', util.format($('the address pool name. ' +
      '\n     Default value is "%s"'), constants.appGateway.pool.name))
    .option('-r, --servers <servers>', $('comma separated list of IP addresses or DNS names corresponding to backend servers'))
    .option('-O, --http-settings-name [http-settings-name]', util.format($('the HTTP settings name. ' +
      '\n     Default value is "%s"'), constants.appGateway.settings.name))
    .option('-i, --http-settings-protocol [http-settings-protocol]',
      util.format($('the HTTP settings protocol, valid values are \[%s\]'), constants.appGateway.settings.protocol))
    .option('-o, --http-settings-port [http-settings-port]', util.format($('the HTTP settings port, valid range is'),
      utils.toRange(constants.appGateway.settings.port)))
    .option('-f, --http-settings-cookie-based-affinity [http-settings-cookie-based-affinity]',
      util.format($('Enable or disable HTTP settings cookie based affinity, valid values are' +
          '\n     [%s],' +
          '\n     default value is "%s"'),
        constants.appGateway.settings.affinity, constants.appGateway.settings.affinity[0]))
    .option('-J, --frontend-port-name [frontend-port-name]', util.format($('the frontend port name.' +
      '\n     Default value is "%s"'), constants.appGateway.frontendPort.name))
    .option('-j, --frontend-port [frontend-port]', util.format($('the frontend port value, valid range is'),
      utils.toRange(constants.appGateway.settings.port)))
    .option('-F, --frontend-ip-name [frontend-ip-name]', util.format($('the frontend ip name. ' +
      '\n     Default value is "%s"'), constants.appGateway.frontendIp.name))
    .option('-k, --public-ip-name [public-ip-name]', $('the name of the public ip'))
    .option('-p, --public-ip-id [public-ip-id]', util.format($('the public ip identifier.' +
      '\n     e.g. %s'), constants.help.id.publicIp))
    .option('-G, --gateway-ip-name [gateway-ip-name]', util.format($('the gateway ip name.' +
      '\n     Default value is "%s"'), constants.appGateway.gatewayIp.name))
    .option('-L, --http-listener-name [http-listener-name]', util.format($('the HTTP listener name.' +
      '\n     Default value is "%s"'), constants.appGateway.httpListener.name))
    .option('-b, --http-listener-protocol [http-listener-protocol]',
      util.format($('the HTTP listener protocol, valid values are \[%s\]'), constants.appGateway.httpListener.protocol))
    .option('-R, --routing-rule-name [routing-rule-name]', util.format($('the routing rule name.' +
      '\n     Default name is "%s"'), constants.appGateway.routingRule.name))
    .option('-w, --routing-rule-type [routing-rule-type]',
      util.format($('the request routing rule type, default is "%s"'), constants.appGateway.routingRule.type[0]))
    .option('-a, --sku-name [sku-name]',
      util.format($('the name of the sku, valid values are \[%s\]. Default values is "%s"'),
        constants.appGateway.sku.name, constants.appGateway.sku.name[0]))
    .option('-u, --sku-tier [sku-tier]', util.format($('the sku tier, valid values are \[%s\]. Default values is "%s"'),
      constants.appGateway.sku.name.tier, constants.appGateway.sku.tier[0]))
    .option('-z, --capacity [capacity]',
      util.format($('application gateway instance count in range \[%s\]. Default value is %s.'),
        constants.appGateway.sku.capacity, constants.appGateway.sku.capacity[0]))
    .option('-t, --tags [tags]', $(constants.help.tags.create))
    .option('--nowait', $('does not wait for the operation to complete. Returns as soon as the intial request is received by the server.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, location, servers, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Application gateway name: '), name, _);
      location = cli.interaction.promptIfNotGiven($('Location: '), location, _);
      if ((options.httpListenerProtocol &&
        options.httpListenerProtocol.toLowerCase() === constants.appGateway.httpListener.protocol[1].toLowerCase()) || options.certFile) {
        options.certFile = cli.interaction.promptIfNotGiven($('SSL certificate full path: '), options.certFile, _);
        options.certPassword = cli.interaction.promptIfNotGiven($('SSL certificate password: '), options.certPassword, _);
      }
      if (!options.subnetId) {
        options.vnetName = cli.interaction.promptIfNotGiven($('Virtual network name: '), options.vnetName, _);
        options.subnetName = cli.interaction.promptIfNotGiven($('Subnet name: '), options.subnetName, _);
      }
      options.servers = cli.interaction.promptIfNotGiven($('Comma separated backend server IPs: '), servers || options.servers, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var appGateway = new AppGateway(cli, networkManagementClient);
      appGateway.createAppGateway(resourceGroup, name, location, options, _);
    });

  appGateway.command('set [resource-group] [name]')
    .description($('Set an application gateway'))
    .usage('[options] <resource-group> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-n, --name <name>', $('the name of the application gateway'))
    .option('-a, --sku-name [sku-name]', util.format($('the name of the sku, valid values are \[%s\]'),
      constants.appGateway.sku.name))
    .option('-u, --sku-tier [sku-tier]', util.format($('the sku tier, valid values are \[%s\]'),
      constants.appGateway.sku.tier))
    .option('-z, --capacity [capacity]', util.format($('application gateway instance count in range \[%s\]'),
      constants.appGateway.sku.capacity))
    .option('-t, --tags [tags]', $(constants.help.tags.set))
    .option('--nowait', $('does not wait for the operation to complete. Returns as soon as the intial request is received by the server.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      name = cli.interaction.promptIfNotGiven($('Application gateway name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var appGateway = new AppGateway(cli, networkManagementClient);
      appGateway.setAppGateway(resourceGroup, name, options, _);
    });

  var appGatewayUrlPathMap = appGateway.category('url-path-map')
    .description('Commands to manage application gateway url path maps');

  appGatewayUrlPathMap.command('set [resource-group] [gateway-name] [name]')
    .description($('Set url path map in application gateway'))
    .usage('[options] <resource-group> <gateway-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the name of the application gateway'))
    .option('-n, --name <name>', $('the name of the url path map'))
    .option('-i, --http-settings-name [http-settings-name]', $('the name of an existing backend HTTP settings'))
    .option('-a, --address-pool-name [address-pool-name]', $('the name of an existing backend address pool'))
    .option('--nowait', $('does not wait for the operation to complete. Returns as soon as the intial request is received by the server.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, gatewayName, name, ruleName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('Application gateway name: '), gatewayName, _);
      name = cli.interaction.promptIfNotGiven($('Url path map name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var appGateway = new AppGateway(cli, networkManagementClient);
      appGateway.setUrlPathMap(resourceGroup, gatewayName, name, options, _);
    });

  var appGatewayUrlPathMapRule = appGatewayUrlPathMap.category('rule')
    .description('Commands to manage application gateway url path map rules');

  appGatewayUrlPathMapRule.command('create [resource-group] [gateway-name] [url-path-map-name] [name]')
    .description($('Add url path map rule to application gateway'))
    .usage('[options] <resource-group> <gateway-name> <url-path-map-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the name of the application gateway'))
    .option('-u, --url-path-map-name <url-path-map-name>', $('the name of the url path map'))
    .option('-n, --name <name>', $('the name of the url path map rule'))
    .option('-p, --path <path>', $('path, which specifies application gateway path rule'))
    .option('-i, --http-settings-name <http-settings-name>', $('the name of an existing backend HTTP settings'))
    .option('-a, --address-pool-name <address-pool-name>', $('the name of an existing backend address pool'))
    .option('--nowait', $('does not wait for the operation to complete. Returns as soon as the intial request is received by the server.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, gatewayName, urlPathMapName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('Application gateway name: '), gatewayName, _);
      options.urlPathMapName = cli.interaction.promptIfNotGiven($('Url path map name: '), urlPathMapName || options.urlPathMapName, _);
      name = cli.interaction.promptIfNotGiven($('Rule name: '), name, _);
      options.path = cli.interaction.promptIfNotGiven($('Path: '), options.path, _);
      options.httpSettingsName = cli.interaction.promptIfNotGiven($('HTTP settings name: '), options.httpSettingsName, _);
      options.addressPoolName = cli.interaction.promptIfNotGiven($('The address pool name: '), options.addressPoolName, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var appGateway = new AppGateway(cli, networkManagementClient);
      appGateway.addMapRule(resourceGroup, gatewayName, name, options, _);
    });

  appGatewayUrlPathMapRule.command('set [resource-group] [gateway-name] [url-path-map-name] [name]')
    .description($('Set url path map rule in application gateway'))
    .usage('[options] <resource-group> <gateway-name> <url-path-map-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the name of the application gateway'))
    .option('-u, --url-path-map-name <url-path-map-name>', $('the name of the url path map'))
    .option('-n, --name <name>', $('the name of the url path map rule'))
    .option('-p, --path [path]', $('path, which specifies application gateway path rule'))
    .option('-i, --http-settings-name [http-settings-name]', $('the name of an existing backend HTTP settings'))
    .option('-a, --address-pool-name [address-pool-name]', $('the name of an existing backend address pool'))
    .option('--nowait', $('does not wait for the operation to complete. Returns as soon as the intial request is received by the server.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, gatewayName, urlPathMapName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('Application gateway name: '), gatewayName, _);
      options.urlPathMapName = cli.interaction.promptIfNotGiven($('Url path map name: '), urlPathMapName || options.urlPathMapName, _);
      name = cli.interaction.promptIfNotGiven($('Rule name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var appGateway = new AppGateway(cli, networkManagementClient);
      appGateway.setMapRule(resourceGroup, gatewayName, name, options, _);
    });

  appGatewayUrlPathMapRule.command('show [resource-group] [gateway-name] [url-path-map-name] [name]')
    .description($('Show url path map rule from application gateway'))
    .usage('[options] <resource-group> <gateway-name> <url-path-map-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the name of the application gateway'))
    .option('-u, --url-path-map-name <url-path-map-name>', $('the name of the url path map'))
    .option('-n, --name <name>', $('the name of the url path map rule'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, gatewayName, urlPathMapName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('Application gateway name: '), gatewayName, _);
      urlPathMapName = cli.interaction.promptIfNotGiven($('URL path map name: '), urlPathMapName, _);
      name = cli.interaction.promptIfNotGiven($('Url path map name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var appGateway = new AppGateway(cli, networkManagementClient);
      appGateway.showUrlPathMapRule(resourceGroup, gatewayName, urlPathMapName, name, options, _);
    });

  appGatewayUrlPathMapRule.command('list [resource-group] [gateway-name] [url-path-map-name]')
    .description($('List url path map rule from application gateway'))
    .usage('[options] <resource-group> <gateway-name> <url-path-map-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the name of the application gateway'))
    .option('-u, --url-path-map-name <url-path-map-name>', $('the name of the url path map'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, gatewayName, urlPathMapName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('Application gateway name: '), gatewayName, _);
      urlPathMapName = cli.interaction.promptIfNotGiven($('URL path map name: '), urlPathMapName, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var appGateway = new AppGateway(cli, networkManagementClient);
      appGateway.listUrlPathMapRules(resourceGroup, gatewayName, urlPathMapName, options, _);
    });

  appGatewayUrlPathMapRule.command('delete [resource-group] [gateway-name] [url-path-map-name] [name]')
    .description($('Delete an url path map rule from an application gateway'))
    .usage('[options] <resource-group> <gateway-name> <url-path-map-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the name of the application gateway'))
    .option('-u, --url-path-map-name <url-path-map-name>', $('the name of the url path map'))
    .option('-n, --name <name>', $('the name of the map rule'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('--nowait', $('does not wait for the operation to complete. Returns as soon as the intial request is received by the server.'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, gatewayName, urlPathMapName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('Application gateway name: '), gatewayName, _);
      options.urlPathMapName = cli.interaction.promptIfNotGiven($('Url path map rule name: '), urlPathMapName || options.urlPathMapName, _);
      name = cli.interaction.promptIfNotGiven($('Url path map rule name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var appGateway = new AppGateway(cli, networkManagementClient);
      appGateway.removeMapRule(resourceGroup, gatewayName, name, options, _);
    });

  var expressRoute = network.category('express-route')
    .description($('Commands to manage express routes'));

  var expressRoutePeering = expressRoute.category('peering')
    .description($('Commands to manage express route peerings'));

  expressRoutePeering.command('create [resource-group] [circuit-name] [name] [primary-address-prefix] [secondary-address-prefix]')
    .description($('Create express route peering'))
    .usage('[options] <resource-group> <circuit-name> <name> <primary-address-prefix> <secondary-address-prefix>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-c, --circuit-name <circuit-name>', $('the name of the express route circuit'))
    .option('-n, --name <name>', $('the name of the express route circuit peering'))
    .option('-y, --type [type]', util.format($('the express route circuit peering type,' +
      '\n     supported types [%s}'), constants.expressRoute.peering.type))
    .option('-a, --azure-asn [azure-asn]', $('the express route circuit peering azure ASN'))
    .option('-p, --peer-asn [peer-asn]', $('the express route circuit peering peer ASN'))
    .option('-r, --primary-address-prefix <primary-address-prefix>', $('the primary address prefix,' +
      '\n     must be valid CIDR format'))
    .option('-o, --secondary-address-prefix <secondary-address-prefix>', $('the secondary address prefix, must be valid CIDR format'))
    .option('-d, --primary-azure-port [primary-azure-port]', $('the primary azure port'))
    .option('-b, --secondary-azure-port [secondary-azure-port]', $('the secondary azure port'))
    .option('-k, --shared-key [shared-key]', $('the shared key'))
    .option('-i, --vlan-id [vlan-id]', $('the identifier that is used to identify the customer'))
    .option('-f, --ms-advertised-public-prefixes [ms-advertised-public-prefixes]', $('comma separated list of prefixes that will be advertised through the BGP peering'))
    .option('-m, --ms-advertised-public-prefix-state [ms-advertised-public-prefix-state]', util.format($('specifies the configuration state of the BGP session,' +
      '\n      one of [%s]'), constants.expressRoute.peering.publicPrefixState))
    .option('-l, --ms-customer-asn [ms-customer-asn]', $('ASN of the customer'))
    .option('-u, --ms-routing-registry-name [ms-routing-registry-name]', util.format($('Internet Routing Registry / Regional Internet Registry,' +
      '\n     supported values are [%s]'), constants.expressRoute.peering.registryName))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, circuitName, name, primaryAddressPrefix, secondaryAddressPrefix, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      circuitName = cli.interaction.promptIfNotGiven($('Express route circuit name: '), circuitName, _);
      name = cli.interaction.promptIfNotGiven($('Express route peering name: '), name, _);
      options.primaryAddressPrefix = cli.interaction.promptIfNotGiven($('Primary address prefix: '), primaryAddressPrefix || options.primaryAddressPrefix, _);
      options.secondaryAddressPrefix = cli.interaction.promptIfNotGiven($('Secondary address prefix: '), secondaryAddressPrefix || options.secondaryAddressPrefix, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var expressRoute = new ExpressRoute(cli, networkManagementClient);
      expressRoute.createPeering(resourceGroup, circuitName, name, options, _);
    });

  expressRoutePeering.command('set [resource-group] [circuit-name] [name]')
    .description($('Set express route peering'))
    .usage('[options] <resource-group> <circuit-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-c, --circuit-name <circuit-name>', $('the name of the express route circuit'))
    .option('-n, --name <name>', $('the name of the express route circuit peering'))
    .option('-a, --azure-asn [azure-asn]', $('the express route circuit peering azure ASN'))
    .option('-p, --peer-asn [peer-asn]', $('the express route circuit peering peer ASN'))
    .option('-r, --primary-address-prefix [primary-address-prefix]', $('the primary address prefix,' +
      '\n     must be valid CIDR format'))
    .option('-o, --secondary-address-prefix [secondary-address-prefix]', $('the secondary address prefix, must be valid CIDR format'))
    .option('-d, --primary-azure-port [primary-azure-port]', $('the primary azure port'))
    .option('-b, --secondary-azure-port [secondary-azure-port]', $('the secondary azure port'))
    .option('-k, --shared-key [shared-key]', $('the shared key'))
    .option('-i, --vlan-id [vlan-id]', $('the identifier that is used to identify the customer'))
    .option('-f, --ms-advertised-public-prefixes [ms-advertised-public-prefixes]', $('comma separated list of prefixes that will be advertised through the BGP peering'))
    .option('-m, --ms-advertised-public-prefix-state [ms-advertised-public-prefix-state]', util.format($('specifies the configuration state of the BGP session,' +
      '\n      one of [%s]'), constants.expressRoute.peering.publicPrefixState))
    .option('-l, --ms-customer-asn [ms-customer-asn]', $('ASN of the customer'))
    .option('-u, --ms-routing-registry-name [ms-routing-registry-name]', util.format($('Internet Routing Registry / Regional Internet Registry,' +
      '\n     supported values are [%s]'), constants.expressRoute.peering.registryName))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, circuitName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      circuitName = cli.interaction.promptIfNotGiven($('Express route circuit name: '), circuitName, _);
      name = cli.interaction.promptIfNotGiven($('Express route peering name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var expressRoute = new ExpressRoute(cli, networkManagementClient);
      expressRoute.setPeering(resourceGroup, circuitName, name, options, _);
    });

  expressRoutePeering.command('show [resource-group] [circuit-name] [name]')
    .description($('Get peering details'))
    .usage('[options] <resource-group> <circuit-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-c, --circuit-name <circuit-name>', $('the name of the express route circuit'))
    .option('-n, --name <name>', $('the name of the express route circuit express route peering'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, circuitName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      circuitName = cli.interaction.promptIfNotGiven($('Express route circuit name: '), circuitName, _);
      name = cli.interaction.promptIfNotGiven($('Express route peering name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var expressRoute = new ExpressRoute(cli, networkManagementClient);
      expressRoute.showPeering(resourceGroup, circuitName, name, options, _);
    });

  expressRoutePeering.command('list [resource-group] [circuit-name]')
    .description($('List Peerings of Express Circuit'))
    .usage('[options] <resource-group> <circuit-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-c, --circuit-name <circuit-name>', $('the name of the express route circuit'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, circuitName, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      circuitName = cli.interaction.promptIfNotGiven($('Express route circuit name: '), circuitName, _);

      var networkResourceProviderClient = getNetworkManagementClient(options);
      var expressRoute = new ExpressRoute(cli, networkResourceProviderClient);
      expressRoute.listPeering(resourceGroup, circuitName, options, _);
    });

  expressRoutePeering.command('delete [resource-group] [circuit-name] [name]')
    .description($('Delete express route peering'))
    .usage('[options] <resource-group> <circuit-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-c, --circuit-name <circuit-name>', $('the name of the express route circuit'))
    .option('-n, --name <name>', $('the name of the express route circuit express route peering'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, circuitName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('Resource group name: '), resourceGroup, _);
      circuitName = cli.interaction.promptIfNotGiven($('Express route circuit name: '), circuitName, _);
      name = cli.interaction.promptIfNotGiven($('Express route peering name: '), name, _);

      var networkManagementClient = getNetworkManagementClient(options);
      var expressRoute = new ExpressRoute(cli, networkManagementClient);
      expressRoute.deletePeering(resourceGroup, circuitName, name, options, _);
    });

  function getNetworkManagementClient(options) {
    var subscription = profile.current.getSubscription(options.subscription);
    return utils.createNetworkManagementClient(subscription);
  }

  function getTrafficManagementClient(options) {
    var subscription = profile.current.getSubscription(options.subscription);
    return utils.createTrafficManagerResourceProviderClient(subscription);
  }

  function getDnsManagementClient(options) {
    var subscription = profile.current.getSubscription(options.subscription);
    return utils.createDnsResourceProviderClient(subscription);
  }
};
