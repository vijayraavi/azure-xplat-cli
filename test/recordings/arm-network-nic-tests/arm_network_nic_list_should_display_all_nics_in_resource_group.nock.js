// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '2c224e7e-3ef5-431d-a57b-e71f4662e3a6',
    name: 'Node CLI Test',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    state: 'Enabled',
    registeredProviders: ['mobileservice'],
    _eventsCount: '1',
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_VM_TEST_LOCATION'] = 'eastus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/networkInterfaces?api-version=2016-09-01')
  .reply(200, "{\r\n  \"value\": [\r\n    {\r\n      \"name\": \"test-nic\",\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/networkInterfaces/test-nic\",\r\n      \"etag\": \"W/\\\"82807fb4-0dd0-4b14-9318-7501c78d0536\\\"\",\r\n      \"location\": \"westeurope\",\r\n      \"tags\": {\r\n        \"tag1\": \"aaa\",\r\n        \"tag2\": \"bbb\",\r\n        \"tag3\": \"ccc\"\r\n      },\r\n      \"properties\": {\r\n        \"provisioningState\": \"Succeeded\",\r\n        \"resourceGuid\": \"65d40fe8-f6cc-4163-bd4f-21d266749c64\",\r\n        \"ipConfigurations\": [\r\n          {\r\n            \"name\": \"default-ip-config\",\r\n            \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/networkInterfaces/test-nic/ipConfigurations/default-ip-config\",\r\n            \"etag\": \"W/\\\"82807fb4-0dd0-4b14-9318-7501c78d0536\\\"\",\r\n            \"properties\": {\r\n              \"provisioningState\": \"Succeeded\",\r\n              \"privateIPAddress\": \"10.0.0.22\",\r\n              \"privateIPAllocationMethod\": \"Static\",\r\n              \"publicIPAddress\": {\r\n                \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/publicIPAddresses/test-ip\"\r\n              },\r\n              \"subnet\": {\r\n                \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/test-subnet\"\r\n              },\r\n              \"primary\": true,\r\n              \"privateIPAddressVersion\": \"IPv4\"\r\n            }\r\n          }\r\n        ],\r\n        \"dnsSettings\": {\r\n          \"dnsServers\": [],\r\n          \"appliedDnsServers\": [],\r\n          \"internalDnsNameLabel\": \"internal-dns-bar\"\r\n        },\r\n        \"macAddress\": \"00-0D-3A-29-A8-E4\",\r\n        \"enableAcceleratedNetworking\": false,\r\n        \"enableIPForwarding\": true\r\n      },\r\n      \"type\": \"Microsoft.Network/networkInterfaces\"\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1976',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'a342d44b-9eca-42f5-af50-6030b8003335',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14986',
  'x-ms-correlation-request-id': 'bd253c59-4be3-4142-b1f2-35b71b5a7636',
  'x-ms-routing-request-id': 'WESTEUROPE:20170418T132516Z:bd253c59-4be3-4142-b1f2-35b71b5a7636',
  date: 'Tue, 18 Apr 2017 13:25:16 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/networkInterfaces?api-version=2016-09-01')
  .reply(200, "{\r\n  \"value\": [\r\n    {\r\n      \"name\": \"test-nic\",\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/networkInterfaces/test-nic\",\r\n      \"etag\": \"W/\\\"82807fb4-0dd0-4b14-9318-7501c78d0536\\\"\",\r\n      \"location\": \"westeurope\",\r\n      \"tags\": {\r\n        \"tag1\": \"aaa\",\r\n        \"tag2\": \"bbb\",\r\n        \"tag3\": \"ccc\"\r\n      },\r\n      \"properties\": {\r\n        \"provisioningState\": \"Succeeded\",\r\n        \"resourceGuid\": \"65d40fe8-f6cc-4163-bd4f-21d266749c64\",\r\n        \"ipConfigurations\": [\r\n          {\r\n            \"name\": \"default-ip-config\",\r\n            \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/networkInterfaces/test-nic/ipConfigurations/default-ip-config\",\r\n            \"etag\": \"W/\\\"82807fb4-0dd0-4b14-9318-7501c78d0536\\\"\",\r\n            \"properties\": {\r\n              \"provisioningState\": \"Succeeded\",\r\n              \"privateIPAddress\": \"10.0.0.22\",\r\n              \"privateIPAllocationMethod\": \"Static\",\r\n              \"publicIPAddress\": {\r\n                \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/publicIPAddresses/test-ip\"\r\n              },\r\n              \"subnet\": {\r\n                \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-nic/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/test-subnet\"\r\n              },\r\n              \"primary\": true,\r\n              \"privateIPAddressVersion\": \"IPv4\"\r\n            }\r\n          }\r\n        ],\r\n        \"dnsSettings\": {\r\n          \"dnsServers\": [],\r\n          \"appliedDnsServers\": [],\r\n          \"internalDnsNameLabel\": \"internal-dns-bar\"\r\n        },\r\n        \"macAddress\": \"00-0D-3A-29-A8-E4\",\r\n        \"enableAcceleratedNetworking\": false,\r\n        \"enableIPForwarding\": true\r\n      },\r\n      \"type\": \"Microsoft.Network/networkInterfaces\"\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1976',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'a342d44b-9eca-42f5-af50-6030b8003335',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14986',
  'x-ms-correlation-request-id': 'bd253c59-4be3-4142-b1f2-35b71b5a7636',
  'x-ms-routing-request-id': 'WESTEUROPE:20170418T132516Z:bd253c59-4be3-4142-b1f2-35b71b5a7636',
  date: 'Tue, 18 Apr 2017 13:25:16 GMT',
  connection: 'close' });
 return result; }]];